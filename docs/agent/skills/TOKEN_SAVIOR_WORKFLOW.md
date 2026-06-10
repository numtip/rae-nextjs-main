# Skill: Token Savior Workflow

**Owner:** Supervisor Agent · QA Agent  
**Path:** `/home/rae_admin/rae-nextjs-main/`

---

## Purpose

Minimize token burn by scoping reads and commands to task-approved files only.

## When to use

- Before any multi-file read or codebase exploration
- When Supervisor assigns a Builder task
- Before `grep`/`glob` across the repo

## Required RTK commands

```bash
rtk token-savior status || true
rtk token-savior read <file1> <file2> ...
rtk pwd
rtk git status --short
```

## Token-saving rules

1. Read `docs/agent/SKILLS_INDEX.md` + task brief — not the full repo
2. Maximum read set: files listed in Supervisor brief or skill target list
3. No `find` / unscoped `grep` unless brief explicitly lists a path prefix
4. Prefer `rtk token-savior read` over sequential `Read` tool calls for batches
5. Skip `node_modules/`, `.next/`, `out/`, gitignored scaffolds

## Output format

```
TOKEN_SAVIOR: OK
Read set: [file list]
Excluded: broad scan
```

## Failure conditions

- Broad repo scan without Supervisor approval → **STOP**
- Reading production paths (`/var/www/`) → **STOP**
- More than 15 files read without documented reason → escalate to Supervisor
