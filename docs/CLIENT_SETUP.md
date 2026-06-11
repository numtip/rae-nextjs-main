# Research Data Lab - SQL Client Setup

## Installation Date

**2026-06-10** (Wednesday)

---

## Installed Software

### 1. Microsoft SQL Server Management Studio (SSMS)

| Field       | Value                                      |
|-------------|--------------------------------------------|
| Version     | 20.2.1                                     |
| Build       | 20.2.37.0                                  |
| Source      | https://aka.ms/ssmsfullsetup                |
| Install Dir | `C:\Program Files (x86)\Microsoft SQL Server Management Studio 20` |
| Install Type | Silent (`/Install /Quiet /NoRestart`)      |

### 2. DBeaver Community Edition

| Field       | Value                                      |
|-------------|--------------------------------------------|
| Version     | 26.1.0                                     |
| File Version| 26.1.0.0                                   |
| Source      | https://dbeaver.io/download/                |
| Install Dir | `C:\Users\prinya\AppData\Local\DBeaver`     |
| Install Type | Per-user silent (`/S /currentuser`)        |

---

## Screenshots

Screenshots of the installed tools should be placed in this directory:

```
F:\ProjectAi\research-data-lab\docs\screenshots\
```

Suggested screenshot file names:

- `ssms_about.png` -- SSMS launch + Help > About
- `dbeaver_about.png` -- DBeaver launch + Help > About

---

## Next Steps: SQL Server Connection

> **Important**: Do NOT store credentials in this repository.

When ready to connect, proceed with:

1. **Identify connection details** (server host, port, authentication method)
2. **Test connectivity** using either tool:
   - **SSMS**: File > Connect Object Explorer > enter server name > Connect
   - **DBeaver**: New Database Connection > SQL Server > enter host/port > Test Connection
3. **Document connection** in a separate `.env.local` file (gitignored) or secure vault
4. **Validate access** by listing databases:
   ```sql
   SELECT name, database_id, create_date FROM sys.databases;
   ```
5. **Run discovery** query to understand schema:
   ```sql
   SELECT TABLE_CATALOG, TABLE_SCHEMA, TABLE_NAME, TABLE_TYPE
   FROM INFORMATION_SCHEMA.TABLES
   ORDER BY TABLE_CATALOG, TABLE_SCHEMA, TABLE_NAME;
   ```

---
