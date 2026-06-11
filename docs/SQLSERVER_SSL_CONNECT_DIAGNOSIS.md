# SQL Server SSL Connection Diagnosis

## Target Server

| Field    | Value         |
|----------|---------------|
| Host     | 10.1.254.53   |
| Port     | 1433 (default) |
| Date     | 2026-06-10    |

---

## 1. Network Connectivity

```
Test-NetConnection 10.1.254.53 -Port 1433
```

| Check          | Result |
|----------------|--------|
| ComputerName   | 10.1.254.53 |
| RemotePort     | 1433 |
| TcpTestSucceeded | **True** |
| SourceAddress  | 10.0.255.3 (Ethernet 2) |

**PASS** -- TCP port 1433 is open and reachable.

---

## 2. Available SQL Client Tools on This Machine

| Tool   | Found | Path |
|--------|-------|------|
| sqlcmd.exe | **No** | Not installed |
| bcp.exe | **No** | Not installed |
| Invoke-SqlCmd (PowerShell) | **No** | Not installed |
| SQL Server ODBC Driver | **No** | Not registered |
| **SSMS** | **Yes** | `C:\Program Files (x86)\Microsoft SQL Server Management Studio 20` (v20.2.1) |
| **DBeaver** | **Yes** | `C:\Users\prinya\AppData\Local\DBeaver` (v26.1.0) |

> **Note**: `sqlcmd` is part of "SQL Server Command Line Utilities" which must be installed separately. SSMS bundles the GUI but not the CLI tools.

---

## 3. SSL Error Analysis

### Error Message

```
SSL Provider: certificate chain was issued by an authority that is not trusted
```

### Root Cause

The SQL Server at `10.1.254.53` uses one of the following certificate types:

| Cause | Likelihood | Explanation |
|---|---|---|
| **Self-signed certificate** | High | SQL Server generates a self-signed cert on first startup |
| **Internal CA certificate** | Medium | The issuing CA root cert is not installed in Windows Trusted Root store on this machine |
| **Expired certificate** | Low | Possible but usually produces a different error |

### SSMS does NOT trust the server certificate because:

- The server's SSL cert was not issued by a public CA (e.g., DigiCert, Let's Encrypt)
- The signer (self-signed or internal CA) is not in `Local Computer\Trusted Root Certification Authorities`

---

## 4. Solution: SSMS Connection Settings

In SSMS, before clicking **Connect**, do the following:

### Step-by-step

1. On the **Connect to Server** dialog, enter:
   - Server type: `Database Engine`
   - Server name: `10.1.254.53`
   - Authentication: `SQL Server Authentication` (or Windows Auth as appropriate)

2. Click **Options >>** (bottom-right)

3. Go to the **Connection Properties** tab

4. Under **Connection encryption**, set:
   - **Encrypt connection**: `False` *(recommended for internal/LAN)*
   - Or if you need encryption: set to `True` AND check **Trust server certificate**

   ```
   ┌─────────────────────────────────────────────────────┐
   │ Connection Properties                                │
   │                                                     │
   │   ☐ Encrypt connection                              │
   │                                                     │
   │   ┌────────────────────────────────────────────────┐│
   │   │  Encrypt connection:  True   ▼  (or False)     ││
   │   └────────────────────────────────────────────────┘│
   │                                                     │
   │   ☑ Trust server certificate                        │
   │                                                     │
   └─────────────────────────────────────────────────────┘
   ```

5. Click **Connect**

### Encrypt Setting Recommendation

| Environment | Encrypt | Trust Server Cert | Reason |
|---|---|---|---|
| LAN / Internal | **False** | N/A | No encryption needed on trusted network |
| LAN with self-signed cert | **True** | **Checked** | Encrypt traffic without PKI |
| Production / WAN | **True** | **Unchecked** | Must have valid CA-signed cert |

> For `10.1.254.53` (internal LAN), setting **Encrypt = False** is simplest and avoids the SSL error entirely.

---

## 5. DBeaver Alternative (Optional)

If you prefer DBeaver for testing:

1. New Database Connection > SQL Server
2. Host: `10.1.254.53`, Port: `1433`
3. Driver Properties tab:
   - `trustServerCertificate` = `true`
   - `encrypt` = `false` (or `true` with trustServerCertificate)
4. Test Connection

---

## 6. Certificate Trust Setup (Permanent Fix)

To avoid checking "Trust server certificate" every time:

1. Export the server certificate:
   - Use SQL Server Configuration Manager or ask DBA
   - OR: connect once with "Trust server certificate", then export the cert from SSMS connection status

2. Install the certificate to trusted store:
   - Run `certlm.msc` (Local Machine certificate store)
   - Import the cert into `Trusted Root Certification Authorities`

3. After install, SSMS will trust the server without requiring "Trust server certificate"

---

## Summary

| Check | Result |
|-------|--------|
| TCP connectivity (1433) | **PASS** |
| SQL client tools available | **SSMS 20.2.1, DBeaver 26.1.0** |
| SSL error | **EXPECTED** (self-signed / internal CA cert) |
| Fix in SSMS | Check **Trust server certificate** OR set **Encrypt = False** |

## Next Action

1. Open SSMS
2. Connect with **Encrypt = False** OR **Trust server certificate = checked**
3. If connection succeeds, document server details in `.env.local` (gitignored)
4. Run `SELECT @@VERSION` to verify server version and edition
