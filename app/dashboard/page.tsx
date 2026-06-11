"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import DashboardKpiCards from "@/components/research/DashboardKpiCards";
import BudgetByYearChart from "@/components/research/BudgetByYearChart";
import FundingTypeBreakdown from "@/components/research/FundingTypeBreakdown";
import RecentProjectsTable from "@/components/research/RecentProjectsTable";
import DashboardFilterBar from "@/components/research/DashboardFilterBar";
import type { FilterState } from "@/components/research/DashboardFilterBar";

// ─── Local types for the dashboard data shape ──────────────────────

interface OverviewStats {
  kpis: {
    totalProjects: number;
    totalBudget: number;
    successCount: number;
    successRate: number;
    externalFundingCount: number;
    internalFundingCount: number;
    budgetYears: number[];
  };
  byType: Array<{ label: string; count: number; budget: number }>;
  byDiscipline: Array<{ label: string; count: number; budget: number }>;
  byFundingType: Array<{ label: string; count: number; budget: number }>;
  generatedAt: string;
}

interface BudgetStats {
  byYear: Array<{ year: number; totalBudget: number; projectCount: number }>;
  byType: Array<{ label: string; budget: number; percentage: number }>;
  bySource: Array<{ label: string; budget: number; count: number }>;
  byLevel: Array<{ label: string; budget: number; count: number }>;
  summary: {
    zeroBudgetProjects: number;
    highestBudgetYear: number;
    highestBudgetAmount: number;
    averageBudgetPerYear: number;
  };
  generatedAt: string;
}

interface FilterOption {
  label: string;
  value: string;
  count: number;
}

interface FiltersResponse {
  budgetYears: FilterOption[];
  fundingTypes: FilterOption[];
  moneySources: FilterOption[];
  levels: FilterOption[];
  disciplines: FilterOption[];
  researchTypes: FilterOption[];
  generatedAt: string;
}

interface ProjectTableItem {
  researchId: number;
  nameTh: string | null;
  typeName: string | null;
  isSuccess: boolean;
  totalBudget: number;
  budgetYear: number | null;
  fundingType: string | null;
  researcherNames: string[];
}

interface ProjectsResponse {
  items: ProjectTableItem[];
  pagination: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
  generatedAt: string;
}

// ─── Helper ────────────────────────────────────────────────────────

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    maximumFractionDigits: 0,
  }).format(amount);
}

function buildQueryString(filters: FilterState): string {
  const params = new URLSearchParams();
  if (filters.budgetYears.length > 0) {
    params.set("budgetYears", filters.budgetYears.join(","));
  }
  if (filters.fundingTypes.length > 0) {
    params.set("fundingTypes", filters.fundingTypes.join(","));
  }
  if (filters.moneySources.length > 0) {
    params.set("moneySources", filters.moneySources.join(","));
  }
  if (filters.levels.length > 0) {
    params.set("levels", filters.levels.join(","));
  }
  if (filters.disciplines.length > 0) {
    params.set("disciplines", filters.disciplines.join(","));
  }
  if (filters.researchTypes.length > 0) {
    params.set("researchTypes", filters.researchTypes.join(","));
  }
  if (filters.q) {
    params.set("q", filters.q);
  }
  return params.toString();
}

// ─── API fetch helper ──────────────────────────────────────────────

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`HTTP ${res.status}: ${body.slice(0, 120)}`);
  }
  return res.json();
}

// ─── KPI card builder ──────────────────────────────────────────────

function buildKpiCards(stats: OverviewStats) {
  return [
    {
      label: "โครงการทั้งหมด",
      value: stats.kpis.totalProjects.toLocaleString("th-TH"),
      sublabel: `${stats.kpis.successCount} โครงการสำเร็จ`,
      icon: "📊",
    },
    {
      label: "งบประมาณรวม",
      value: formatCurrency(stats.kpis.totalBudget),
      sublabel: `${stats.kpis.budgetYears.length} ปีงบประมาณ`,
      icon: "💰",
    },
    {
      label: "อัตราสำเร็จ",
      value: `${stats.kpis.successRate}%`,
      sublabel: `${stats.kpis.externalFundingCount} ทุนภายนอก`,
      icon: "✅",
    },
    {
      label: "ประเภททุน",
      value: `${stats.byFundingType.length} ประเภท`,
      sublabel: `${stats.kpis.internalFundingCount} ทุนภายใน`,
      icon: "🏛️",
    },
  ];
}

// ─── Empty / no-data constants ─────────────────────────────────────

const EMPTY_FILTERS: FilterState = {
  budgetYears: [],
  fundingTypes: [],
  moneySources: [],
  levels: [],
  disciplines: [],
  researchTypes: [],
  q: "",
};

// ─── Dashboard page ────────────────────────────────────────────────

export default function DashboardPage() {
  const [filters, setFilters] = useState<FilterState>(EMPTY_FILTERS);

  const [overview, setOverview] = useState<OverviewStats | null>(null);
  const [budgetStats, setBudgetStats] = useState<BudgetStats | null>(null);
  const [filterOptions, setFilterOptions] = useState<FiltersResponse | null>(null);
  const [projects, setProjects] = useState<ProjectsResponse | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async (currentFilters: FilterState) => {
    setLoading(true);
    setError(null);

    const qs = buildQueryString(currentFilters);
    const base = "/api/research";

    try {
      const [ov, bg, fl, pr] = await Promise.all([
        fetchJson<OverviewStats>(`${base}/stats/overview${qs ? "?" + qs : ""}`),
        fetchJson<BudgetStats>(`${base}/stats/budget${qs ? "?" + qs : ""}`),
        fetchJson<FiltersResponse>(`${base}/filters`),
        fetchJson<ProjectsResponse>(
          `${base}/projects?page=1&pageSize=10${qs ? "&" + qs : ""}`
        ),
      ]);

      setOverview(ov);
      setBudgetStats(bg);
      setFilterOptions(fl);
      setProjects(pr);
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "เกิดข้อผิดพลาดในการโหลดข้อมูล";
      setError(msg);
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Initial data fetch on mount — standard pattern for client components
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchAll(filters);
  }, [fetchAll, filters]);

  function handleFilterChange(newFilters: FilterState) {
    setFilters(newFilters);
  }

  // ── Build KPI cards from overview data ──────────────────────────
  const kpiData = overview ? buildKpiCards(overview) : [];

  // ── Error state ─────────────────────────────────────────────────
  if (error && !loading) {
    return (
      <main className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-4 text-center">
        <div className="mb-4 text-4xl">⚠️</div>
        <h1 className="mb-2 text-xl font-semibold text-gray-800">
          เกิดข้อผิดพลาด
        </h1>
        <p className="mb-6 max-w-md text-sm text-gray-500">{error}</p>
        <button
          type="button"
          onClick={() => fetchAll(filters)}
          className="rounded-lg bg-maejo-green px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-maejo-green-light"
        >
          ลองอีกครั้ง
        </button>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {/* ── Header ───────────────────────────────────────────────── */}
      <header className="mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-maejo-green sm:text-2xl">
              ภาพรวมงานวิจัย
            </h1>
            <p className="mt-0.5 text-sm text-gray-500">
              ระบบบริหารงานวิจัย มหาวิทยาลัยแม่โจ้
            </p>
          </div>
          {/* Updated timestamp */}
          <div className="text-right text-xs text-gray-400">
            {overview?.generatedAt ? (
              <>
                อัปเดตล่าสุด:
                <br />
                {new Date(overview.generatedAt).toLocaleString("th-TH", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </>
            ) : loading ? (
              <span className="text-gray-300">กำลังโหลด...</span>
            ) : null}
          </div>
        </div>
      </header>

      {/* ── Filter bar ───────────────────────────────────────────── */}
      <div className="mb-6">
        <DashboardFilterBar
          filterOptions={
            filterOptions
              ? {
                  budgetYears: filterOptions.budgetYears,
                  fundingTypes: filterOptions.fundingTypes,
                  moneySources: filterOptions.moneySources,
                  levels: filterOptions.levels,
                  disciplines: filterOptions.disciplines,
                  researchTypes: filterOptions.researchTypes,
                }
              : null
          }
          loading={loading && !filterOptions}
          onFilterChange={handleFilterChange}
        />
      </div>

      {/* ── KPI cards ────────────────────────────────────────────── */}
      <section className="mb-6">
        <DashboardKpiCards
          data={kpiData}
          loading={loading && !overview}
          error={null}
        />
      </section>

      {/* ── Charts row ───────────────────────────────────────────── */}
      <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <BudgetByYearChart
          data={budgetStats?.byYear ?? []}
          loading={loading && !budgetStats}
          error={null}
        />
        <FundingTypeBreakdown
          data={budgetStats?.byType ?? []}
          loading={loading && !budgetStats}
          error={null}
        />
      </div>

      {/* ── Budget summary row ───────────────────────────────────── */}
      {budgetStats && (
        <section className="mb-2 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-xl border border-gray-100 bg-white p-4 text-center shadow-sm">
            <p className="text-xs text-gray-500">โครงการไร้งบ</p>
            <p className="mt-1 text-lg font-bold text-gray-700">
              {budgetStats.summary.zeroBudgetProjects}
            </p>
          </div>
          <div className="rounded-xl border border-gray-100 bg-white p-4 text-center shadow-sm">
            <p className="text-xs text-gray-500">ปีงบสูงสุด</p>
            <p className="mt-1 text-lg font-bold text-gray-700">
              {budgetStats.summary.highestBudgetYear}
            </p>
          </div>
          <div className="rounded-xl border border-gray-100 bg-white p-4 text-center shadow-sm">
            <p className="text-xs text-gray-500">งบปีสูงสุด</p>
            <p className="mt-1 text-lg font-bold text-gray-700">
              {formatCurrency(budgetStats.summary.highestBudgetAmount)}
            </p>
          </div>
          <div className="rounded-xl border border-gray-100 bg-white p-4 text-center shadow-sm">
            <p className="text-xs text-gray-500">งบเฉลี่ยต่อปี</p>
            <p className="mt-1 text-lg font-bold text-gray-700">
              {formatCurrency(budgetStats.summary.averageBudgetPerYear)}
            </p>
          </div>
        </section>
      )}

      {/* ── Budget deep-dive link ─────────────────────────────────── */}
      <div className="mb-6 text-right">
        <Link
          href="/research/budget"
          className="inline-flex items-center gap-1 text-sm font-medium text-maejo-green hover:text-maejo-green-light focus:outline-none focus:underline"
        >
          วิเคราะห์งบประมาณเพิ่มเติม →
        </Link>
      </div>

      {/* ── Recent projects table ────────────────────────────────── */}
      <section className="mb-6">
        <RecentProjectsTable
          items={projects?.items ?? []}
          loading={loading && !projects}
          error={null}
        />
        <div className="mt-3 text-right">
          <Link
            href="/research/projects"
            className="inline-flex items-center gap-1 text-sm font-medium text-maejo-green hover:text-maejo-green-light focus:outline-none focus:underline"
          >
            ดูโครงการทั้งหมด →
          </Link>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────── */}
      <footer className="border-t border-gray-100 pt-4 text-center text-xs text-gray-400">
        RAE Research Portal &copy; {new Date().getFullYear()} &mdash;
        มหาวิทยาลัยแม่โจ้
      </footer>
    </main>
  );
}
