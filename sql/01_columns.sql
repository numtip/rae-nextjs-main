-- ============================================================================
-- 01_columns.sql
-- Purpose : List every column in View_Research with its data type.
-- Usage   : Run against the target SQL Server database.
-- Warning : READ-ONLY — do not modify any data or schema.
-- ============================================================================

SELECT
    COLUMN_NAME,
    DATA_TYPE
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_NAME = 'View_Research'
ORDER BY ORDINAL_POSITION;
