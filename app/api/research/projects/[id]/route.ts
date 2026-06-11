/**
 * GET /api/research/projects/[id]
 *
 * Returns the full detail view for a single research project.
 *
 * Path parameter:
 *   id  - numeric researchId (positive integer)
 *
 * Response shape: { project, researchers, budgets, generatedAt }
 *
 * Error codes:
 *   400 INVALID_PARAM  — id is not a valid positive integer
 *   404 NOT_FOUND      — no project with this researchId
 *   503 CSV_NOT_FOUND  — dataset missing
 *   500 CSV_PARSE_ERROR / INTERNAL_ERROR
 */

import { NextRequest, NextResponse } from "next/server";
import { loadResearchData, CsvNotFoundError, CsvParseError } from "@/lib/csv/loader";
import { computeProjectDetail } from "@/lib/data/aggregates";
import type { ProjectDetailResponse, ApiError } from "@/lib/data/models";

export const dynamic = "force-dynamic";
export const revalidate = 300; // 5 minutes

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<ProjectDetailResponse | ApiError>> {
  try {
    // ── Validate path parameter ────────────────────────────────────
    const { id: rawId } = await params;
    const researchId = parseInt(rawId, 10);

    if (!rawId || isNaN(researchId) || researchId < 1 || String(researchId) !== rawId) {
      return NextResponse.json(
        {
          error: "Invalid parameter: id must be a positive integer",
          code: "INVALID_PARAM",
          details: { parameter: "id", value: rawId },
        },
        { status: 400 }
      );
    }

    // ── Load dataset ───────────────────────────────────────────────
    const dataset = await loadResearchData();

    // ── Look up project detail ─────────────────────────────────────
    const detail = computeProjectDetail(dataset, researchId);

    if (!detail) {
      return NextResponse.json(
        {
          error: `Project not found: ${researchId}`,
          code: "NOT_FOUND",
          details: { researchId },
        },
        { status: 404 }
      );
    }

    return NextResponse.json(detail, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
        "X-API-Version": "1.0",
        "X-Generated-At": detail.generatedAt,
        "X-Data-Source": "centerDW.View_Research",
        "X-Research-Id": String(researchId),
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
    console.error("GET /api/research/projects/[id] failed:", error);
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
