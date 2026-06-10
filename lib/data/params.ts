/**
 * URL search parameter parser for filter values.
 * Converts query string parameters to an ActiveFilters object.
 */

import type { ActiveFilters } from "@/lib/data/models";

export function parseFilterParams(searchParams: URLSearchParams): ActiveFilters {
  return {
    budgetYears: parseNumberList(searchParams.get("budgetYears")),
    researchTypeNames: parseStringList(searchParams.get("researchTypeNames")),
    fundingTypeNames: parseStringList(searchParams.get("fundingTypeNames")),
    departmentNames: parseStringList(searchParams.get("departmentNames")),
    disciplineGroupNames: parseStringList(searchParams.get("disciplineGroupNames")),
    successStatus: parseSuccessStatus(searchParams.get("successStatus")),
    personTypeNames: parseStringList(searchParams.get("personTypeNames")),
    moneyNames: parseStringList(searchParams.get("moneyNames")),
    dateFrom: searchParams.get("dateFrom") || null,
    dateTo: searchParams.get("dateTo") || null,
  };
}

function parseNumberList(value: string | null): number[] {
  if (!value) return [];
  return value
    .split(",")
    .map((s) => parseInt(s.trim(), 10))
    .filter((n) => !isNaN(n));
}

function parseStringList(value: string | null): string[] {
  if (!value) return [];
  return value
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

function parseSuccessStatus(value: string | null): ActiveFilters["successStatus"] {
  if (value === "success") return "success";
  if (value === "not_success") return "not_success";
  return "all";
}
