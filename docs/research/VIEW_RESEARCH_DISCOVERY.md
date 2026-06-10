# View Research Discovery

Source basis:
- `a2.csv` exported column metadata
- `a3.csv` exported sample data

## What This View Appears To Be

`centerDW.View_Research` looks like a combined research portfolio view that merges:
- research project identity
- research title data in Thai and English
- research classification fields
- funding and budget data
- researcher assignment data
- department / faculty hierarchy data
- research date range data

The sample evidence suggests this view is intended for reporting, dashboards, and API delivery rather than transactional use.

## Actual Findings

- The view has 44 columns.
- The sample export contains 20 rows.
- The data mixes Thai and English text in the same records.
- The same researcher can appear across multiple project rows.
- There are both internal and external funding cases.
- Some fields are fully populated lookup labels, while others are code fields or blanks.
- `budgetBath` includes both positive amounts and zero values.
- `research_ref_code` is not present for every row.
- Some lookup fields use placeholder text such as `-- ไม่ระบุ --`.
- `facultyID` and `programCode` are blank in the sample rows, so those look incomplete in the current export.

## Strong Reporting Fields

- `budgetYear`
- `budgetBath`
- `research_success`
- `research_type_name`
- `research_program_name`
- `research_money_type_name`
- `money_name`
- `personTypeName`
- `Position`
- `departmentName`
- `disciplineGroupName`
- `dateBegin`
- `dateFinish`

## Best Business Uses

- Executive KPI dashboard
- Research portfolio overview
- Faculty and department performance reporting
- Budget allocation monitoring
- Researcher participation analysis
- Public or internal API responses after sensitive fields are filtered

## Data Quality Notes

- Placeholder labels need normalization before charting.
- Text quality is inconsistent in the English title field.
- Identifier fields may require masking if exposed externally.
- Zero-budget rows should be reviewed before treating them as funded projects.
- Some organizational fields look under-populated and may limit deep hierarchy analysis.

## Recommendation

Use this view as a V1 reporting source, but normalize lookup placeholders and sensitive identifiers before exposing it to broad dashboard audiences or a public API.

