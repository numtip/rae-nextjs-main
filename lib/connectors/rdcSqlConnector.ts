/**
 * RDC SQL Connector — Read-Only SQL Server Connection
 *
 * Build-time SQL Server connector for the Research Data Center.
 * Runs only during build/CI — never in browser JavaScript.
 *
 * Design principles:
 * - Read-only SELECT only (SQL login has db_datareader)
 * - Environment-based config — no secrets in source
 * - Encrypt=true, TrustServerCertificate=true (self-signed cert)
 * - Connection always closed in finally block
 * - No UI coupling — returns raw rows for the normalizer pipeline
 *
 * Environment variables:
 *   RDC_SQL_SERVER         (default: 10.1.254.53)
 *   RDC_SQL_PORT           (default: 1433)
 *   RDC_SQL_DATABASE       (default: centerDW)
 *   RDC_SQL_USER           (default: DCResearchUser)
 *   RDC_SQL_PASSWORD       REQUIRED — no default
 *   RDC_SQL_CONNECT_TIMEOUT (default: 10000)
 *   RDC_SQL_QUERY_TIMEOUT  (default: 30000)
 *
 * @see docs/contracts/RDC_CONNECTION_CONTRACT.md
 * @see docs/contracts/RDC_BUDGET_SQL_SOURCE_CONTRACT.md
 */

import sql from "mssql";

// ─── Configuration ─────────────────────────────────────────────────

export interface RdcSqlConnectorConfig {
  server: string;
  port: number;
  database: string;
  user: string;
  password: string;
  connectTimeout: number;
  queryTimeout: number;
}

/**
 * Load connector configuration from environment variables.
 * RDC_SQL_PASSWORD is required — throws if missing.
 */
export function loadRdcSqlConfig(): RdcSqlConnectorConfig {
  const password = process.env.RDC_SQL_PASSWORD;
  if (!password) {
    throw new Error(
      "RDC_SQL_PASSWORD environment variable is required. " +
        "Set it in .env.local (gitignored) or CI secrets."
    );
  }

  return {
    server: process.env.RDC_SQL_SERVER || "10.1.254.53",
    port: parseInt(process.env.RDC_SQL_PORT || "1433", 10),
    database: process.env.RDC_SQL_DATABASE || "centerDW",
    user: process.env.RDC_SQL_USER || "DCResearchUser",
    password,
    connectTimeout: parseInt(
      process.env.RDC_SQL_CONNECT_TIMEOUT || "10000",
      10
    ),
    queryTimeout: parseInt(
      process.env.RDC_SQL_QUERY_TIMEOUT || "30000",
      10
    ),
  };
}

/**
 * Build a mssql-compatible connection config.
 */
export function buildSqlConnectionConfig(
  config: RdcSqlConnectorConfig
): sql.config {
  return {
    server: config.server,
    port: config.port,
    database: config.database,
    user: config.user,
    password: config.password,
    options: {
      encrypt: true,
      trustServerCertificate: true,
      connectTimeout: config.connectTimeout,
      requestTimeout: config.queryTimeout,
    },
  };
}

// ─── Query execution ───────────────────────────────────────────────

/**
 * Execute a read-only SQL query and return the result rows.
 *
 * - Connection is always closed in finally block.
 * - Only SELECT queries are permitted (read-only).
 * - Throws on connection failure, query error, or timeout.
 *
 * @param query - SQL SELECT query to execute
 * @param config - Optional connector config (defaults from env)
 * @returns Array of rows as key-value records
 */
export async function executeQuery(
  query: string,
  config?: RdcSqlConnectorConfig
): Promise<Record<string, unknown>[]> {
  const cfg = config ?? loadRdcSqlConfig();
  const sqlConfig = buildSqlConnectionConfig(cfg);

  let pool: sql.ConnectionPool | null = null;

  try {
    pool = await sql.connect(sqlConfig);

    const result = await pool.request().query(query);

    return result.recordset as Record<string, unknown>[];
  } finally {
    if (pool) {
      try {
        await pool.close();
      } catch {
        // Log and swallow close errors — connection is already dead
        console.warn("rdcSqlConnector: connection close warning (non-fatal)");
      }
    }
  }
}

// ─── Convenience: View_Research query builder ──────────────────────

/**
 * Build a SELECT query for View_Research with an optional WHERE clause.
 *
 * @param whereClause - Optional WHERE clause (without the WHERE keyword)
 * @returns Fully qualified SELECT statement
 */
export function buildViewResearchQuery(whereClause?: string): string {
  const base = "SELECT * FROM centerDW.dbo.View_Research";
  if (whereClause) {
    return `${base} WHERE ${whereClause}`;
  }
  return base;
}
