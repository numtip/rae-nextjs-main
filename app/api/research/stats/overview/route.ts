/**
 * GET /api/research/stats/overview
 *
 * Returns executive summary KPIs and top-level breakdowns
 * from the View_Research CSV dataset.
 *
 * Query parameters (all optional):
 *   budgetYears        - comma-separated BE years
 *   researchTypeNames  - comma-separated type labels
 *   fundingTypeNames   - comma-separated funding type labels
 *   departmentNames    - comma-separated department names
 *   disciplineGroupNames - comma-separated discipline groups
 *   successStatus      - "all" | "success" | "not_success"
 *   personTypeNames    - comma-separated person types
 *   moneyNames         - comma-separated funding source names
 *   dateFrom           - ISO date string (start)
 *   dateTo             - ISO date string (end)
 */

import { NextRequest, NextResponse } from "next/server";
import { loadResearchData } from "@/lib/csv/loader";
import { CsvNotFoundError, CsvParseError } from "@/lib/csv/loader";
import { applyFilters } from "@/lib/data/filters";
import { parseFilterParams } from "@/lib/data/params";
import { computeOverviewStats } from "@/lib/data/aggregates";
import type { OverviewStats, ApiError } from "@/lib/data/models";

export const dynamic = "force-dynamic";
export const revalidate = 300; // 5 minutes

export async function GET(request: NextRequest): Promise<NextResponse<OverviewStats | ApiError>> {
  try {
    // Parse query parameters
    const { searchParams } = new URL(request.url);
    const filters = parseFilterParams(searchParams);

    // Load CSV dataset
    const dataset = await loadResearchData();

    // Apply filters
    const filtered = applyFilters(dataset, filters);

    // Compute overview stats
    const stats = computeOverviewStats(filtered);

    return NextResponse.json(stats, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
        "X-API-Version": "1.0",
        "X-Generated-At": stats.generatedAt,
        "X-Data-Source": "centerDW.View_Research",
        "X-Record-Count": String(dataset.projects.length),
      },
    });
  } catch (error) {
    if (error instanceof CsvNotFoundError) {
      return NextResponse.json(
        {
          error: "Data source not available",
          code: "CSV_NOT_FOUND",
          details: { message: error.message },
        },
        { status: 503 }
      );
    }

    if (error instanceof CsvParseError) {
      return NextResponse.json(
        {
          error: "Failed to parse data source",
          code: "CSV_PARSE_ERROR",
          details: { message: error.message },
        },
        { status: 500 }
      );
    }

    console.error("GET /api/research/stats/overview failed:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        code: "INTERNAL_ERROR",
        details: error instanceof Error ? { message: error.message } : null,
      },
      { status: 500 }
    );
  }
}
