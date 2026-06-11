/**
 * GET /api/research/researchers/[personCode]
 *
 * Returns researcher profile, stats, and project history.
 *
 * Path parameter:
 *   personCode  - real or masked researcher code
 *                 (masked at server side before lookup; never echoed raw)
 *
 * Privacy guarantee:
 *   - Input personCode is masked via maskPersonCode() before any lookup
 *   - Only the masked form ever appears in response bodies or headers
 *   - Raw input is discarded after masking
 *
 * Response shape: { researcher, stats, projects, byYear, generatedAt }
 *
 * Error codes:
 *   400 INVALID_PARAM  — empty personCode after trim
 *   404 NOT_FOUND      — no researcher with this masked code
 *   503 CSV_NOT_FOUND  — dataset missing
 *   500 CSV_PARSE_ERROR / INTERNAL_ERROR
 */

import { NextRequest, NextResponse } from "next/server";
import { loadResearchData, CsvNotFoundError, CsvParseError } from "@/lib/csv/loader";
import { maskPersonCode } from "@/lib/csv/normalizer";
import { computeResearcherDetail } from "@/lib/data/aggregates";
import type { ResearcherDetailResponse, ApiError } from "@/lib/data/models";

export const dynamic = "force-dynamic";
export const revalidate = 300; // 5 minutes

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ personCode: string }> }
): Promise<NextResponse<ResearcherDetailResponse | ApiError>> {
  try {
    // ── Decode and validate path parameter ────────────────────────
    const { personCode: rawPersonCode } = await params;
    const rawParam = decodeURIComponent(rawPersonCode ?? "").trim();

    if (!rawParam) {
      return NextResponse.json(
        {
          error: "Invalid parameter: personCode must not be empty",
          code: "INVALID_PARAM",
          details: { parameter: "personCode", value: "" },
        },
        { status: 400 }
      );
    }

    // ── Mask input — raw code is never stored or echoed ────────────
    // maskPersonCode is idempotent: masking an already-masked code is safe.
    const maskedCode = maskPersonCode(rawParam) ?? rawParam;

    // ── Load dataset ───────────────────────────────────────────────
    const dataset = await loadResearchData();

    // ── Look up researcher detail ──────────────────────────────────
    const detail = computeResearcherDetail(dataset, maskedCode);

    if (!detail) {
      return NextResponse.json(
        {
          error: "Researcher not found",
          code: "NOT_FOUND",
          // Only the masked form in the error body — never the raw input
          details: { personCode: maskedCode },
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
        // Only masked code in headers — never raw
        "X-Person-Code": maskedCode,
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
    console.error("GET /api/research/researchers/[personCode] failed:", error);
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
