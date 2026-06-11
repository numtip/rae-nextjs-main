# Agent Workflow — Research Data Lab

> Lightweight agent orchestration for CSV analytics, API design, dashboard planning, QA validation, and security review.
> Source reference: `vendor/agency-agents/` (agency-agents library) — curated into 5 project-specific agents under `.agents/`.

---

## 1. Workflow Philosophy

Each agent is **single-purpose**, **project-aware**, and **token-conscious**. Instead of one large prompt, we chain small, focused agents. Each agent:

- Reads only the files it needs (listed in its `Inputs` section)
- Produces a concrete output (listed in its `Outputs` section)
- Respects hard constraints that prevent scope creep
- Includes `Token-Saving Behavior` to minimize context consumption

---

## 2. Agent Map

```
                            ┌─────────────────┐
                            │  Data Analyst    │
                            │  (profile CSV)   │
                            └────────┬────────┘
                                     │
                                     ▼
                            ┌─────────────────┐
                            │  API Architect   │
                            │  (design routes) │
                            └────────┬────────┘
                                     │
                                     ▼
                            ┌─────────────────┐
                            │ Dashboard Plan. │
                            │  (layout + KPIs)│
                            └────────┬────────┘
                                     │
                          ┌──────────┴──────────┐
                          ▼                     ▼
                   ┌─────────────┐     ┌──────────────────┐
                   │ QA Reviewer │     │ Security Reviewer │
                   │ (validate)  │     │ (audit PII/CSV)  │
                   └─────────────┘     └──────────────────┘
```

### Parallel vs. Sequential

| Pattern | Use Case |
|---------|----------|
| **Sequential** (chained) | Building a feature end-to-end: profile → design → plan → validate |
| **Parallel** (fan-out) | Running QA + Security review on an existing feature simultaneously |
| **Single** | Ad-hoc task: "check this CSV for nulls" or "review this endpoint for PII" |

---

## 3. When to Invoke Each Agent

| Agent | Trigger | Input | Output |
|-------|---------|-------|--------|
| **Data Analyst** | New CSV arrives / data quality check needed | CSV files, models.ts, normalizer.ts, aggregates.ts | Row counts, nullability table, KPI summary, anomaly flags |
| **API Architect** | New endpoint needed / existing route reviewed | API spec, models.ts, route.ts reference, params.ts | Route definition, response types, error handling, cache headers |
| **Dashboard Planner** | New dashboard page planned | Dashboard blueprint, models.ts, aggregates.ts, filters.ts | Page layout, KPI card spec, chart spec, filter bar, breakpoints |
| **QA Reviewer** | After code changes / before promotion | smoke.ts, validation suite, models.ts, route.ts | Pass/fail report, schema validation, integrity flags, build status |
| **Security Reviewer** | Before public exposure / PII change | normalizer.ts, constants.ts, route.ts, architecture docs | PII audit, CSV injection assessment, error disclosure audit |

---

## 4. Token-Saving Invocation Flow

To minimise context size when running an agent:

### Step 1: Agent Selection (single prompt)

```
[Paste .agents/<agent-name>.md]
[Paste only the files listed in its Inputs section]
[Ask specific question]
```

### Step 2: Chain Agents Lightly

Pass only the **output summary** from agent A to agent B, not the full context:

```
Agent A output:
- Row count: 14,223
- Null rate on personCode: 0%
- Detected years: 2562–2566

Agent B: Given these CSV stats, design an endpoint that...
```

### Step 3: Parallel Validation

Run QA and Security reviews from the same build output:

```
QA Reviewer  ─── test results report
             X
Security    ─── PII audit report
```

Both agents share the same `route.ts` and `models.ts` context, but output different concerns.

---

## 5. Decision Matrix

| Situation | Agent(s) | Order |
|-----------|----------|-------|
| "New CSV needs to be understood" | Data Analyst | Single |
| "Need a new API that exposes a metric" | Data Analyst → API Architect | Sequential |
| "Building a dashboard page" | API Architect → Dashboard Planner | Sequential |
| "Before deploying to production" | QA Reviewer + Security Reviewer | Parallel |
| "Full feature from scratch" | Data Analyst → API Architect → Dashboard Planner → QA Reviewer + Security Reviewer | Full pipeline |
| "Bug in an existing endpoint" | QA Reviewer (run smoke tests first) | Single |
| "Is this data safe to expose?" | Security Reviewer | Single |

---

## 6. Constraints Registry

All agents share these cross-cutting constraints:

| Constraint | Applies To | Reason |
|------------|------------|--------|
| **Read-only data** | Data Analyst, API Architect, Dashboard Planner | CSV files are immutable snapshots from centerDW |
| **No authentication** | API Architect, Security Reviewer | MVP is internal-only; auth is out of scope |
| **personCode always masked** | All agents | `********xxxx` format required everywhere |
| **No SQL** | Data Analyst, API Architect, QA Reviewer | Data comes from CSV, not a database |
| **Placeholder normalization** | Data Analyst, QA Reviewer, Security Reviewer | `-- ไม่ระบุ --` → null |
| **Zero-budget preservation** | QA Reviewer | `budgetBath = 0` must remain 0, never become null |
| **Offline-only testing** | QA Reviewer | No external services; local CSV + Node.js |
| **No credentials stored** | Security Reviewer | Never suggest DB creds, API keys, or secrets |
| **Recharts only** | Dashboard Planner | Chart library is already chosen |
| **Server-first** | Dashboard Planner | Prefer RSC; `'use client'` only for interactive charts |

---

## 7. Example: Full Pipeline

```markdown
Goal: Add a new "Budget by Year" chart to the Executive Dashboard.

Step 1 — Data Analyst
  Input:  exports/a3.csv, lib/data/models.ts, lib/data/aggregates.ts
  Output: "budgetByYear exists in aggregates. Years 2562–2566. 
           2 projects have zero budget. personCode null rate: 0%."
  Context passed to next agent: ~5 lines

Step 2 — API Architect
  Input:  Data Analyst output + docs/RESEARCH_API_SPEC.md + app/api/research/stats/overview/route.ts
  Output: "New route: GET /api/research/stats/budget-by-year
           Response: { years: number[], budgets: number[] }
           Error: 503 if CSV missing, 500 on parse failure."
  Context passed to next agent: ~10 lines

Step 3 — Dashboard Planner
  Input:  API Architect output + docs/RESEARCH_DASHBOARD_BLUEPRINT.md + lib/data/models.ts
  Output: "Section: Executive Dashboard, 2nd row
           Chart: Recharts BarChart, X=year, Y=budgetBath
           KPI card: Total Budget (formatted THB)
           Filter bar: year range slider, default 2562–2566."
  Context passed to next agents: ~10 lines each

Step 4a — QA Reviewer (parallel)
  Input:  All outputs above + src/__tests__/smoke.ts
  Output: "smoke.ts passes (17/17). New endpoint test added.
           Data integrity: zero-budget preserved. No placeholders leaked."

Step 4b — Security Reviewer (parallel)
  Input:  All outputs above + lib/csv/normalizer.ts + lib/constants.ts
  Output: "PII audit: personCode masked in response. No CSV injection vector.
           Cache headers: Cache-Control set. Error messages generic.
           Recommendation: production-ready with caveat — no auth layer."
```

Total context for full pipeline: **~25 lines of passed context** — the bulk stays in the agent definitions (each <45 lines).

---

## 8. Agent File Format Reference

Each `.agents/*.md` follows this structure:

```markdown
---
name: <Agent Name>
description: <One-line scope>
color: <theme color>
emoji: <icon>
---

# Agent Name

## Role
<What this agent does — 1-2 sentences>

## When to Use
<Trigger conditions bullet list>

## Inputs
<File paths needed to do the job>

## Outputs
<Concrete deliverables>

## Constraints
<Hard rules that cannot be violated>

## Token-Saving Behavior
<Context efficiency strategies>
```

---

## 9. Source Agent Mapping

Each curated agent was distilled from specific agency-agents in `vendor/agency-agents/`:

| Curated Agent | Source Agents | Selection Rationale |
|---------------|---------------|---------------------|
| **Data Analyst** | `engineering/engineering-data-engineer.md`, `specialized/data-consolidation-agent.md` | Data pipeline + consolidation patterns scoped to CSV |
| **API Architect** | `engineering/engineering-backend-architect.md`, `engineering/engineering-software-architect.md` | Route design + architectural decision rigor |
| **Dashboard Planner** | `design/design-ux-architect.md`, `design/design-ui-designer.md` | UX architecture + visual design for dashboard layout |
| **QA Reviewer** | `testing/testing-api-tester.md`, `testing/testing-test-results-analyzer.md`, `engineering/engineering-code-reviewer.md` | API validation + test analysis + code review for correctness |
| **Security Reviewer** | `security/security-appsec-engineer.md`, `security/security-architect.md`, `engineering/engineering-code-reviewer.md` | AppSec + architecture review + code review for PII/injection |

**What was removed** from each source agent:
- Generic personality/identity sections (300+ lines → <5 lines)
- Language/framework examples not relevant to this project (Spark, Kafka, Docker)
- Tool-specific output templates (dbt, Great Expectations, Figma tokens)
- OWASP teaching material (kept only the audit checklist)
- Success metrics and learning/memory sections

**What was added** for this project:
- Project-specific file paths (`lib/csv/`, `app/api/`, `docs/`)
- Project-specific constraints (personCode masking, no SQL, Recharts only)
- Token-saving behaviors tuned to this codebase
- Concrete input references to existing documentation

---

## 10. Maintenance Notes

- **Adding a new agent**: Create `.agents/<name>.md` following the format in Section 8. Update Section 9 of this file with the source mapping.
- **Updating an agent**: Agent files are plain markdown — edit directly. Ensure `Token-Saving Behavior` is kept current.
- **Syncing with upstream agency-agents**: If the source repo adds relevant agents (e.g., a new `testing/` agent), evaluate distillation + add to Section 9.
- **Deprecating an agent**: Remove the file and update Sections 2, 3, and 5 of this document.
