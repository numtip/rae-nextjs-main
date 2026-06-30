# KB1A — Git Tracking Fix Report

## Objective
Enable Git tracking for RAE Next.js KB content bridge staging data (`data/kb/rae-core-content.json`) without exposing generated/runtime artifacts under `data/`.

## Root Cause

The `.gitignore` file contained a broad `data/` pattern (line 14) that recursively ignored **all** content under the `data/` directory. While `!lib/data/` was already exempted, no exception existed for the KB staging directory (`data/kb/`).

The `data/` pattern:
- Matches the directory itself and all its descendants
- Affects **untracked** files only (already-tracked `.ts` files under `data/` are immune to gitignore)

## Change Applied

**File:** `.gitignore`

### Before
```
data/
!lib/data/
exports/
```

### After
```
data/*
!data/kb/
data/documents/
!lib/data/
exports/
```

| Pattern | Purpose |
|---|---|
| `data/*` | Ignore only **direct** children of `data/` (files + dirs), not recursive. Already-tracked `.ts`/`.json` files are unaffected. |
| `!data/kb/` | **Exception** — un-ignore the `data/kb/` directory so KB staging content can be tracked. |
| `data/documents/` | Re-ignore `data/documents/` (contains generated partial JSON artifacts) since it should remain untracked. |
| `!lib/data/` | Pre-existing exception — preserved. |

## Verification Results

| Check | Command | Result |
|---|---|---|
| KB content not ignored | `rtk git check-ignore -v data/kb/rae-core-content.json` | ✅ **Not ignored** (exit code 1) |
| Documents still ignored | `rtk git check-ignore -v data/documents/...partial.json` | ✅ Still ignored by `data/documents/` |

## Git Status

```
 M .gitignore
?? data/kb/
?? docs/kb-content-bridge/
```

| Entry | Status | Notes |
|---|---|---|
| `.gitignore` | Modified (staged: no) | The gitignore fix itself |
| `data/kb/` | Untracked | Now visible — contains `rae-core-content.json` (18,635 bytes) |
| `docs/kb-content-bridge/` | Untracked | Documentation directory (pre-existing) |

## Key Design Decisions

1. **`data/*` instead of `data/`**: The recursive `data/` pattern prevents any negative pattern from working for subdirectories. Changing to `data/*` limits the ignore to one level, allowing `!data/kb/` to function correctly.
2. **Re-ignore `data/documents/`**: Added an explicit ignore for `data/documents/` after the KB exception to ensure generated/runtime partial JSON files remain excluded.
3. **Preserved `!lib/data/`**: This pre-existing exception was kept unchanged.
4. **No tracked file exposure**: The `.ts` and `.json` files directly under `data/` are already tracked by Git — changing `data/` to `data/*` has no effect on them (gitignore does not apply to tracked files).

## Status

✅ **Fix complete. Not committed. Not pushed.**
