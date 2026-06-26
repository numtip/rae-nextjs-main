/**
 * GET /api/research/budget/stats
 *
 * Returns budget statistics in a standardized wrapped response.
 * Thin wrapper around the canonical /api/research/stats/budget endpoint
 * that provides a uniform { success, generatedAt, data } envelope.
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
import { loadResearchData, CsvNotFoundError, CsvParseError } from "@/lib/csv/loader";
import { applyFilters, DEFAULT_FILTERS } from "@/lib/data/filters";
import { parseFilterParams } from "@/lib/data/params";
import { computeAndWrapBudgetStats } from "@/lib/adapters/budgetStatsAdapter";
import type { BudgetStatsResponse } from "@/lib/contracts/budgetStats";
import type { ApiError } from "@/lib/data/models";

export const dynamic = "force-static";

export async function GET(
  request: NextRequest
): Promise<NextResponse<BudgetStatsResponse | ApiError>> {
  try {
    // Parse query parameters
    const { searchParams } = new URL(request.url);
    const filters = parseFilterParams(searchParams);

    // Validate filter parameters
    const budgetYearsParam = searchParams.get("budgetYears");
    if (budgetYearsParam !== null) {
      const years = budgetYearsParam.split(",").map((s) => parseInt(s.trim(), 10));
      if (years.some((y) => isNaN(y))) {
        return NextResponse.json(
          {
            error: "Invalid filter parameter",
            code: "INVALID_FILTER",
            details: {
              parameter: "budgetYears",
              value: budgetYearsParam,
              expected: "comma-separated integers",
            },
          },
          { status: 400 }
        );
      }
    }

    // Load CSV dataset
    const dataset = await loadResearchData();

    // Apply project-level filters
    let filtered = applyFilters(dataset, filters);

    // Apply budget-year filter at the budget level
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

    // Compute and wrap budget stats via adapter
    const response = computeAndWrapBudgetStats(filtered);

    return NextResponse.json(response, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
        "X-API-Version": "1.0",
        "X-Generated-At": response.generatedAt,
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

    console.error("GET /api/research/budget/stats failed:", error);
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
