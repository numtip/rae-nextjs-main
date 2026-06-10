# KPI Data Owner Workflow

**Purpose:** Guide data owners on updating `data/kpiSnapshot.json` safely.  

**Audience:** RAE data owners / ops — non-developers who maintain KPI metric values.  

**Last updated:** RC2 Slice 4

---

## Overview

Homepage KPI cards (research projects, publications, training, partners) are driven by a single checked-in JSON file:

```
data/kpiSnapshot.json   ← YOU edit this
```

Every build automatically validates this file. If the file is missing or malformed, the build **fails** — so nothing broken ships to production.

---

## Files you MAY edit

| File | Purpose |
|------|---------|
| `data/kpiSnapshot.json` | Update metric values, labels, timestamps, and source metadata here. |

## Files you must NOT edit

| File | Reason |
|------|--------|
| `scripts/validate-kpi-snapshot.ts` | Build-time validator — schema enforcement. Developer-maintained. |
| `data/loadKpiSnapshot.ts` | Typed loader that imports the JSON at build time. Developer-maintained. |
| `data/kpiSnapshot.schema.json` | JSON Schema contract. Developer-maintained. |
| `data/kpiSnapshot.example.json` | Reference example. Only update when the schema changes. |
| `components/home/KpiImpactStrip.tsx` | UI renderer. No data values here. |

---

## Required fields (every metric)

Each of the 4 metrics in `metrics[]` must include:

| Field | Type | Max length | Required |
|-------|------|-----------|----------|
| `id` | string — one of the 4 metric IDs below | — | Yes |
| `value` | string (e.g. `"120+"`, `"85"`) | 32 | Yes |
| `labelTh` | string — Thai display label | 120 | Yes |
| `labelEn` | string — English display label | 120 | Yes |
| `contextTh` | string — Thai context/note | 160 | No |
| `contextEn` | string — English context/note | 160 | No |
| `highlight` | boolean — gold accent card | — | No |

---

## Allowed metric IDs (exactly 4, order-independent)

| ID | Meaning |
|----|---------|
| `research-projects` | Research projects supported |
| `publications-outputs` | Publications & outputs |
| `training-outreach` | Training & outreach events |
| `partner-organisations` | Partner organisations |

All 4 IDs must be present. No duplicate IDs allowed.

---

## Highlight rule

- At most **one** metric per snapshot may have `"highlight": true`.
- That card receives a gold accent color in the UI.
- Currently assigned to `publications-outputs`.

---

## Root fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `schemaVersion` | `"1"` | Yes | Must always be `"1"`. Bumped only with migration docs. |
| `generatedAt` | ISO-8601 datetime string | Yes | Update this when you refresh values. Example: `"2026-06-10T12:00:00.000Z"` |
| `source` | one of: `manual`, `registry-api`, `metabase-export`, `placeholder` | Yes | Records how the values were obtained. Never store credentials. |
| `status` | one of: `verified`, `pending-live-source` | Yes | `verified` = data-owner approved; `pending-live-source` = shows placeholder notice. |
| `metrics` | array of 4 metric objects | Yes | See "Required fields" above. |

---

## Local validation (before committing)

Run this command to validate your changes:

```bash
rtk bash -lc 'source ~/.nvm/nvm.sh && nvm use 20 && npm run kpi:validate'
```

Expected output:

```
KPI_VALIDATE: PASS — data/kpiSnapshot.json
  schemaVersion: 1
  source: manual
  status: verified
  metrics: 4
KPI_VALIDATE: PASS — data/kpiSnapshot.example.json
  schemaVersion: 1
  source: placeholder
  status: pending-live-source
  metrics: 4
KPI_VALIDATE: ALL PASS
```

If validation fails, fix the errors listed before committing.

---

## PR checklist (for data-owner changes)

Before submitting a PR or push:

- [ ] Values are accurate and data-owner approved
- [ ] `generatedAt` updated to current timestamp
- [ ] `source` updated to reflect provenance (e.g. `"manual"`)
- [ ] `status` set to `"verified"` if values are data-owner approved
- [ ] `npm run kpi:validate` passes
- [ ] No secrets or credentials in the file
- [ ] `highlight` on at most one metric

---

## Rollback

If incorrect values are pushed:

1. Revert the snapshot file to the previous commit:

```bash
rtk git checkout HEAD~1 -- data/kpiSnapshot.json
```

2. Commit and push the restore.

3. Create a new PR with corrected values after data-owner re-approval.

---

## No secrets / no live API credentials

- **Never** put API keys, database passwords, or Metabase tokens in `kpiSnapshot.json`.
- The `source` field records provenance only — never credentials.
- Live API integration (if added later) uses CI-only secrets, never this file.
