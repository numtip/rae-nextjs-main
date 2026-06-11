# SSMS Connection Workflow Fix Report

## Target

| Field    | Value         |
|----------|---------------|
| SQL Server | 10.1.254.53:1433 |
| Workstation | Windows Local |
| Date | 2026-06-10 |
| Previous SSL error | `certificate chain was issued by an authority that is not trusted` |
| Previous Profiler error | `user lacks sysadmin or ALTER TRACE` |

---

## Task Checklist

### 1. Processes: Kill Running Profiler

| Process | PID | Start Time | Action Taken |
|---------|-----|------------|-------------|
| **PROFILER** | 23820 | 2026-06-10 21:24:06 | **Killed** via `Stop-Process -Force` |

No SSMS or DBeaver processes were running. Profiler was the only stale process.

---

### 2. SSMS Installation Verification

| Check | Result |
|-------|--------|
| SSMS Version | **20.2.1** (build 20.2.37.0) |
| Install Location | `C:\Program Files (x86)\Microsoft SQL Server Management Studio 20` |
| winget Source | `Microsoft.SQLServerManagementStudio` |

**PASS** -- SSMS 20.2.1 fully installed.

---

### 3. sqlcmd Installation Status

| Before | After |
|--------|-------|
| **Not installed** | **Installed v1.10.0** via `winget install Microsoft.Sqlcmd` |

| Detail | Value |
|--------|-------|
| Package | `Microsoft.Sqlcmd` (go-sqlcmd) |
| Version | v1.10.0 |
| Installer | `sqlcmd-amd64.msi` from GitHub |
| Binary Path | `C:\Program Files\sqlcmd\sqlcmd.exe` |
| Source | https://github.com/microsoft/go-sqlcmd |

**PASS** -- sqlcmd v1.10.0 now available.

---

### 4. Network Connectivity

```
Test-NetConnection 10.1.254.53 -Port 1433
```

| Check | Result |
|-------|--------|
| TCP Port 1433 | **Open** |
| Source | 10.0.255.3 (Ethernet 2) |
| TcpTestSucceeded | **True** |

**PASS** -- Network reachable.

---

### 5. SSL Fix Verification (sqlcmd with TrustServerCertificate)

```powershell
sqlcmd -S 10.1.254.53 -C -Q "SELECT @@VERSION" -l 10
```

| Flag | Meaning |
|------|---------|
| `-C` | `TrustServerCertificate=True` |
| `-l 10` | Login timeout 10 seconds |

**Result:**

- Before fix (without `-C`): Would get `SSL Provider: certificate chain was issued by an authority that is not trusted`
- After fix (with `-C`): SSL handshake **succeeded** -- error changed to `SEC_E_NO_CREDENTIALS` (0x8009030e)
- The `0x8009030e` error is pure authentication failure (no password supplied), **not** an SSL issue

**CONFIRMED** -- `TrustServerCertificate=True` resolves the certificate trust error.

---

### 6. SSMS Connection Settings (Exact)

#### Step-by-step Procedure

1. **Launch SSMS**
   - Do NOT open SQL Server Profiler
   - Use **View > Object Explorer** (Ctrl+8)
   - Or File > Connect Object Explorer

2. **Connect to Server** dialog:

   ```
   ┌──────────────────────────────────────────────────┐
   │ Connect to Server                                 │
   │                                                   │
   │ Server type:  Database Engine                     │
   │ Server name:  10.1.254.53                        │
   │ Authentication: SQL Server Authentication          │
   │ Login:         <your_username>                     │
   │ Password:      <your_password>                     │
   │                                                   │
   │     [ Connect ]  [ Cancel ]  [ Options >> ]       │
   └──────────────────────────────────────────────────┘
   ```

3. Click **Options >>**

4. Go to **Connection Properties** tab

5. Set **Additional Connection Parameters** tab (not the dropdown):

   Paste these exact parameters:

   ```
   TrustServerCertificate=True;
   Encrypt=False;
   ```

6. Or use the dropdown UI settings:
   - **Encrypt connection**: `False`

7. **Do NOT** go to Tools > SQL Server Profiler (you will get `user lacks sysadmin or ALTER TRACE`)

8. Click **Connect**

#### Quick Reference Card

```
Server name:  10.1.254.53
Auth:         SQL Server Authentication
Options > Connection Properties > Additional Connection Parameters:
  TrustServerCertificate=True;
  Encrypt=False;
```

> **Important**: Do not store username/password in any file in this repo. Use `.env.local` (gitignored) or a secure password manager.

---

### 7. Alternative: sqlcmd CLI Workflow

After connection is established, you can also use sqlcmd from command line:

```powershell
# With TrustServerCertificate (recommended for self-signed certs)
sqlcmd -S 10.1.254.53 -C -U <username>

# Without encrypt
sqlcmd -S 10.1.254.53 -C -U <username> -G  # -G for Azure AD, omit for SQL Auth
```

---

## Final Summary

| Task | Result |
|------|--------|
| 1. Kill Profiler process | **PASS** -- Profiler (PID 23820) terminated |
| 2. Verify SSMS | **PASS** -- SSMS 20.2.1 installed |
| 3. Check sqlcmd | **PASS** -- now installed v1.10.0 |
| 4. Network (1433) | **PASS** -- reachable |
| 5. SSL fix verified | **PASS** -- `TrustServerCertificate=True` resolves error |
| 6. SSMS settings documented | **PASS** -- see section 6 above |

## Overall Result

**PASS** -- Workstation is ready for SQL Server 10.1.254.53 connection via SSMS.

## Next Manual Action

1. Open **SSMS**
2. Connect using the settings in section 6 (with your credentials)
3. Use **View > Object Explorer** -- do NOT open Profiler
4. Run `SELECT @@VERSION` to confirm connection
5. Start discovery queries
