"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import BudgetByYearChart from "@/components/research/BudgetByYearChart";
import FundingTypeBreakdown from "@/components/research/FundingTypeBreakdown";
import BudgetBreakdownBars from "@/components/research/BudgetBreakdownBars";
import MiniKpiCards from "@/components/research/MiniKpiCards";

// ─── Local types matching BudgetStats API response ─────────────────

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

// ─── Helpers ────────────────────────────────────────────────────────

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    maximumFractionDigits: 0,
  }).format(amount);
}

// ─── Skeleton ───────────────────────────────────────────────────────

function PageSkeleton() {
  return (
    <div className="mx-auto max-w-7xl animate-pulse px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-4 h-4 w-48 rounded bg-gray-200" />
      <div className="mb-6 h-8 w-64 rounded bg-gray-200" />
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-20 rounded-xl bg-gray-100" />
        ))}
      </div>
      <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="h-56 rounded-xl bg-gray-100" />
        <div className="h-56 rounded-xl bg-gray-100" />
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="h-48 rounded-xl bg-gray-100" />
        <div className="h-48 rounded-xl bg-gray-100" />
      </div>
    </div>
  );
}

// ─── Inner page (needs Suspense for useSearchParams) ───────────────

function BudgetPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const budgetYear = searchParams.get("budgetYear") ?? "";

  const [data, setData] = useState<BudgetStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Available years derived from loaded data (populated from first unfiltered load)
  const [availableYears, setAvailableYears] = useState<number[]>([]);

  const fetchData = useCallback(
    async (year: string) => {
      setLoading(true);
      setError(null);
      const params = new URLSearchParams();
      if (year) params.set("budgetYears", year);
      try {
        const res = await fetch(
          `/api/research/stats/budget${params.toString() ? "?" + params.toString() : ""}`
        );
        if (!res.ok) {
          const body = await res
            .json()
            .catch(() => ({ error: `HTTP ${res.status}` }));
          throw new Error(
            (body as { error?: string }).error ?? `HTTP ${res.status}`
          );
        }
        const json = (await res.json()) as BudgetStats;
        setData(json);
        // Populate available years from unfiltered byYear list (only when no filter)
        if (!year) {
          setAvailableYears(json.byYear.map((y) => y.year));
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "เกิดข้อผิดพลาด");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    // Initial data fetch on mount — standard pattern for client components
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData(budgetYear);
  }, [fetchData, budgetYear]);

  function handleYearChange(year: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (year) {
      params.set("budgetYear", year);
    } else {
      params.delete("budgetYear");
    }
    router.push(`/research/budget${params.toString() ? "?" + params.toString() : ""}`);
  }

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
          onClick={() => fetchData(budgetYear)}
          className="rounded-lg bg-maejo-green px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-maejo-green-light focus:outline-none focus:ring-2 focus:ring-maejo-green/50"
        >
          ลองอีกครั้ง
        </button>
      </main>
    );
  }

  const totalBudget = data?.byType.reduce((s, t) => s + t.budget, 0) ?? 0;

  const miniKpiItems = data
    ? [
        {
          icon: "💰",
          label: "งบประมาณรวม",
          value: formatCurrency(totalBudget),
          valueClassName: "text-maejo-green",
        },
        {
          icon: "📅",
          label: "ปีงบสูงสุด",
          value: String(data.summary.highestBudgetYear),
        },
        {
          icon: "🏆",
          label: "งบปีสูงสุด",
          value: formatCurrency(data.summary.highestBudgetAmount),
        },
        {
          icon: "📊",
          label: "งบเฉลี่ย/ปี",
          value: formatCurrency(data.summary.averageBudgetPerYear),
        },
        {
          icon: "📭",
          label: "โครงการไร้งบ",
          value: String(data.summary.zeroBudgetProjects),
        },
      ]
    : [];

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {/* ── Breadcrumb ─────────────────────────────────────────────── */}
      <nav className="mb-4 text-sm text-gray-400" aria-label="เส้นทางนำทาง">
        <Link
          href="/dashboard"
          className="hover:text-maejo-green focus:outline-none focus:underline"
        >
          Dashboard
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800">วิเคราะห์งบประมาณ</span>
      </nav>

      {/* ── Header + year filter ────────────────────────────────────── */}
      <header className="mb-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-maejo-green sm:text-2xl">
              วิเคราะห์งบประมาณวิจัย
            </h1>
            <p className="mt-0.5 text-sm text-gray-500">
              ภาพรวมและการกระจายตัวของงบประมาณโครงการวิจัย
            </p>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={budgetYear}
              onChange={(e) => handleYearChange(e.target.value)}
              className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-700 focus:border-maejo-green focus:outline-none focus:ring-1 focus:ring-maejo-green/30"
              aria-label="กรองตามปีงบประมาณ"
            >
              <option value="">ทุกปีงบประมาณ</option>
              {availableYears.map((y) => (
                <option key={y} value={String(y)}>
                  ปี {y}
                </option>
              ))}
            </select>
            {budgetYear && (
              <button
                type="button"
                onClick={() => handleYearChange("")}
                className="rounded-lg px-3 py-1.5 text-sm text-gray-500 transition-colors hover:text-red-600 focus:outline-none focus:underline"
              >
                ล้าง
              </button>
            )}
          </div>
        </div>

        {/* Active filter badge */}
        {budgetYear && (
          <div className="mt-2 text-xs text-maejo-green">
            กำลังแสดงข้อมูลปีงบประมาณ{" "}
            <span className="font-bold">{budgetYear}</span>
          </div>
        )}

        {/* Generated-at timestamp */}
        {data?.generatedAt && (
          <p className="mt-1 text-xs text-gray-400">
            อัปเดตล่าสุด:{" "}
            {new Date(data.generatedAt).toLocaleString("th-TH", {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </p>
        )}
      </header>

      {loading ? (
        <PageSkeleton />
      ) : (
        <>
          {/* ── KPI summary cards ──────────────────────────────────── */}
          <MiniKpiCards items={miniKpiItems} columns={5} />

          {/* ── byYear + byType row ─────────────────────────────────── */}
          <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <BudgetByYearChart data={data?.byYear ?? []} />
            <FundingTypeBreakdown data={data?.byType ?? []} />
          </div>

          {/* ── bySource + byLevel row ──────────────────────────────── */}
          <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <BudgetBreakdownBars
              title="แหล่งทุนวิจัย"
              subtitle="งบประมาณแยกตามแหล่งทุน"
              data={data?.bySource ?? []}
            />
            <BudgetBreakdownBars
              title="ระดับการวิจัย"
              subtitle="งบประมาณแยกตามระดับ"
              data={data?.byLevel ?? []}
            />
          </div>

          {/* ── Empty state when all arrays empty ──────────────────── */}
          {data &&
            data.byYear.length === 0 &&
            data.byType.length === 0 && (
              <div
                role="status"
                className="rounded-xl border border-gray-200 bg-white p-12 text-center shadow-sm"
              >
                <div className="mb-3 text-3xl">🔍</div>
                <p className="mb-1 text-sm font-medium text-gray-700">
                  ไม่พบข้อมูลงบประมาณ
                </p>
                {budgetYear && (
                  <p className="mb-4 text-xs text-gray-400">
                    ไม่มีข้อมูลสำหรับปีงบประมาณ {budgetYear}
                  </p>
                )}
                {budgetYear && (
                  <button
                    type="button"
                    onClick={() => handleYearChange("")}
                    className="rounded-lg bg-maejo-green px-4 py-1.5 text-sm font-medium text-white hover:bg-maejo-green-light focus:outline-none focus:ring-2 focus:ring-maejo-green/50"
                  >
                    ดูทุกปี
                  </button>
                )}
              </div>
            )}

          {/* ── CTA row ────────────────────────────────────────────── */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
            <p className="text-sm text-gray-600">
              ต้องการดูรายละเอียดโครงการแต่ละรายการ?
            </p>
            <Link
              href={
                budgetYear
                  ? `/research/projects?budgetYear=${budgetYear}`
                  : "/research/projects"
              }
              className="rounded-lg bg-maejo-green px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-maejo-green-light focus:outline-none focus:ring-2 focus:ring-maejo-green/50"
            >
              ดูโครงการทั้งหมด →
            </Link>
          </div>
        </>
      )}

      {/* ── Back link ───────────────────────────────────────────────── */}
      <nav className="mt-4 text-center">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1 text-sm text-maejo-green hover:text-maejo-green-light focus:outline-none focus:underline"
        >
          ← กลับไปหน้า Dashboard
        </Link>
      </nav>
    </main>
  );
}

// ─── Page with Suspense wrapper (required for useSearchParams) ─────

export default function BudgetPage() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <BudgetPageInner />
    </Suspense>
  );
}
