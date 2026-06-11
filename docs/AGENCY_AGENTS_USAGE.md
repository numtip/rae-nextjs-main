# Agency Agents Usage Guide

> How to use the curated Research Data Lab agents in your workflow.
> Source reference: `vendor/agency-agents/` (cloned from [msitarzewski/agency-agents](https://github.com/msitarzewski/agency-agents))

---

## Overview

The `.agents/` directory contains 5 lightweight curated agents, each scoped to a specific Research Data Lab activity. They are adapted from the full agency-agents library but trimmed to this project's domain (View_Research CSV analytics, Next.js API design, dashboard planning).

---

## Available Agents

| Agent | File | Best For |
|-------|------|----------|
| **Data Analyst** | `.agents/data-analyst.md` | CSV row profiling, KPI computation, data quality checks |
| **API Architect** | `.agents/api-architect.md` | REST endpoint design, response contracts, error handling |
| **Dashboard Planner** | `.agents/dashboard-planner.md` | Layout, KPI cards, chart selection, filter bar specs |
| **QA Reviewer** | `.agents/qa-reviewer.md` | Smoke tests, integration validation, regression checks |
| **Security Reviewer** | `.agents/security-reviewer.md` | PII audit, CSV injection, error disclosure, production readiness |

---

## How to Use

### Option 1: Agentic Mode (in Cursor/Claude)

Copy-paste the relevant agent file into the chat to activate its persona. The agent will follow its role, inputs, outputs, and constraints.

```
[Paste contents of .agents/data-analyst.md]
[Then ask your question]
```

### Option 2: Quick Reference

Open the `.md` file directly and use it as a checklist:

- **Role** — confirms the agent is right for the task
- **When to Use** — triggers for when to invoke this agent
- **Inputs** — files to read first
- **Outputs** — what to produce
- **Constraints** — guardrails to follow
- **Token-Saving Behavior** — efficiency tips

### Option 3: Automated Workflow

Chain agents together in sequence:

```
Data Analyst  →  API Architect  →  Dashboard Planner  →  QA Reviewer  →  Security Reviewer
  (profile CSV)  (design endpoint)  (plan dashboard view)  (validate)      (audit PII)
```

---

## Source Reference

The full agency-agents library is cloned at `vendor/agency-agents/`. It contains **280+ agents** across 16 categories:

| Category | Agents | Relevance to RDL |
|----------|--------|------------------|
| `engineering/` | 33 | High — backend, data, code review, architecture |
| `testing/` | 8 | High — API testing, performance, results analysis |
| `security/` | 10 | High — AppSec, compliance, threat detection |
| `design/` | 9 | Medium — UX architecture, UI design |
| `product/` | — | Low — product management, not analytics |
| `finance/` | — | Low — not relevant to research data |

Browse the full catalog when you need a specialist not covered by the curated set.

---

## Agent Creation Principles

Each curated agent follows these design rules:

1. **Short** — under 100 lines, focused on RDL-specific workflows
2. **Role-specific** — one job per agent, no overlap
3. **Project-aware** — references actual file paths (`lib/csv/`, `app/api/`)
4. **Token-conscious** — includes `Token-Saving Behavior` section
5. **Constraint-bound** — each agent has explicit rules to prevent scope creep

---

## Reference Agents Used

Each curated agent was distilled from source agents in `vendor/agency-agents/`:

| Curated Agent | Source Agent(s) |
|---------------|----------------|
| Data Analyst | `engineering/engineering-data-engineer.md`, `specialized/data-consolidation-agent.md` |
| API Architect | `engineering/engineering-backend-architect.md`, `engineering/engineering-software-architect.md` |
| Dashboard Planner | `design/design-ux-architect.md`, `design/design-ui-designer.md` |
| QA Reviewer | `testing/testing-api-tester.md`, `testing/testing-test-results-analyzer.md` |
| Security Reviewer | `security/security-appsec-engineer.md`, `security/security-architect.md` |
