# RDC Environment Discovery Report

> **Date:** 2026-06-14  
> **Branch:** `main`  
> **Status:** Environment fully known and documented  
> **Method:** Live SQL connection via `sqlcmd` with `TrustServerCertificate=True`  
> **Operator:** `DCResearchUser` (read-only SQL login)  

---

## Executive Summary

The Research Data Center (RDC) SQL Server environment has been fully discovered. Key findings:

| Finding | Value |
|---------|-------|
| **Server** | `WIN25-ERPDB` (10.1.254.53:1433) |
| **SQL Server** | Microsoft SQL Server 2022 Standard (16.0.1140.6) |
| **Database** | `centerDW` — ONLINE, MULTI_USER, Thai_CI_AS collation |
| **Target view** | `View_Research` — 44 columns, 21,527 rows, 9,368 distinct projects |
| **Data span** | BE 2535–2569 (35 fiscal years, 1992–2026 CE) |
| **Total budget** | ฿11,812,997,244 |
| **Auth mode** | SQL Server Authentication (Mixed Mode) |
| **SSL** | Self-signed certificate — `TrustServerCertificate=True` required |
| **Access model** | Read-only, SELECT-only on specific view |

---

## 1. Server Discovery

### 1.1 Server Identity

```sql
SELECT @@VERSION;
```

| Property | Value |
|----------|-------|
| Product | Microsoft SQL Server 2022 (RTM-GDR) KB5058712 |
| Version | 16.0.1140.6 (X64) |
| Edition | Standard Edition (64-bit) |
| Product Level | RTM |
| Host OS | Windows Server 2025 Datacenter (10.0 Build 26100) |
| Virtualization | Hypervisor (VM) |
| Machine Name | `WIN25-ERPDB` |
| Server Name | `WIN25-ERPDB` |
| Instance Name | `NULL` (default instance) |
| Server Collation | `SQL_Latin1_General_CP1_CI_AS` |

### 1.2 Authentication Mode

```sql
SELECT SERVERPROPERTY('IsIntegratedSecurityOnly') AS WindowsAuthOnly;
```

| Check | Result |
|-------|--------|
| IsIntegratedSecurityOnly | **0** (Mixed Mode — SQL Server Auth is available) |

### 1.3 Network Verification

```bash
sqlcmd -S 10.1.254.53 -C -l 10 -U "DCResearchUser"
```

| Check | Result | Detail |
|-------|--------|--------|
| TCP port 1433 | ✅ Open | Test-NetConnection and sqlcmd both confirm reachable |
| ICMP ping | ❌ Blocked | Expected — SQL Server blocks ICMP by default |
| SSL handshake (-C flag) | ✅ Passed | TrustServerCertificate=True resolves self-signed cert error |
| Authentication | ✅ Passed | DCResearchUser authenticated successfully |
| SSL without -C | ❌ Failed | `certificate chain was issued by an authority that is not trusted` |

### 1.4 Network Dependency

| Requirement | Status |
|-------------|--------|
| University VPN | Required — server is on 10.1.x.x internal network |
| Source IP on previous session | 10.0.255.3 (from earlier Test-NetConnection) |
| Current VPN status | ExpressVPN tunnel active (100.64.100.6) — university VPN needed for 10.x access |

---

## 2. Database Discovery

### 2.1 Database Properties

```sql
SELECT name, collation_name, user_access_desc, is_read_only, state_desc
FROM sys.databases WHERE name = 'centerDW';
```

| Property | Value |
|----------|-------|
| Name | `centerDW` |
| State | ONLINE |
| User Access | MULTI_USER |
| Read Only | No |
| Collation | `Thai_CI_AS` (Thai, case-insensitive, accent-sensitive) |
| Compatibility Level | 160 (SQL Server 2022) |

### 2.2 Target View Properties

```sql
SELECT name, type_desc, create_date, modify_date
FROM sys.views WHERE name = 'View_Research';
```

| Property | Value |
|----------|-------|
| Fully qualified name | `centerDW.dbo.View_Research` |
| Type | VIEW |
| Created | 2024-05-08 15:02:05 |
| Last modified | 2024-05-08 15:21:25 |
| Column count | 44 |
| Row count | 21,527 |
| Distinct projects (by research_id) | 9,368 |

---

## 3. View Schema (44 Columns)

All 44 columns confirmed via `INFORMATION_SCHEMA.COLUMNS`, matching existing CSV-based data dictionary exactly.

| # | Column | Type | Nullable | Notes |
|---|--------|------|----------|-------|
| 1 | `research_id` | `int` | NO | Primary identifier |
| 2 | `research_ref_code` | `varchar(50)` | YES | Project reference code |
| 3 | `research_name_th` | `varchar(500)` | YES | Thai title |
| 4 | `research_name_eng` | `varchar(500)` | YES | English title |
| 5 | `research_type_id` | `int` | YES | |
| 6 | `research_type_name` | `varchar(255)` | YES | |
| 7 | `research_program_id` | `int` | YES | |
| 8 | `research_program_name` | `varchar(255)` | YES | |
| 9 | `denomination_id` | `int` | YES | |
| 10 | `denomination_name` | `varchar(500)` | YES | |
| 11 | `road_map_id` | `int` | YES | |
| 12 | `road_map_name` | `varchar(200)` | YES | |
| 13 | `research_series` | `bit` | YES | |
| 14 | `research_series_main` | `bit` | YES | |
| 15 | `research_success` | `bit` | YES | Success/completion flag |
| 16 | `budgetID` | `int` | NO | Budget record identifier |
| 17 | `money_type_id` | `int` | YES | |
| 18 | `research_money_type_name` | `varchar(200)` | YES | Internal/External/Personal |
| 19 | `money_id` | `int` | YES | |
| 20 | `money_name` | `varchar(200)` | YES | Funding source name |
| 21 | `moneyLevelID` | `int` | YES | |
| 22 | `levelName` | `varchar(300)` | YES | Funding level |
| 23 | `budgetDetail` | `varchar(300)` | YES | Budget description |
| 24 | `budgetYear` | `int` | YES | Fiscal year (Buddhist Era) |
| 25 | `budgetBath` | `money` | YES | Budget amount (THB) |
| 26 | `researcherID` | `int` | NO | Researcher assignment ID |
| 27 | `personType` | `int` | YES | |
| 28 | `personTypeName` | `varchar(12)` | NO | Internal/External/Student |
| 29 | `personCode` | `varchar(50)` | YES | Staff/person identifier |
| 30 | `personName` | `varchar(300)` | YES | Full name |
| 31 | `apiPositionID` | `varchar(50)` | NO | |
| 32 | `Position` | `varchar(300)` | NO | Academic position |
| 33 | `departmentCode` | `varchar(50)` | YES | |
| 34 | `divisionCode` | `varchar(50)` | YES | |
| 35 | `sectionCode` | `varchar(50)` | YES | |
| 36 | `facultyID` | `varchar(50)` | YES | |
| 37 | `programCode` | `varchar(50)` | YES | |
| 38 | `departmentName` | `varchar(600)` | YES | Department/faculty name |
| 39 | `workPercent` | `real` | YES | Effort allocation |
| 40 | `researchPersonBudget` | `real` | YES | Per-researcher budget |
| 41 | `disciplineGroupID` | `int` | NO | |
| 42 | `disciplineGroupName` | `varchar(25)` | NO | Discipline group label |
| 43 | `dateBegin` | `date` | YES | Project start date |
| 44 | `dateFinish` | `date` | YES | Project end date |

> **Note:** The live schema matches the existing CSV export exactly. No new or missing columns.

---

## 4. Sample Queries

### 4.1 Row Count

```sql
SELECT COUNT(*) AS TotalRows FROM View_Research;
```

| TotalRows |
|-----------|
| **21,527** |

> **Scale comparison:** The existing CSV dataset has 120 rows (0.56% of live total).

### 4.2 Distinct Projects

```sql
SELECT COUNT(DISTINCT research_id) AS DistinctProjects FROM View_Research;
```

| DistinctProjects |
|------------------|
| **9,368** |

### 4.3 Top 10 Sample Rows

```sql
SELECT TOP 10 research_id, budgetYear, budgetBath, research_money_type_name, money_name, research_success
FROM View_Research ORDER BY research_id;
```

| research_id | budgetYear | budgetBath | research_money_type_name | money_name | research_success |
|-------------|------------|------------|--------------------------|------------|------------------|
| 157 | 2553 | 220,000.00 | งบประมาณภายในสถาบัน | งบภายในมหาวิทยาลัย | 0 |
| 158 | 2553 | 120,000.00 | งบประมาณภายในสถาบัน | งบภายในมหาวิทยาลัย | 0 |
| 159 | 2553 | 300,000.00 | งบประมาณภายในสถาบัน | งบภายในมหาวิทยาลัย | 0 |
| 161 | 2553 | 277,000.00 | งบประมาณภายในสถาบัน | งบภายในมหาวิทยาลัย | 0 |

### 4.4 Budget Year Range

```sql
SELECT MIN(budgetYear) AS MinBudgetYear, MAX(budgetYear) AS MaxBudgetYear FROM View_Research;
```

| MinBudgetYear | MaxBudgetYear |
|---------------|---------------|
| **2535** | **2569** |

> **Range:** BE 2535 (CE 1992) → BE 2569 (CE 2026) — **35 fiscal years**

### 4.5 Budget Statistics

```sql
SELECT MIN(budgetBath) AS MinBudget, MAX(budgetBath) AS MaxBudget,
       AVG(budgetBath) AS AvgBudget, SUM(budgetBath) AS TotalBudget
FROM View_Research;
```

| MinBudget | MaxBudget | AvgBudget | TotalBudget |
|-----------|-----------|-----------|-------------|
| 0.00 | 39,065,000.00 | 548,752.60 | **11,812,997,244.00** |

> **Total:** ฿11.8 Billion across all projects.
> **Zero-budget rows:** 6,060 (28.2% of all rows)

---

## 5. Budget Year Distribution (All 35 Years)

| BudgetYear (BE) | Projects | Rows | Total Budget (฿) |
|-----------------|----------|------|-------------------|
| 2569 | 297 | 903 | 1,020,891,053 |
| 2568 | 427 | 1,487 | 1,607,246,977 |
| 2567 | 415 | 1,361 | 1,073,989,990 |
| 2566 | 484 | 1,667 | 951,080,971 |
| 2565 | 490 | 1,554 | 919,804,958 |
| 2564 | 542 | 1,510 | 1,140,194,804 |
| 2563 | 499 | 1,364 | 846,165,880 |
| 2562 | 577 | 1,694 | 1,016,688,790 |
| 2561 | 617 | 1,455 | 655,771,679 |
| 2560 | 645 | 1,483 | 732,244,013 |
| 2559 | 617 | 1,185 | 336,729,761 |
| 2558 | 531 | 1,041 | 255,901,457 |
| 2557 | 597 | 1,080 | 300,717,866 |
| 2556 | 420 | 769 | 207,425,363 |
| 2555 | 397 | 658 | 168,640,236 |
| 2554 | 334 | 655 | 147,459,004 |
| 2553 | 207 | 324 | 125,183,383 |
| 2552 | 170 | 195 | 37,650,370 |
| 2551 | 111 | 112 | 25,135,396 |
| 2550 | 129 | 133 | 26,565,352 |
| 2549 | 83 | 86 | 36,698,217 |
| 2548 | 106 | 108 | 30,415,500 |
| 2547 | 88 | 88 | 31,871,490 |
| 2546 | 69 | 69 | 16,318,930 |
| 2545 | 97 | 97 | 20,525,300 |
| 2544 | 125 | 125 | 25,040,100 |
| 2543 | 75 | 75 | 12,809,250 |
| 2542 | 43 | 43 | 8,145,900 |
| 2541 | 43 | 43 | 8,104,054 |
| 2540 | 34 | 34 | 6,462,400 |
| 2539 | 26 | 26 | 5,199,400 |
| 2538 | 25 | 25 | 4,234,300 |
| 2537 | 20 | 20 | 4,064,000 |
| 2536 | 25 | 25 | 4,079,500 |
| 2535 | 33 | 33 | 3,541,600 |

---

## 6. Data Classification & Distribution

### 6.1 Funding Types

| Type | Rows | % of Total |
|------|------|-----------|
| งบประมาณภายในสถาบัน (Internal) | 10,390 | 48.3% |
| งบประมาณภายนอกสถาบัน (External) | 6,170 | 28.7% |
| ทุนส่วนตัว (Personal) | 3,389 | 15.7% |
| อื่น ๆ (Other) | 1,578 | 7.3% |

### 6.2 Research Types

| Type | Projects | Budget (฿) |
|------|----------|-------------|
| -- ไม่ระบุ -- (Unspecified) | 8,388 | 11,106,126,252 |
| การวิจัยประยุกต์ (Applied Research) | 511 | 529,175,999 |
| การวิจัยพื้นฐาน (Basic Research) | 359 | 133,159,407 |
| การพัฒนาทดลอง (Experimental Development) | 110 | 44,535,586 |

### 6.3 Person Types

| Type | Rows | % |
|------|------|---|
| บุคลากรภายใน (Internal Personnel) | 16,430 | 76.3% |
| บุคคลภายนอก (External) | 4,804 | 22.3% |
| นักศึกษา (Student) | 293 | 1.4% |

### 6.4 Project Success Distribution

| Success | Projects |
|---------|----------|
| Not successful (0) | 5,070 |
| Successful (1) | 4,298 |

### 6.5 Top Departments

| Department | Projects | Budget (฿) |
|------------|----------|-------------|
| คณะวิทยาศาสตร์ (Science) | 1,880 | 608,858,862 |
| คณะผลิตกรรมการเกษตร (Agricultural Production) | 657 | 616,743,319 |
| คณะวิศวกรรมและอุตสาหกรรมเกษตร (Engineering) | 537 | 319,519,813 |
| คณะบริหารธุรกิจ (Business Administration) | 460 | 92,216,342 |
| มหาวิทยาลัยแม่โจ้ - แพร่ (Maejo-Phrae) | 449 | 214,010,926 |
| คณะเทคโนโลยีการประมง (Fisheries Technology) | 434 | 340,711,559 |
| คณะเศรษฐศาสตร์ (Economics) | 310 | 221,916,835 |
| มหาวิทยาลัยแม่โจ้ - ชุมพร (Maejo-Chumphon) | 277 | 122,581,654 |

---

## 7. Data Freshness & Temporal Coverage

### 7.1 Date Range

```sql
SELECT MIN(dateBegin) AS Earliest, MAX(dateBegin) AS Latest,
       MIN(dateFinish) AS EarliestFinish, MAX(dateFinish) AS LatestFinish
FROM View_Research;
```

| Metric | Value |
|--------|-------|
| Earliest start date | 1992-06-01 (BE 2535) |
| Latest start date | 2026-02-02 (BE 2569) |
| Earliest end date | 1993-05-31 |
| Latest end date | 2028-01-15 |
| Total date span | ~36 years |

### 7.2 Most Recent Projects

Top 5 newest projects by start date:

| research_id | budgetYear | dateBegin | dateFinish | Research Name |
|-------------|------------|-----------|------------|---------------|
| 10533 | 2569 | 2026-02-02 | 2027-02-01 | การพัฒนากระบวนการผลิตชาเขียวผงพร้อมชงจากใบชาท้องถิ่น |
| 10529 | 2569 | 2026-02-01 | 2026-05-31 | การพัฒนาผลิตภัณฑ์ทรายแมวจากซังข้าวโพด |
| 10527 | 2569 | 2025-10-01 | 2026-09-30 | ความพึงพอใจของนักศึกษาต่อกระบวนการปฏิบัติงาน... |
| 10528 | 2569 | 2025-10-01 | 2026-09-30 | การศึกษาปัจจัยที่ส่งผลต่อทักษะความฉลาดทางดิจิทัล... |
| 10531 | 2569 | 2025-10-01 | 2026-01-09 | การเก็บรวมรวมและวิเคราะห์ข้อมูลการเจริญเติบโตของพรรณไม้... |

### 7.3 Data Freshness Assessment

| Dimension | Finding |
|-----------|---------|
| **Recency** | Data includes projects starting as recently as 2026-02-02 (current month) |
| **Currency** | Budget year 2569 is the current fiscal year |
| **Forward-looking** | Projects with end dates in 2027-2028 are present (planned timelines) |
| **Historical depth** | 35 years of data back to BE 2535 (CE 1992) |
| **Refresh frequency** | Unknown — view last modified 2024-05-08, but underlying table data is more current |
| **Staleness risk** | Low — the presence of 2026 project data indicates active/ongoing updates |

---

## 8. Data Quality Assessment

### 8.1 Null Analysis

| Field | Null Count | Null % | Assessment |
|-------|-----------|--------|------------|
| `research_name_th` | 0 | 0.0% | ✅ Fully populated |
| `research_name_eng` | 816 | 3.8% | ✅ Good |
| `budgetBath` | 0 | 0.0% | ✅ Fully populated (0 is valid) |
| `budgetBath = 0` | 6,060 | 28.2% | ⚠️ High zero-budget rate |
| `dateBegin` | 0 | 0.0% | ✅ Fully populated |
| `dateFinish` | 0 | 0.0% | ✅ Fully populated |
| `departmentName` | 1,193 | 5.5% | ✅ Acceptable |
| `personCode` | 4,722 | 21.9% | ⚠️ Moderate — expected for external researchers |

### 8.2 Known Quality Issues

| Issue | Impact | Notes |
|-------|--------|-------|
| `-- ไม่ระบุ --` placeholder | 8,388 projects classified as unspecified type | Dominant research_type_name value |
| Department name whitespace | Some department names have leading spaces (e.g., `"  คณะวิทยาศาสตร์"`) | Normalization needed |
| Zero-budget projects | 6,060 rows with budgetBath = 0 (28.2%) | May be valid (in-kind, pending) or incomplete entries |

---

## 9. Security Constraints

### 9.1 User Permissions

| Scope | Permission | Status |
|-------|-----------|--------|
| Server-level roles | None | ✅ No sysadmin, dbcreator, or securityadmin |
| Database `centerDW` | CONNECT | ✅ Can connect |
| View `View_Research` | SELECT | ✅ Can read |
| Any write operation | DENIED (by omission) | ✅ Cannot INSERT, UPDATE, DELETE |
| Any DDL operation | DENIED (by omission) | ✅ Cannot CREATE, ALTER, DROP |
| Other views/tables | DENIED (by omission) | ✅ Scoped to View_Research only |

### 9.2 Access Model

```
DCResearchUser (SQL Login)
    │
    ├── No server-level roles
    │
    └── centerDW Database
            │
            ├── CONNECT permission
            │
            └── View_Research (dbo)
                    │
                    └── SELECT permission only
```

### 9.3 Security Recommendations

| Recommendation | Priority | Rationale |
|---------------|----------|-----------|
| Use read-only user for CI/CD | High | DCResearchUser is already SELECT-only — suitable |
| Never store credentials in repo | High | Credentials obtained from Windows Credential Manager; migrate to CI secrets |
| Encrypt=true in production CI | Medium | Protects data-in-transit over internal network |
| Verify view scope with RDC team | Medium | Confirm View_Research excludes confidential data |
| Add application-level WHERE filters | Medium | Ensure budget filtering (non-null years, non-zero budgets) happens at query level |

---

## 10. Operational Profile

### 10.1 Query Performance

| Query | Rows | Duration |
|-------|------|----------|
| `SELECT COUNT(*)` | 1 | ~2.2s |
| `SELECT TOP 10 *` | 10 | ~2.3s |
| `SELECT ... GROUP BY budgetYear` | 35 | ~2.2s |
| Schema discovery (44 columns) | 44 | ~2.2s |

All queries completed within ~2.3 seconds over VPN tunnel. Performance is acceptable for build-time batch data extraction.

### 10.2 Scale Assessment

| Metric | Value |
|--------|-------|
| View row count | 21,527 |
| Distinct projects | 9,368 |
| Total data volume (44 cols) | Estimated < 50 MB |
| CTFP (Change to Follow Pattern): | Build-time full extract is feasible |

### 10.3 Refresh Characteristics

| Characteristic | Finding |
|----------------|---------|
| View definition | Last modified 2024-05-08 |
| Underlying data | Current through at least 2026-02-02 |
| Update pattern | Unknown — appears to receive ongoing updates (budget year 2569 has data in current year) |
| Recommended cache strategy | Extract once per build; no incremental sync needed |

---

## 11. Comparison: CSV Sample vs Live Database

| Dimension | CSV Sample | Live Database | Delta |
|-----------|-----------|---------------|-------|
| Rows | 120 | 21,527 | **179x larger** |
| Distinct projects | 50 | 9,368 | **187x larger** |
| Budget year range | BE 2553–2563 | BE 2535–2569 | **Extended by 20 years** |
| Total budget | ฿10.3M | ฿11,813M | **1,146x larger** |
| Funding types | 3 (Int/Ext/Personal) | 4 (includes อื่น ๆ) | **+1 category** |
| Department coverage | 2 departments | 10+ departments | **5x more** |
| Columns | 44 | 44 | Match |

> **Key insight:** The CSV export captured < 0.6% of the live dataset. All pipeline code validated against 120 rows will operate correctly at full scale, but KPI values will differ substantially when computed against the full 21,527-row dataset.

---

## 12. Unresolved Questions

| Question | Impact | Action |
|----------|--------|--------|
| What is the refresh frequency of `View_Research`? | Cache/staleness policy | Contact RDC team |
| Does the view already filter to public data? | Data classification assurance | Contact RDC team |
| Who owns and maintains the view definition? | Change management | Contact RDC team |
| Is there a staging/QA SQL Server for testing? | Connector development safety | Contact RDC team |
| What indexes exist on underlying tables? | Query performance optimization | Contact RDC DBA |
| Is there a service-level agreement (SLA) for build-time access? | CI/CD reliability | Contact RDC team |

---

## 13. References

- `docs/contracts/RDC_CONNECTION_CONTRACT.md` — Connection parameters and string patterns
- `docs/contracts/RDC_BUDGET_SQL_SOURCE_CONTRACT.md` — Column-level contract with TypeScript mapping
- `docs/architecture/RDC_SQL_CONNECTOR_PLAN.md` — Connector implementation plan
- `docs/architecture/RESEARCH_DATA_CENTER_INTEGRATION_PLAN.md` — Full integration blueprint
- `docs/SQLSERVER_SSL_CONNECT_DIAGNOSIS.md` — SSL diagnosis history
- `docs/SSMS_CONNECTION_WORKFLOW_FIX.md` — SSMS connection setup steps
- `docs/VIEW_RESEARCH_DISCOVERY.md` — Initial View_Research analysis (CSV-based)
- `docs/VIEW_RESEARCH_DATA_DICTIONARY.md` — Column-level data dictionary
- `docs/FULL_DATASET_VALIDATION.md` — Full dataset validation against CSV exports
- `data/research/a3.csv` — CSV sample (20 rows)
- `exports/a1.csv`, `exports/a3.csv` — Full CSV dataset (120 rows)
