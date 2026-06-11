# Research Data Lab — SQL Server Discovery

## Overview

This workspace is the local discovery environment for analysing the SQL Server instance
hosting the `View_Research` database object. All work is read-only and confined to
schema exploration, column profiling, and mapping exercises.

## SQL Server Host

| Property          | Value                                 |
|-------------------|---------------------------------------|
| Host              | *(populate during discovery)*         |
| Instance          | *(populate during discovery)*         |
| Port              | *(populate during discovery)*         |
| Authentication    | *(populate during discovery)*         |

## Database

| Property          | Value                                 |
|-------------------|---------------------------------------|
| Database Name     | *(populate during discovery)*         |
| Source System     | *(populate during discovery)*         |
| Environment       | *(populate during discovery)*         |

## View_Research

- **Object type**: View
- **Schema**: *(populate during discovery)*
- **Purpose**: *(populate during discovery)*
- **Refresh cadence**: *(populate during discovery)*

## Discovery Workflow

1. **Connect** — Establish a read-only connection to the SQL Server instance.
2. **Schema scan** — Run `sql/01_columns.sql` to list all columns and data types.
3. **Sample** — Run `sql/02_sample.sql` to inspect the first 20 rows.
4. **Analyse** — Review data types, nullability, and value distributions.
5. **Map** — Relate columns to KPI and RESEARCH_SHOWCASE targets in `mapping/`.
6. **Report** — Populate `docs/VIEW_RESEARCH_DISCOVERY.md` with findings.

## Security Rules

- **Never** commit connection strings, usernames, or passwords to this repository.
- Use environment variables or an untracked `.env` file for credentials.
- All queries are **read-only**; no `INSERT`, `UPDATE`, `DELETE`, or `ALTER` statements.
- Do **not** connect to or profile any production system without explicit authorisation.
- Share discovery outputs only through the approved `exports/` directory; strip any
  sensitive values before sharing.
