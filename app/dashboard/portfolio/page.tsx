"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import DashboardKpiCards from "@/components/research/DashboardKpiCards";
import DashboardFilterBar from "@/components/research/DashboardFilterBar";
import type { FilterState } from "@/components/research/DashboardFilterBar";
import BudgetBreakdownBars from "@/components/research/BudgetBreakdownBars";
import RecentProjectsTable from "@/components/research/RecentProjectsTable";
import MiniKpiCards from "@/components/research/MiniKpiCards";
import PageSkeleton from "@/components/research/PageSkeleton";
import ErrorState from "@/components/research/ErrorState";
import EmptyState from "@/components/research/EmptyState";

// ─── Local types matching PortfolioStats API response ──────────────

interface PortfolioBreakdownItem {
  label: string;
  count: number;
  budget: number;
  percentage: number;
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

interface PortfolioStats {
  summary: {
    totalProjects: number;
    totalBudget: number;
    activeProjects: number;
    completedProjects: number;
    successRate: number;
    researchTypeCount: number;
    departmentCount: number;
  };
  byResearchType: PortfolioBreakdownItem[];
  byDepartment: PortfolioBreakdownItem[];
  recentProjects: ProjectTableItem[];
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

// ─── Helpers ────────────────────────────────────────────────────────

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
  if (filters.researchTypes.length > 0) {
    params.set("researchTypeNames", filters.researchTypes.join(","));
  }
  if (filters.fundingTypes.length > 0) {
    params.set("fundingTypeNames", filters.fundingTypes.join(","));
  }
  if (filters.disciplines.length > 0) {
    params.set("disciplineGroupNames", filters.disciplines.join(","));
  }
  if (filters.moneySources.length > 0) {
    params.set("moneyNames", filters.moneySources.join(","));
  }
  if (filters.q) {
    params.set("q", filters.q);
  }
  return params.toString();
}

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`HTTP ${res.status}: ${body.slice(0, 120)}`);
  }
  return res.json();
}

// ─── Empty filter state ─────────────────────────────────────────────

const EMPTY_FILTERS: FilterState = {
  budgetYears: [],
  fundingTypes: [],
  moneySources: [],
  levels: [],
  disciplines: [],
  researchTypes: [],
  q: "",
};

// ─── Portfolio page ─────────────────────────────────────────────────

export default function PortfolioPage() {
  const [filters, setFilters] = useState<FilterState>(EMPTY_FILTERS);
  const [portfolio, setPortfolio] = useState<PortfolioStats | null>(null);
  const [filterOptions, setFilterOptions] = useState<FiltersResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async (currentFilters: FilterState) => {
    setLoading(true);
    setError(null);

    const qs = buildQueryString(currentFilters);
    const base = "/api/research";

    try {
      const [pf, fl] = await Promise.all([
        fetchJson<PortfolioStats>(
          `${base}/stats/portfolio${qs ? "?" + qs : ""}`
        ),
        filterOptions
          ? Promise.resolve(filterOptions)
          : fetchJson<FiltersResponse>(`${base}/filters`),
      ]);

      setPortfolio(pf);
      if (!filterOptions) setFilterOptions(fl as FiltersResponse);
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "เกิดข้อผิดพลาดในการโหลดข้อมูล";
      setError(msg);
      console.error("Portfolio fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [filterOptions]);

  useEffect(() => {
    // Initial data fetch — standard client-component pattern for this project
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchAll(filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  function handleFilterChange(newFilters: FilterState) {
    setFilters(newFilters);
  }

  // ── Full-page loading skeleton ───────────────────────────────────
  if (loading && !portfolio) {
    return <PageSkeleton kpiCount={4} chartRows={2} showHeader />;
  }

  // ── Full-page error state ────────────────────────────────────────
  if (error && !portfolio) {
    return (
      <ErrorState
        message={error}
        onRetry={() => fetchAll(filters)}
      />
    );
  }

  // ── Build KPI cards ──────────────────────────────────────────────
  const kpiCards = portfolio
    ? [
        {
          label: "โครงการทั้งหมด",
          value: portfolio.summary.totalProjects.toLocaleString("th-TH"),
          sublabel: `${portfolio.summary.completedProjects} โครงการสำเร็จ`,
          icon: "📋",
        },
        {
          label: "งบประมาณรวม",
          value: formatCurrency(portfolio.summary.totalBudget),
          sublabel: `${portfolio.summary.researchTypeCount} ประเภทวิจัย`,
          icon: "💰",
        },
        {
          label: "อัตราสำเร็จ",
          value: `${portfolio.summary.successRate}%`,
          sublabel: `${portfolio.summary.completedProjects} / ${portfolio.summary.totalProjects} โครงการ`,
          icon: "✅",
        },
        {
          label: "หน่วยงาน",
          value: portfolio.summary.departmentCount.toLocaleString("th-TH"),
          sublabel: `${portfolio.summary.activeProjects} โครงการดำเนินการ`,
          icon: "🏛️",
        },
      ]
    : [];

  // ── Build secondary mini-KPI items ──────────────────────────────
  const miniKpis = portfolio
    ? [
        {
          icon: "📂",
          label: "ประเภทงานวิจัย",
          value: String(portfolio.summary.researchTypeCount),
        },
        {
          icon: "🔄",
          label: "กำลังดำเนินการ",
          value: portfolio.summary.activeProjects.toLocaleString("th-TH"),
          valueClassName: "text-amber-600",
        },
        {
          icon: "🎯",
          label: "สำเร็จแล้ว",
          value: portfolio.summary.completedProjects.toLocaleString("th-TH"),
          valueClassName: "text-green-600",
        },
        {
          icon: "🏢",
          label: "หน่วยงานทั้งหมด",
          value: String(portfolio.summary.departmentCount),
        },
      ]
    : [];

  // ── Convert byResearchType / byDepartment to BudgetBarEntry ─────
  const researchTypeBarData = (portfolio?.byResearchType ?? []).map((d) => ({
    label: d.label,
    budget: d.budget,
    count: d.count,
  }));

  const departmentBarData = (portfolio?.byDepartment ?? [])
    .slice(0, 15)
    .map((d) => ({
      label: d.label,
      budget: d.budget,
      count: d.count,
    }));

  // ── Empty state: no projects in filtered view ────────────────────
  const isEmpty = !loading && portfolio && portfolio.summary.totalProjects === 0;

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {/* ── Header ───────────────────────────────────────────────── */}
      <header className="mb-6">
        <nav className="mb-2 flex items-center gap-2 text-xs text-gray-400">
          <Link
            href="/dashboard"
            className="hover:text-maejo-green focus:outline-none focus:underline"
          >
            ภาพรวม
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-gray-600">Research Portfolio</span>
        </nav>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-maejo-green sm:text-2xl">
              Research Portfolio
            </h1>
            <p className="mt-0.5 text-sm text-gray-500">
              ภาพรวมผลงานวิจัย แหล่งทุน ประเภทงานวิจัย และโครงการล่าสุดของสำนักวิจัยฯ
            </p>
          </div>
          {portfolio?.generatedAt && (
            <div className="text-right text-xs text-gray-400">
              อัปเดตล่าสุด:
              <br />
              {new Date(portfolio.generatedAt).toLocaleString("th-TH", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </div>
          )}
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

      {/* ── Empty state ──────────────────────────────────────────── */}
      {isEmpty ? (
        <EmptyState
          icon="📭"
          title="ไม่พบข้อมูลโครงการ"
          description="ลองปรับเงื่อนไขการกรองข้อมูล หรือล้าง filter เพื่อดูข้อมูลทั้งหมด"
          action={{
            label: "ล้าง filter",
            onClick: () => handleFilterChange(EMPTY_FILTERS),
          }}
        />
      ) : (
        <>
          {/* ── KPI cards ──────────────────────────────────────── */}
          <section className="mb-6" aria-label="ตัวชี้วัดหลัก">
            <DashboardKpiCards
              data={kpiCards}
              loading={loading && !portfolio}
              error={null}
            />
          </section>

          {/* ── Secondary mini-KPIs ────────────────────────────── */}
          {miniKpis.length > 0 && (
            <MiniKpiCards items={miniKpis} columns={4} className="mb-6" />
          )}

          {/* ── Error banner (inline, after partial data loaded) ─ */}
          {error && (
            <div
              role="alert"
              className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700"
            >
              ข้อมูลอาจไม่ครบถ้วน: {error}
              <button
                type="button"
                onClick={() => fetchAll(filters)}
                className="ml-3 underline hover:no-underline focus:outline-none"
              >
                ลองอีกครั้ง
              </button>
            </div>
          )}

          {/* ── Breakdowns row ──────────────────────────────────── */}
          <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <BudgetBreakdownBars
              title="ประเภทงานวิจัย"
              subtitle="จำแนกโครงการและงบประมาณตามประเภทงานวิจัย"
              data={researchTypeBarData}
              loading={loading && !portfolio}
              error={null}
            />
            <BudgetBreakdownBars
              title="หน่วยงาน / สังกัด"
              subtitle="จำแนกโครงการและงบประมาณตามหน่วยงาน (แสดง 15 อันดับแรก)"
              data={departmentBarData}
              loading={loading && !portfolio}
              error={null}
            />
          </div>

          {/* ── Recent projects table ────────────────────────────── */}
          <section className="mb-6" aria-label="โครงการล่าสุด">
            <RecentProjectsTable
              items={portfolio?.recentProjects ?? []}
              loading={loading && !portfolio}
              error={null}
            />
            <div className="mt-3 flex flex-wrap items-center justify-between gap-4">
              <p className="text-xs text-gray-400">
                แสดง {portfolio?.recentProjects.length ?? 0} โครงการล่าสุด
                จากทั้งหมด {portfolio?.summary.totalProjects.toLocaleString("th-TH") ?? "—"} โครงการ
              </p>
              <Link
                href="/research/projects"
                className="inline-flex items-center gap-1 text-sm font-medium text-maejo-green hover:text-maejo-green-light focus:outline-none focus:underline"
              >
                ดูโครงการทั้งหมด →
              </Link>
            </div>
          </section>

          {/* ── Quick links ─────────────────────────────────────── */}
          <nav
            className="mb-6 flex flex-wrap gap-3"
            aria-label="ลิงก์ที่เกี่ยวข้อง"
          >
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-600 shadow-sm transition-colors hover:border-maejo-green hover:text-maejo-green focus:outline-none focus:ring-2 focus:ring-maejo-green/30"
            >
              ← ภาพรวมหลัก
            </Link>
            <Link
              href="/research/budget"
              className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-600 shadow-sm transition-colors hover:border-maejo-green hover:text-maejo-green focus:outline-none focus:ring-2 focus:ring-maejo-green/30"
            >
              วิเคราะห์งบประมาณ →
            </Link>
            <Link
              href="/research/projects"
              className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-600 shadow-sm transition-colors hover:border-maejo-green hover:text-maejo-green focus:outline-none focus:ring-2 focus:ring-maejo-green/30"
            >
              โครงการทั้งหมด →
            </Link>
          </nav>
        </>
      )}

      {/* ── Footer ───────────────────────────────────────────────── */}
      <footer className="border-t border-gray-100 pt-4 text-center text-xs text-gray-400">
        RAE Research Portal &copy; {new Date().getFullYear()} &mdash;
        มหาวิทยาลัยแม่โจ้
      </footer>
    </main>
  );
}
