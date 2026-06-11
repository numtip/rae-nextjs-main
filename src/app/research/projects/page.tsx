"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

// ─── Local types matching ProjectsResponse ─────────────────────────

interface ProjectListItem {
  researchId: number;
  refCode: string | null;
  nameTh: string | null;
  nameEng: string | null;
  typeName: string | null;
  programName: string | null;
  isSuccess: boolean;
  dateBegin: string | null;
  dateFinish: string | null;
  totalBudget: number;
  budgetYear: number | null;
  fundingType: string | null;
  moneySource: string | null;
  level: string | null;
  researcherNames: string[];
  disciplineGroup: string | null;
}

interface ProjectsResponse {
  items: ProjectListItem[];
  pagination: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
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

const PAGE_SIZES = [10, 20, 50];

// ─── Loading skeleton ───────────────────────────────────────────────

function ListSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-14 rounded-xl bg-gray-100" />
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="mb-4 flex items-center gap-4">
            <div className="h-4 flex-1 rounded bg-gray-100" />
            <div className="h-4 w-20 rounded bg-gray-100" />
            <div className="h-4 w-16 rounded bg-gray-100" />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Inner page (uses useSearchParams — needs Suspense) ────────────

function ProjectsListInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // ── URL-derived state ────────────────────────────────────────────
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10) || 1);
  const pageSize = PAGE_SIZES.includes(parseInt(searchParams.get("pageSize") ?? "20", 10))
    ? parseInt(searchParams.get("pageSize") ?? "20", 10)
    : 20;
  const q = searchParams.get("q") ?? "";
  const budgetYear = searchParams.get("budgetYear") ?? "";
  const fundingType = searchParams.get("fundingType") ?? "";

  // ── Local UI state ───────────────────────────────────────────────
  const [searchInput, setSearchInput] = useState(q);
  const [data, setData] = useState<ProjectsResponse | null>(null);
  const [filterOptions, setFilterOptions] = useState<FiltersResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ── URL updater ──────────────────────────────────────────────────
  const updateUrl = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(updates)) {
        if (value === null || value === "") {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      }
      const qs = params.toString();
      router.push(`/research/projects${qs ? "?" + qs : ""}`);
    },
    [router, searchParams]
  );

  // ── Data fetching ────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      setLoading(true);
      setError(null);

      const apiParams = new URLSearchParams();
      apiParams.set("page", String(page));
      apiParams.set("pageSize", String(pageSize));
      if (q) apiParams.set("q", q);
      if (budgetYear) apiParams.set("budgetYears", budgetYear);
      if (fundingType) apiParams.set("fundingTypes", fundingType);

      try {
        const res = await fetch(`/api/research/projects?${apiParams.toString()}`);
        if (!res.ok) {
          const body = await res.json().catch(() => ({ error: `HTTP ${res.status}` }));
          throw new Error((body as { error?: string }).error ?? `HTTP ${res.status}`);
        }
        const json = (await res.json()) as ProjectsResponse;
        if (!cancelled) setData(json);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "เกิดข้อผิดพลาด");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchData();
    return () => { cancelled = true; };
  }, [page, pageSize, q, budgetYear, fundingType]);

  // ── Filter options (fetch once) ──────────────────────────────────
  useEffect(() => {
    let cancelled = false;
    fetch("/api/research/filters")
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (!cancelled && json) setFilterOptions(json as FiltersResponse);
      })
      .catch(() => { /* filter options are non-critical */ });
    return () => { cancelled = true; };
  }, []);

  // ── Handlers ─────────────────────────────────────────────────────
  function handleSearch() {
    updateUrl({ q: searchInput.trim() || null, page: null });
  }

  function handleClearFilters() {
    setSearchInput("");
    router.push("/research/projects");
  }

  const hasActiveFilters = q !== "" || budgetYear !== "" || fundingType !== "";
  const totalPages = data?.pagination.totalPages ?? 1;
  const totalItems = data?.pagination.totalItems ?? 0;

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {/* ── Breadcrumb + header ──────────────────────────────────── */}
      <nav className="mb-4 text-sm text-gray-400" aria-label="เส้นทางนำทาง">
        <Link
          href="/dashboard"
          className="hover:text-maejo-green focus:outline-none focus:underline"
        >
          Dashboard
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800">โครงการวิจัยทั้งหมด</span>
      </nav>

      <header className="mb-6">
        <h1 className="text-xl font-bold text-maejo-green sm:text-2xl">
          โครงการวิจัยทั้งหมด
        </h1>
        <p className="mt-0.5 text-sm text-gray-500">
          ค้นหาและเรียกดูโครงการวิจัยในระบบ
        </p>
      </header>

      {/* ── Search + filter bar ──────────────────────────────────── */}
      <section className="mb-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="flex min-w-48 flex-1 items-center gap-2">
            <input
              type="search"
              placeholder="ค้นหาชื่อโครงการ / รหัสอ้างอิง..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
              className="w-full max-w-md rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-700 placeholder-gray-400 focus:border-maejo-green focus:outline-none focus:ring-1 focus:ring-maejo-green/30"
              aria-label="ค้นหาโครงการ"
            />
            <button
              type="button"
              onClick={handleSearch}
              className="rounded-lg bg-maejo-green px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-maejo-green-light focus:outline-none focus:ring-2 focus:ring-maejo-green/50"
            >
              ค้นหา
            </button>
          </div>

          {/* Year filter */}
          <select
            value={budgetYear}
            onChange={(e) => updateUrl({ budgetYear: e.target.value || null, page: null })}
            className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-700 focus:border-maejo-green focus:outline-none focus:ring-1 focus:ring-maejo-green/30"
            aria-label="กรองตามปีงบประมาณ"
          >
            <option value="">ทุกปีงบประมาณ</option>
            {filterOptions?.budgetYears.map((opt) => (
              <option key={opt.value} value={opt.value}>
                ปี {opt.label} ({opt.count})
              </option>
            ))}
          </select>

          {/* Funding type filter */}
          <select
            value={fundingType}
            onChange={(e) => updateUrl({ fundingType: e.target.value || null, page: null })}
            className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-700 focus:border-maejo-green focus:outline-none focus:ring-1 focus:ring-maejo-green/30"
            aria-label="กรองตามประเภททุน"
          >
            <option value="">ทุกประเภททุน</option>
            {filterOptions?.fundingTypes.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label} ({opt.count})
              </option>
            ))}
          </select>

          {/* Clear filters */}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleClearFilters}
              className="rounded-lg px-3 py-1.5 text-sm text-gray-500 transition-colors hover:text-red-600 focus:outline-none focus:underline"
            >
              ล้างตัวกรอง
            </button>
          )}
        </div>

        {/* Active filter summary */}
        {hasActiveFilters && (
          <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-gray-100 pt-3 text-xs text-gray-500">
            <span className="font-medium">ตัวกรองที่ใช้:</span>
            {q && (
              <span className="rounded-full bg-maejo-green/10 px-2 py-0.5 text-maejo-green">
                คำค้น: &ldquo;{q}&rdquo;
              </span>
            )}
            {budgetYear && (
              <span className="rounded-full bg-maejo-green/10 px-2 py-0.5 text-maejo-green">
                ปีงบ: {budgetYear}
              </span>
            )}
            {fundingType && (
              <span className="rounded-full bg-maejo-green/10 px-2 py-0.5 text-maejo-green">
                ทุน: {fundingType}
              </span>
            )}
            <span className="ml-auto">
              พบ {totalItems.toLocaleString("th-TH")} โครงการ
            </span>
          </div>
        )}
      </section>

      {/* ── Content ──────────────────────────────────────────────── */}
      {loading ? (
        <ListSkeleton />
      ) : error ? (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 p-8 text-center"
        >
          <p className="mb-4 text-sm text-red-700">{error}</p>
          <button
            type="button"
            onClick={() => updateUrl({})}
            className="rounded-lg bg-maejo-green px-4 py-1.5 text-sm font-medium text-white hover:bg-maejo-green-light focus:outline-none focus:ring-2 focus:ring-maejo-green/50"
          >
            ลองอีกครั้ง
          </button>
        </div>
      ) : !data || data.items.length === 0 ? (
        <div
          role="status"
          className="rounded-xl border border-gray-200 bg-white p-12 text-center shadow-sm"
        >
          <div className="mb-3 text-3xl">🔍</div>
          <p className="mb-1 text-sm font-medium text-gray-700">
            ไม่พบโครงการที่ตรงกับเงื่อนไข
          </p>
          <p className="mb-4 text-xs text-gray-400">
            ลองปรับคำค้นหรือตัวกรองใหม่
          </p>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleClearFilters}
              className="rounded-lg bg-maejo-green px-4 py-1.5 text-sm font-medium text-white hover:bg-maejo-green-light focus:outline-none focus:ring-2 focus:ring-maejo-green/50"
            >
              ล้างตัวกรองทั้งหมด
            </button>
          )}
        </div>
      ) : (
        <>
          {/* ── Projects table ─────────────────────────────────── */}
          <section className="mb-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm" role="table">
                <thead>
                  <tr className="border-b border-gray-100 text-xs font-medium uppercase tracking-wide text-gray-500">
                    <th className="px-3 py-2 text-left">ชื่อโครงการ</th>
                    <th className="px-3 py-2 text-left">ประเภท</th>
                    <th className="px-3 py-2 text-center">สถานะ</th>
                    <th className="px-3 py-2 text-right">ปีงบ</th>
                    <th className="px-3 py-2 text-right">งบประมาณ</th>
                  </tr>
                </thead>
                <tbody>
                  {data.items.map((project) => (
                    <tr
                      key={project.researchId}
                      className="border-b border-gray-50 transition-colors hover:bg-gray-50"
                    >
                      <td className="px-3 py-3">
                        <Link
                          href={`/research/projects/${project.researchId}`}
                          className="font-medium text-maejo-green hover:text-maejo-green-light focus:outline-none focus:underline"
                        >
                          {project.nameTh ?? (
                            <span className="italic text-gray-400">ไม่มีชื่อ</span>
                          )}
                        </Link>
                        <div className="mt-0.5 text-xs text-gray-400">
                          {project.researcherNames.slice(0, 2).join(", ")}
                          {project.researcherNames.length > 2 &&
                            ` และอื่นๆ ${project.researcherNames.length - 2} คน`}
                        </div>
                      </td>
                      <td className="px-3 py-3 text-gray-600">
                        {project.typeName ?? (
                          <span className="text-gray-300">—</span>
                        )}
                      </td>
                      <td className="px-3 py-3 text-center">
                        <span
                          className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                            project.isSuccess
                              ? "bg-green-100 text-green-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {project.isSuccess ? "สำเร็จ" : "ดำเนินการ"}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-right text-gray-600">
                        {project.budgetYear ?? (
                          <span className="text-gray-300">—</span>
                        )}
                      </td>
                      <td className="px-3 py-3 text-right font-medium text-gray-800">
                        {project.totalBudget > 0
                          ? formatCurrency(project.totalBudget)
                          : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* ── Pagination controls ────────────────────────────── */}
          <nav
            className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
            aria-label="การแบ่งหน้า"
          >
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>
                หน้า {data.pagination.page} จาก {totalPages}
                {" · "}
                {totalItems.toLocaleString("th-TH")} โครงการ
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Page size selector */}
              <label className="flex items-center gap-1.5 text-xs text-gray-500">
                แสดง
                <select
                  value={pageSize}
                  onChange={(e) =>
                    updateUrl({ pageSize: e.target.value, page: null })
                  }
                  className="rounded-lg border border-gray-200 px-2 py-1 text-sm text-gray-700 focus:border-maejo-green focus:outline-none focus:ring-1 focus:ring-maejo-green/30"
                  aria-label="จำนวนรายการต่อหน้า"
                >
                  {PAGE_SIZES.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
                ต่อหน้า
              </label>

              {/* Prev / Next */}
              <button
                type="button"
                onClick={() => updateUrl({ page: String(page - 1) })}
                disabled={page <= 1}
                className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-600 transition-colors hover:border-maejo-green hover:text-maejo-green disabled:cursor-not-allowed disabled:opacity-40 focus:outline-none focus:ring-2 focus:ring-maejo-green/50"
                aria-label="หน้าก่อนหน้า"
              >
                ← ก่อนหน้า
              </button>
              <button
                type="button"
                onClick={() => updateUrl({ page: String(page + 1) })}
                disabled={page >= totalPages}
                className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-600 transition-colors hover:border-maejo-green hover:text-maejo-green disabled:cursor-not-allowed disabled:opacity-40 focus:outline-none focus:ring-2 focus:ring-maejo-green/50"
                aria-label="หน้าถัดไป"
              >
                ถัดไป →
              </button>
            </div>
          </nav>
        </>
      )}

      {/* ── Back link ─────────────────────────────────────────────── */}
      <nav className="mt-8 text-center">
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

// ─── Page with Suspense boundary (required for useSearchParams) ────

export default function ProjectsListPage() {
  return (
    <Suspense fallback={<ListSkeleton />}>
      <ProjectsListInner />
    </Suspense>
  );
}
