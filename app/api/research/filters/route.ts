/**
 * GET /api/research/filters
 *
 * Returns all available filter options with counts, derived from
 * the View_Research CSV dataset. Used by the global filter bar.
 *
 * Cache: s-maxage=600 (10 minutes) — filter options are stable.
 */

import { NextRequest, NextResponse } from "next/server";
import { loadResearchData, CsvNotFoundError, CsvParseError } from "@/lib/csv/loader";
import { computeFilters } from "@/lib/data/aggregates";
import type { FiltersResponse, ApiError } from "@/lib/data/models";

export const dynamic = "force-static";

export async function GET(request: NextRequest): Promise<NextResponse<FiltersResponse | ApiError>> {
  try {
    // Load CSV dataset
    const dataset = await loadResearchData();

    // Compute filter options
    const filters = computeFilters(dataset);

    return NextResponse.json(filters, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=600, stale-while-revalidate=1200",
        "X-API-Version": "1.0",
        "X-Generated-At": filters.generatedAt,
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

    console.error("GET /api/research/filters failed:", error);
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
