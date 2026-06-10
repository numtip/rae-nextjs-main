# View Research Analytics Opportunities

Source basis:
- `a2.csv` column metadata export from SSMS
- `a3.csv` sample row export from SSMS

Dataset profile from the exports:
- 44 columns
- 20 sample rows
- Mixed Thai and English content
- Research project, funding, researcher, organization, and date fields are all present in one view

## Executive KPI Opportunities

- Total research projects by `budgetYear`
- Total research budget by `budgetYear`
- Total budget by `research_money_type_name`
- Success rate by `research_success`
- Project count by `research_type_name`
- Project count by `disciplineGroupName`
- Budget concentration by `money_name`
- Average budget per project by `research_program_name`
- Researcher participation count by `personTypeName`
- Effort-weighted contribution using `workPercent`

## Research KPI Opportunities

- Share of projects by research type
- Share of projects by discipline group
- Share of projects by roadmap category
- Ratio of internal vs external funding
- Project completion / success distribution
- Cross-tab of `research_type_name` vs `research_program_name`
- Funding mix by `moneyLevelID` and `levelName`
- Researcher load by `personName` and `workPercent`
- Budget allocation by researcher and person type

## Faculty-Level Analytics

- Projects by `departmentName`
- Budget by `departmentName`
- Average project budget by `departmentName`
- Researcher count by department
- Internal vs external funding by department
- Discipline group distribution within a faculty or department
- Start and end date coverage by department
- Faculty-level participation of internal vs external persons

## Budget Analytics

- Budget totals by `budgetYear`
- Budget totals by `money_type_id`
- Budget totals by `money_name`
- Budget totals by `budgetDetail`
- Zero-budget project count
- Average budget by research type
- Budget distribution by person type
- Researcher budget share using `researchPersonBudget`
- Budget versus effort comparison using `budgetBath` and `workPercent`

## Research Trend Analytics

- Project start trend by `dateBegin`
- Project completion trend by `dateFinish`
- Year-over-year budget trend
- Research type trend over time
- Funding source trend over time
- Internal versus external funding trend
- Research success trend over time
- Research series trend using `research_series`

## Recommended Charts

- Line chart: total budget by `budgetYear`
- Bar chart: project count by `research_type_name`
- Stacked bar chart: internal vs external funding by `budgetYear`
- Donut chart: budget share by `research_money_type_name`
- Horizontal bar chart: projects by `departmentName`
- Scatter plot: `workPercent` versus `researchPersonBudget`
- Heatmap: `research_type_name` versus `research_program_name`
- Timeline chart: `dateBegin` and `dateFinish`
- Treemap: budget distribution by `money_name`
- KPI cards: total projects, total budget, success count, external funding count

## Primary Fields For Dashboards

- `budgetYear`
- `budgetBath`
- `research_success`
- `research_type_name`
- `research_program_name`
- `research_money_type_name`
- `money_name`
- `personTypeName`
- `departmentName`
- `disciplineGroupName`
- `dateBegin`
- `dateFinish`

## Primary Fields For APIs

- `research_id`
- `research_ref_code`
- `research_name_th`
- `research_name_eng`
- `budgetYear`
- `budgetBath`
- `research_type_name`
- `research_program_name`
- `research_money_type_name`
- `money_name`
- `personName`
- `personTypeName`
- `Position`
- `departmentName`
- `disciplineGroupName`

## Data Quality Considerations For Analytics

- Placeholder values such as `-- ไม่ระบุ --` will inflate "other" buckets unless normalized.
- `research_name_eng` contains gaps and inconsistent text quality.
- `personCode` uses mixed identifier formats and may need masking in public APIs.
- Several organizational code fields are blank in the sample set.
- `budgetBath` includes many zero values, which should be separated from true nulls.
- Mixed Thai and English text means dashboards should support bilingual labels or translations.

