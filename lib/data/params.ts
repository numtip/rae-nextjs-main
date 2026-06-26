import type { ActiveFilters } from "@/lib/data/models";
import { DEFAULT_FILTERS } from "@/lib/data/filters";

export function parseFilterParams(searchParams: URLSearchParams): ActiveFilters {
  const parseCommaSeparated = (param: string | null): string[] =>
    param ? param.split(",").map((s) => s.trim()).filter(Boolean) : [];

  const parseCommaSeparatedNumbers = (param: string | null): number[] =>
    param
      ? param
          .split(",")
          .map((s) => parseInt(s.trim(), 10))
          .filter((n) => !isNaN(n))
      : [];

  const successStatus = ((): ActiveFilters["successStatus"] => {
    const raw = searchParams.get("successStatus");
    if (raw === "success" || raw === "not_success") return raw;
    return "all";
  })();

  return {
    budgetYears: parseCommaSeparatedNumbers(searchParams.get("budgetYears")),
    researchTypeNames: parseCommaSeparated(searchParams.get("researchTypeNames")),
    fundingTypeNames: parseCommaSeparated(searchParams.get("fundingTypeNames")),
    departmentNames: parseCommaSeparated(searchParams.get("departmentNames")),
    disciplineGroupNames: parseCommaSeparated(searchParams.get("disciplineGroupNames")),
    successStatus,
    personTypeNames: parseCommaSeparated(searchParams.get("personTypeNames")),
    moneyNames: parseCommaSeparated(searchParams.get("moneyNames")),
    dateFrom: searchParams.get("dateFrom") || null,
    dateTo: searchParams.get("dateTo") || null,
  };
}
