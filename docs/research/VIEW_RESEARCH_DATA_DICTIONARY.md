# Data Dictionary: `centerDW.View_Research`

Source basis:
- `a2.csv` exported column metadata from SSMS
- `a3.csv` exported sample rows from SSMS

Scope:
- Read-only analysis only
- Based on the provided CSV exports, not a live database connection

Dataset profile:
- 44 columns
- 20 sample rows
- Mixed Thai and English content

## View Summary

`View_Research` appears to be a combined research portfolio view with:
- research identifiers and titles
- research classification fields
- funding and budget fields
- researcher identity and position fields
- organization hierarchy fields
- start and end dates

## Column Dictionary

| Column name | Inferred data type | Business description | Nullable assessment | Sample value | Dashboard usefulness | API usefulness |
|---|---|---|---|---|---|---|
| `research_id` | `int` | Unique research record identifier | Required | `3962` | High | High |
| `research_ref_code` | `varchar(50)` | Project reference or tracking code | Optional | `UNUD-58-001` | High | High |
| `research_name_th` | `varchar(500)` | Thai project title | Optional | `การศึกษาเปรียบเทียบการกลับเข้าสู่ธุรกิจของผู้ประกอบการในประเทศอินโดนีเซีย` | Medium | High |
| `research_name_eng` | `varchar(500)` | English project title | Optional | `A Comparative study of entrepreneurial re-entry strategies in Indonesia and Thailand...` | High | High |
| `research_type_id` | `int` | Research type code | Optional | `2` | High | High |
| `research_type_name` | `varchar(255)` | Research type label | Optional | `การวิจัยประยุกต์` | High | High |
| `research_program_id` | `int` | Academic program or discipline code | Optional | `16` | High | High |
| `research_program_name` | `varchar(255)` | Academic program or discipline name | Optional | `สาขาเศรษฐศาสตร์และบริหารธุรกิจ` | High | High |
| `denomination_id` | `int` | Research category / methodology code | Optional | `4` | Medium | Medium |
| `denomination_name` | `varchar(500)` | Research category / methodology label | Optional | `-- ไม่ระบุ --` | Medium | Medium |
| `road_map_id` | `int` | Strategic roadmap code | Optional | `1` | Medium | Medium |
| `road_map_name` | `varchar(200)` | Strategic roadmap label | Optional | `-- ไม่ระบุ --` | Medium | Medium |
| `research_series` | `bit` | Indicates whether the item belongs to a series | Optional | `0` | Low | Medium |
| `research_series_main` | `bit` | Marks the main item in a series | Optional | `0` | Low | Low |
| `research_success` | `bit` | Indicates success or completion status | Optional | `1` | High | High |
| `budgetID` | `int` | Budget record identifier | Required | `3151` | High | High |
| `money_type_id` | `int` | Funding type code | Optional | `2` | High | High |
| `research_money_type_name` | `varchar(200)` | Funding type label | Optional | `งบประมาณภายนอกสถาบัน` | High | High |
| `money_id` | `int` | Funding source detail code | Optional | `11` | High | High |
| `money_name` | `varchar(200)` | Funding source name | Optional | `งานวิจัยระดับนานาชาติ` | High | High |
| `moneyLevelID` | `int` | Funding scope level code | Optional | `4` | Medium | Medium |
| `levelName` | `varchar(300)` | Funding scope level name | Optional | `ระดับนานาชาติ` | Medium | Medium |
| `budgetDetail` | `varchar(300)` | Specific sponsor or budget note | Optional | `Udayana University Indonesia` | High | High |
| `budgetYear` | `int` | Budget year in Buddhist Era | Optional | `2558` | High | High |
| `budgetBath` | `money` | Budget amount | Optional | `255340.00` | High | High |
| `researcherID` | `int` | Researcher participation row identifier | Required | `1` | High | High |
| `personType` | `int` | Internal/external person code | Optional | `1` | Medium | Medium |
| `personTypeName` | `varchar(12)` | Internal/external person label | Required | `บุคลากรภายใน` | High | High |
| `personCode` | `varchar(50)` | Person identifier or staff code | Optional | `0801198500078` | High | High |
| `personName` | `varchar(300)` | Person name | Optional | `Asst. Prof. Dr.Jorge Fidel Barahona Caceres` | High | High |
| `apiPositionID` | `varchar(50)` | Position code from an external API or HR mapping | Required | `002` | Medium | High |
| `Position` | `varchar(300)` | Academic or professional position title | Required | `ผู้ช่วยศาสตราจารย์` | High | High |
| `departmentCode` | `varchar(50)` | Department code | Optional | `20500` | Medium | Medium |
| `divisionCode` | `varchar(50)` | Division code | Optional | `20500` | Medium | Medium |
| `sectionCode` | `varchar(50)` | Section code | Optional | `20500` | Medium | Medium |
| `facultyID` | `varchar(50)` | Faculty identifier | Optional | blank in sample | Low | Medium |
| `programCode` | `varchar(50)` | Program code | Optional | blank in sample | Low | Medium |
| `departmentName` | `varchar(600)` | Department or faculty name | Optional | `คณะเศรษฐศาสตร์` | High | High |
| `workPercent` | `real` | Share of work effort assigned to the researcher | Optional | `20` | High | High |
| `researchPersonBudget` | `real` | Budget allocated to the researcher | Optional | `51068` | High | High |
| `disciplineGroupID` | `int` | Broad discipline group code | Required | `2` | High | High |
| `disciplineGroupName` | `varchar(25)` | Broad discipline group name | Required | `มนุษยศาสตร์และสังคมศาสตร์` | High | High |
| `dateBegin` | `date` | Research start date | Optional | `2014-10-01` | High | High |
| `dateFinish` | `date` | Research end date | Optional | `2015-09-30` | High | High |

## Notes

- `research_ref_code` is missing for at least one sample row.
- Lookup fields often use `-- ไม่ระบุ --` as a placeholder.
- `research_name_eng` has inconsistent quality and formatting.
- `facultyID` and `programCode` are blank in the sample export.
- `budgetBath` includes zero values, so zero should not be treated the same as null.
- `personCode` contains mixed identifier formats.
- The view is well suited for dashboarding and API exposure after sensitive fields are masked where necessary.

