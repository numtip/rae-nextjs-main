/**
 * GET /api/research/projects
 *
 * Paginated, searchable, sortable, filterable list of research projects.
 *
 * Query parameters:
 *   page            - page number (default: 1)
 *   pageSize        - items per page (default: 20, max: 100)
 *   q               - keyword search (nameTh, nameEng, refCode)
 *   sort            - researchId | budgetYear | totalBudget | nameTh (default: researchId)
 *   order           - asc | desc (default: desc)
 *   budgetYears     - comma-separated BE years
 *   fundingTypes    - comma-separated moneyTypeName values
 *   moneySources    - comma-separated moneyName values
 *   levels          - comma-separated levelName values
 *   disciplines     - comma-separated disciplineGroupName values
 *   researchTypes   - comma-separated typeName values (__unspecified__ for null types)
 */

import { NextRequest, NextResponse } from "next/server";
import { loadResearchData, CsvNotFoundError, CsvParseError } from "@/lib/csv/loader";
import { computeProjects, DEFAULT_PROJECTS_PARAMS } from "@/lib/data/aggregates";
import type { ProjectsQueryParams } from "@/lib/data/aggregates";
import type { ProjectsResponse, ApiError } from "@/lib/data/models";

export const dynamic = "force-dynamic";
export const revalidate = 120; // 2 minutes

const VALID_SORT_FIELDS = new Set(["researchId", "budgetYear", "totalBudget", "nameTh"]);
const VALID_ORDER_VALUES = new Set(["asc", "desc"]);

export async function GET(
  request: NextRequest
): Promise<NextResponse<ProjectsResponse | ApiError>> {
  try {
    const { searchParams } = new URL(request.url);

    // ── Validate and parse pagination ───────────────────────────
    const rawPage = searchParams.get("page");
    const rawPageSize = searchParams.get("pageSize");

    const page = rawPage !== null ? parseInt(rawPage, 10) : 1;
    const pageSize = rawPageSize !== null ? parseInt(rawPageSize, 10) : 20;

    if (rawPage !== null && (isNaN(page) || page < 1)) {
      return NextResponse.json(
        { error: "Invalid parameter: page must be a positive integer", code: "INVALID_PARAM", details: { parameter: "page", value: rawPage } },
        { status: 400 }
      );
    }
    if (rawPageSize !== null && (isNaN(pageSize) || pageSize < 1 || pageSize > 100)) {
      return NextResponse.json(
        { error: "Invalid parameter: pageSize must be between 1 and 100", code: "INVALID_PARAM", details: { parameter: "pageSize", value: rawPageSize } },
        { status: 400 }
      );
    }

    // ── Validate sort/order ─────────────────────────────────────
    const sort = searchParams.get("sort") ?? DEFAULT_PROJECTS_PARAMS.sort;
    const order = searchParams.get("order") ?? DEFAULT_PROJECTS_PARAMS.order;

    if (!VALID_SORT_FIELDS.has(sort)) {
      return NextResponse.json(
        { error: `Invalid parameter: sort must be one of ${Array.from(VALID_SORT_FIELDS).join(", ")}`, code: "INVALID_PARAM", details: { parameter: "sort", value: sort } },
        { status: 400 }
      );
    }
    if (!VALID_ORDER_VALUES.has(order)) {
      return NextResponse.json(
        { error: "Invalid parameter: order must be asc or desc", code: "INVALID_PARAM", details: { parameter: "order", value: order } },
        { status: 400 }
      );
    }

    // ── Validate budgetYears ────────────────────────────────────
    const rawYears = searchParams.get("budgetYears");
    let budgetYears: number[] = [];
    if (rawYears) {
      budgetYears = rawYears.split(",").map((s) => parseInt(s.trim(), 10));
      if (budgetYears.some(isNaN)) {
        return NextResponse.json(
          { error: "Invalid parameter: budgetYears must be comma-separated integers", code: "INVALID_PARAM", details: { parameter: "budgetYears", value: rawYears } },
          { status: 400 }
        );
      }
    }

    // ── Parse string list filters ───────────────────────────────
    const parseList = (key: string): string[] => {
      const raw = searchParams.get(key);
      if (!raw) return [];
      return raw.split(",").map((s) => s.trim()).filter(Boolean);
    };

    const params: ProjectsQueryParams = {
      page,
      pageSize,
      q: searchParams.get("q") || null,
      sort: sort as ProjectsQueryParams["sort"],
      order: order as ProjectsQueryParams["order"],
      budgetYears,
      fundingTypes: parseList("fundingTypes"),
      moneySources: parseList("moneySources"),
      levels: parseList("levels"),
      disciplines: parseList("disciplines"),
      researchTypes: parseList("researchTypes"),
    };

    // ── Load and compute ────────────────────────────────────────
    const dataset = await loadResearchData();
    const response = computeProjects(dataset, params);

    return NextResponse.json(response, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=120, stale-while-revalidate=300",
        "X-API-Version": "1.0",
        "X-Generated-At": response.generatedAt,
        "X-Data-Source": "centerDW.View_Research",
        "X-Total-Items": String(response.pagination.totalItems),
        "X-Record-Count": String(dataset.projects.length),
      },
    });
  } catch (error) {
    if (error instanceof CsvNotFoundError) {
      return NextResponse.json(
        { error: "Data source not available", code: "CSV_NOT_FOUND", details: { message: error.message } },
        { status: 503 }
      );
    }
    if (error instanceof CsvParseError) {
      return NextResponse.json(
        { error: "Failed to parse data source", code: "CSV_PARSE_ERROR", details: { message: error.message } },
        { status: 500 }
      );
    }
    console.error("GET /api/research/projects failed:", error);
    return NextResponse.json(
      { error: "Internal server error", code: "INTERNAL_ERROR", details: error instanceof Error ? { message: error.message } : null },
      { status: 500 }
    );
  }
}
