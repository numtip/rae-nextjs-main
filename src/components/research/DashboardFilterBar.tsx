"use client";

import { useState } from "react";

export interface FilterState {
  budgetYears: string[];
  fundingTypes: string[];
  moneySources: string[];
  levels: string[];
  disciplines: string[];
  researchTypes: string[];
  q: string;
}

interface FilterOption {
  label: string;
  value: string;
  count: number;
}

interface DashboardFilterBarProps {
  filterOptions: {
    budgetYears: FilterOption[];
    fundingTypes: FilterOption[];
    moneySources: FilterOption[];
    levels: FilterOption[];
    disciplines: FilterOption[];
    researchTypes: FilterOption[];
  } | null;
  loading?: boolean;
  onFilterChange: (filters: FilterState) => void;
}

export default function DashboardFilterBar({
  filterOptions,
  loading = false,
  onFilterChange,
}: DashboardFilterBarProps) {
  const [expanded, setExpanded] = useState(false);
  const [selectedYears, setSelectedYears] = useState<string[]>([]);
  const [searchText, setSearchText] = useState("");

  function applyFilters() {
    onFilterChange({
      budgetYears: selectedYears,
      fundingTypes: [],
      moneySources: [],
      levels: [],
      disciplines: [],
      researchTypes: [],
      q: searchText.trim(),
    });
  }

  function resetFilters() {
    setSelectedYears([]);
    setSearchText("");
    onFilterChange({
      budgetYears: [],
      fundingTypes: [],
      moneySources: [],
      levels: [],
      disciplines: [],
      researchTypes: [],
      q: "",
    });
  }

  function toggleYear(year: string) {
    setSelectedYears((prev) =>
      prev.includes(year)
        ? prev.filter((y) => y !== year)
        : [...prev, year]
    );
  }

  if (loading) {
    return (
      <div className="animate-pulse rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="h-4 w-32 rounded bg-gray-200" />
      </div>
    );
  }

  const hasActiveFilters = selectedYears.length > 0 || searchText.trim().length > 0;

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {/* Search input */}
          <div className="relative">
            <input
              type="search"
              placeholder="ค้นหาโครงการ..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") applyFilters();
              }}
              className="w-48 rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-700 placeholder-gray-400 focus:border-maejo-green focus:outline-none focus:ring-1 focus:ring-maejo-green/30"
              aria-label="ค้นหาโครงการ"
            />
          </div>

          {/* Year filter toggle */}
          {filterOptions && filterOptions.budgetYears.length > 0 && (
            <button
              type="button"
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-600 transition-colors hover:border-gray-300 hover:text-gray-800"
              aria-expanded={expanded}
              aria-label="กรองตามปีงบประมาณ"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
              ปีงบประมาณ
              {selectedYears.length > 0 && (
                <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-maejo-green text-xs font-bold text-white">
                  {selectedYears.length}
                </span>
              )}
            </button>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="rounded-lg px-3 py-1.5 text-sm text-gray-500 transition-colors hover:text-red-600"
            >
              ล้าง filter
            </button>
          )}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={applyFilters}
              className="rounded-lg bg-maejo-green px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-maejo-green-light"
            >
              ค้นหา
            </button>
          )}
        </div>
      </div>

      {/* Expanded year filter chips */}
      {expanded && filterOptions && (
        <div className="mt-3 border-t border-gray-100 pt-3">
          <p className="mb-2 text-xs font-medium text-gray-500">
            เลือกปีงบประมาณ:
          </p>
          <div className="flex flex-wrap gap-2" role="group" aria-label="ปีงบประมาณ">
            {filterOptions.budgetYears.map((opt) => {
              const isActive = selectedYears.includes(opt.value);
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => toggleYear(opt.value)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                    isActive
                      ? "bg-maejo-green text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                  aria-pressed={isActive}
                >
                  {opt.label} ({opt.count})
                </button>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
