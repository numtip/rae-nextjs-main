/**
 * GET /api/research/stats/portfolio
 *
 * Returns portfolio overview for the Research Portfolio dashboard.
 * Includes summary KPIs, breakdown by research type, breakdown by department,
 * and 10 most recent projects.
 *
 * Query parameters (all optional):
 *   budgetYears          - comma-separated BE years
 *   researchTypeNames    - comma-separated type labels
 *   fundingTypeNames     - comma-separated funding type labels
 *   departmentNames      - comma-separated department names
 *   disciplineGroupNames - comma-separated discipline groups
 *   successStatus        - "all" | "success" | "not_success"
 *   personTypeNames      - comma-separated person types
 *   moneyNames           - comma-separated funding source names
 *   dateFrom             - ISO date string (start)
 *   dateTo               - ISO date string (end)
 */

import { NextRequest, NextResponse } from "next/server";
import { loadResearchData, CsvNotFoundError, CsvParseError } from "@/lib/csv/loader";
import { applyFilters } from "@/lib/data/filters";
import { parseFilterParams } from "@/lib/data/params";
import { computePortfolioStats } from "@/lib/data/aggregates";
import type { PortfolioStats, ApiError } from "@/lib/data/models";

export const dynamic = "force-static";

export async function GET(request: NextRequest): Promise<NextResponse<PortfolioStats | ApiError>> {
  try {
    const { searchParams } = new URL(request.url);
    const filters = parseFilterParams(searchParams);

    const dataset = await loadResearchData();

    let filtered = applyFilters(dataset, filters);

    // Apply budget-year filter at the budget level (same pattern as stats/budget)
    if (filters.budgetYears.length > 0) {
      const yearSet = new Set(filters.budgetYears);
      filtered = {
        ...filtered,
        budgets: filtered.budgets.filter(
          (b) => b.budgetYear !== null && yearSet.has(b.budgetYear)
        ),
      };
    }

    // Apply moneyNames filter at the budget level
    if (filters.moneyNames.length > 0) {
      const moneySet = new Set(filters.moneyNames);
      filtered = {
        ...filtered,
        budgets: filtered.budgets.filter(
          (b) => b.moneyName !== null && moneySet.has(b.moneyName)
        ),
      };
    }

    // Apply fundingTypeNames filter at the budget level
    if (filters.fundingTypeNames.length > 0) {
      const typeSet = new Set(filters.fundingTypeNames);
      filtered = {
        ...filtered,
        budgets: filtered.budgets.filter(
          (b) => b.moneyTypeName !== null && typeSet.has(b.moneyTypeName)
        ),
      };
    }

    const stats = computePortfolioStats(filtered);

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
          details: { message: (error as Error).message },
        },
        { status: 503 }
      );
    }

    if (error instanceof CsvParseError) {
      return NextResponse.json(
        {
          error: "Failed to parse data source",
          code: "CSV_PARSE_ERROR",
          details: { message: (error as Error).message },
        },
        { status: 500 }
      );
    }

    console.error("GET /api/research/stats/portfolio failed:", error);
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
