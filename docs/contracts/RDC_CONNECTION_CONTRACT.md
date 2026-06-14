# RDC Connection Contract — SQL Server to Application

> **Status:** Verified — connection established  
> **Date:** 2026-06-14  
> **Upstream:** Research Data Center (RDC) — internal university system  
> **Server:** `WIN25-ERPDB` at `10.1.254.53:1433`  
> **Target:** `centerDW.dbo.View_Research`  
> **Auth User:** `DCResearchUser` (SELECT-only)  

---

## 1. Connection Parameters

| Property | Value | Status | Source |
|----------|-------|--------|--------|
| **Host** | `10.1.254.53` | ✅ Verified | sqlcmd `-S` flag, Test-NetConnection |
| **Port** | `1433` | ✅ Verified | Default SQL Server port, TCP open |
| **Database** | `centerDW` | ✅ Verified | `sys.databases` query |
| **Schema** | `dbo` | ✅ Verified | `sys.objects` query |
| **View** | `View_Research` | ✅ Verified | `INFORMATION_SCHEMA.COLUMNS` query |
| **Authentication mode** | SQL Server Authentication | ✅ Verified | SERVERPROPERTY confirms Mixed Mode |
| **SSL/TLS** | Self-signed certificate | ✅ Verified | `TrustServerCertificate=True` required |
| **Read-only user** | `DCResearchUser` | ✅ Verified | SQL login with SELECT only |
| **SQL Server Edition** | Standard Edition (64-bit) | ✅ Verified | `SERVERPROPERTY('Edition')` |
| **SQL Server Version** | 16.0.1140.6 (SQL Server 2022 RTM-GDR) | ✅ Verified | `@@VERSION` |
| **Host OS** | Windows Server 2025 Datacenter | ✅ Verified | `@@VERSION` |

---

## 2. Connection String Pattern

### Production / CI (encrypted, trusted cert)

```
Server=10.1.254.53;Database=centerDW;User Id=DCResearchUser;Password={{RDC_SQL_PASSWORD}};Encrypt=true;TrustServerCertificate=true;
```

### LAN / Internal Development (no encryption)

```
Server=10.1.254.53;Database=centerDW;User Id=DCResearchUser;Password={{RDC_SQL_PASSWORD}};Encrypt=false;TrustServerCertificate=true;
```

### Notes

| Parameter | Rationale |
|-----------|-----------|
| `TrustServerCertificate=true` | Server uses a self-signed SSL certificate. Required on SQL Server 2022 where encryption is enabled by default. |
| `Encrypt=true` | Recommended for CI/production to ensure data-in-transit protection. |
| `Encrypt=false` | Acceptable on internal LAN where network is trusted. |

---

## 3. Authentication Details

| Property | Value |
|----------|-------|
| **Auth type** | SQL Server Authentication (not Windows Integrated) |
| **Login name** | `DCResearchUser` |
| **Server-level roles** | None (0 server roles assigned) |
| **Database-level permissions** | `CONNECT` to `centerDW` |
| **Object-level permissions** | `SELECT` on `View_Research` only |
| **Password storage** | Windows Credential Manager (current), migrate to CI secrets for automation |
| **Connection test command** | `sqlcmd -S 10.1.254.53 -C -U DCResearchUser -d centerDW -Q "SELECT 1"` |

---

## 4. SSL / Encryption

| Check | Result |
|-------|--------|
| Server certificate type | Self-signed (not from public CA) |
| SSL handshake without `-C` | Fails — `certificate chain was issued by an authority that is not trusted` |
| SSL handshake with `-C` | ✅ Succeeds — `TrustServerCertificate=True` resolves |
| Encryption default (SQL Server 2022) | Enabled by default |
| Recommended for CI | `Encrypt=true; TrustServerCertificate=true` |
| Recommended for LAN dev | `Encrypt=false; TrustServerCertificate=true` |

---

## 5. Network Requirements

| Requirement | Status |
|-------------|--------|
| Internal VPN access | Required — server is on 10.x.x.x internal network |
| TCP port 1433 | Open and reachable |
| ICMP ping | Blocked (expected for SQL Server) |
| Source IP range | 10.0.x.x (internal network) |
| Current workstation IP | `100.64.100.6` (ExpressVPN tunnel) — requires university VPN for 10.x access |

---

## 6. Target View: `centerDW.dbo.View_Research`

| Property | Value |
|----------|-------|
| **Fully qualified name** | `centerDW.dbo.View_Research` |
| **Schema** | `dbo` |
| **Column count** | 44 |
| **Created** | 2024-05-08 15:02:05 |
| **Last modified** | 2024-05-08 15:21:25 |
| **Estimated rows** | 21,527 |
| **Distinct projects** | 9,368 |
| **Data type** | SQL View (not a table) |

---

## 7. Security Constraints

| Constraint | Detail |
|------------|--------|
| **Read-only access** | ✅ `DCResearchUser` has SELECT only — no INSERT, UPDATE, DELETE, DDL |
| **Scoped to view** | ✅ Permission is granted on `View_Research` specifically, not the entire database |
| **No server admin** | ✅ User has no sysadmin, securityadmin, or any server-level role |
| **No cross-database access** | ✅ User is scoped to `centerDW` only |
| **Credentials in CI** | 🔲 Must be configured as GitHub Actions secrets (not in repo) |
| **Public data only** | ⚠️ View scope unknown — confirm with RDC team whether View_Research already filters to public data |

---

## 8. Connection Diagnostics (for automation)

### Connectivity test (PowerShell)

```powershell
sqlcmd -S 10.1.254.53 -C -l 10 -U "DCResearchUser" -d centerDW -Q "SELECT 1 AS HealthCheck;"
```

### Expected success

```
HealthCheck
-----------
         1

(1 row affected)
```

### Expected failure modes

| Error | Meaning | Resolution |
|-------|---------|------------|
| `HOST_UNREACHABLE` | Network/VPN down | Connect to university VPN |
| `SSL certificate chain not trusted` | Missing `-C` flag | Add `TrustServerCertificate=True` |
| `Login failed for user` | Wrong credentials | Check password in credential store |
| `Cannot open database centerDW` | DB not accessible | Verify user mapping |
| `SELECT permission denied` | Wrong permissions | Contact RDC DBA |

---

## 9. References

- `docs/reports/RDC_ENVIRONMENT_DISCOVERY.md` — Full environment discovery with query results
- `docs/contracts/RDC_BUDGET_SQL_SOURCE_CONTRACT.md` — Column-level contract with TypeScript mapping
- `docs/architecture/RDC_SQL_CONNECTOR_PLAN.md` — Connector implementation plan (future)
- `docs/SQLSERVER_SSL_CONNECT_DIAGNOSIS.md` — SSL diagnosis history
- `docs/SSMS_CONNECTION_WORKFLOW_FIX.md` — SSMS connection setup steps
