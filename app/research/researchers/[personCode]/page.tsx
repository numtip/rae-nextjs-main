"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

// ─── Local types matching ResearcherDetailResponse ─────────────────

interface ResearcherProfile {
  personCode: string | null;
  nameTh: string | null;
  nameEn: null;
  departmentName: string | null;
  facultyName: null;
  personTypeName: string;
  position: string;
  disciplineGroupName: string;
}

interface ResearcherStats {
  totalProjects: number;
  totalBudget: number;
  budgetYears: number[];
  roles: Array<{ label: string; count: number }>;
}

interface ResearcherProjectItem {
  researchId: number;
  refCode: string | null;
  nameTh: string | null;
  nameEng: string | null;
  typeName: string | null;
  isSuccess: boolean;
  dateBegin: string | null;
  dateFinish: string | null;
  totalBudget: number;
  budgetYear: number | null;
  fundingType: string | null;
  workPercent: number | null;
  researchPersonBudget: number | null;
}

interface ResearcherByYear {
  year: number;
  totalBudget: number;
  projectCount: number;
  projects: ResearcherProjectItem[];
}

interface ResearcherDetailResponse {
  researcher: ResearcherProfile;
  stats: ResearcherStats;
  projects: ResearcherProjectItem[];
  byYear: ResearcherByYear[];
  generatedAt: string;
}

interface ApiError {
  error: string;
  code: string;
  details: Record<string, unknown> | null;
}

// ─── Helpers ────────────────────────────────────────────────────────

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    maximumFractionDigits: 0,
  }).format(amount);
}

// ─── Loading skeleton ───────────────────────────────────────────────

function DetailSkeleton() {
  return (
    <div className="mx-auto max-w-4xl animate-pulse px-4 py-8">
      <div className="mb-6 h-4 w-32 rounded bg-gray-200" />
      <div className="mb-8 h-8 w-1/2 rounded bg-gray-200" />
      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-20 rounded-xl bg-gray-100" />
        ))}
      </div>
      <div className="mb-8 h-48 rounded-xl bg-gray-100" />
      <div className="h-32 rounded-xl bg-gray-100" />
    </div>
  );
}

// ─── Error display ─────────────────────────────────────────────────

function ErrorDisplay({ message, statusCode }: { message: string; statusCode?: number }) {
  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-4 text-center">
      <div className="mb-4 text-4xl">{statusCode === 404 ? "🔍" : "⚠️"}</div>
      <h1 className="mb-2 text-xl font-semibold text-gray-800">
        {statusCode === 404 ? "ไม่พบนักวิจัย" : "เกิดข้อผิดพลาด"}
      </h1>
      <p className="mb-6 max-w-md text-sm text-gray-500">{message}</p>
      <Link
        href="/dashboard"
        className="rounded-lg bg-maejo-green px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-maejo-green-light focus:outline-none focus:ring-2 focus:ring-maejo-green/50"
      >
        กลับไปหน้า Dashboard
      </Link>
    </main>
  );
}

// ─── ByYear section ─────────────────────────────────────────────────

function ByYearSection({ byYear }: { byYear: ResearcherByYear[] }) {
  if (byYear.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-5 text-center text-sm text-gray-500 shadow-sm">
        ไม่มีข้อมูลแยกปี
      </div>
    );
  }

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-base font-semibold text-gray-800">
        งานวิจัยแยกตามปีงบประมาณ
      </h2>
      <div className="space-y-6">
        {byYear.map((entry) => (
          <div key={entry.year}>
            <div className="mb-2 flex items-baseline justify-between">
              <h3 className="text-sm font-bold text-gray-700">
                ปีงบประมาณ {entry.year}
              </h3>
              <span className="text-xs text-gray-400">
                {entry.projectCount} โครงการ /{" "}
                {formatCurrency(entry.totalBudget)}
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm" role="table">
                <thead>
                  <tr className="border-b border-gray-100 text-xs font-medium uppercase tracking-wide text-gray-500">
                    <th className="px-3 py-2 text-left">โครงการ</th>
                    <th className="px-3 py-2 text-left">ประเภท</th>
                    <th className="px-3 py-2 text-center">สถานะ</th>
                    <th className="px-3 py-2 text-right">งบ</th>
                  </tr>
                </thead>
                <tbody>
                  {entry.projects.map((proj) => (
                    <tr
                      key={proj.researchId}
                      className="border-b border-gray-50 transition-colors hover:bg-gray-50"
                    >
                      <td className="px-3 py-2">
                        <Link
                          href={`/research/projects/${proj.researchId}`}
                          className="font-medium text-maejo-green hover:text-maejo-green-light focus:outline-none focus:underline"
                        >
                          {proj.nameTh ?? (
                            <span className="italic text-gray-400">ไม่มีชื่อ</span>
                          )}
                        </Link>
                      </td>
                      <td className="px-3 py-2 text-gray-600">
                        {proj.typeName ?? (
                          <span className="text-gray-300">—</span>
                        )}
                      </td>
                      <td className="px-3 py-2 text-center">
                        <span
                          className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                            proj.isSuccess
                              ? "bg-green-100 text-green-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {proj.isSuccess ? "สำเร็จ" : "ดำเนินการ"}
                        </span>
                      </td>
                      <td className="px-3 py-2 text-right font-medium text-gray-800">
                        {proj.totalBudget > 0
                          ? formatCurrency(proj.totalBudget)
                          : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Main page component ────────────────────────────────────────────

export default function ResearcherDetailPage() {
  const params = useParams();
  const personCode = params.personCode as string;

  const [data, setData] = useState<ResearcherDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusCode, setStatusCode] = useState<number | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;

    async function fetchDetail() {
      setLoading(true);
      setError(null);
      setStatusCode(undefined);

      // Encode safely for URL (masked codes contain asterisks)
      const encoded = encodeURIComponent(personCode);

      try {
        const res = await fetch(`/api/research/researchers/${encoded}`);
        if (!res.ok) {
          setStatusCode(res.status);
          const body = await res.json().catch(() => ({ error: "Unknown error" }));
          throw new Error((body as ApiError).error ?? `HTTP ${res.status}`);
        }
        const json = (await res.json()) as ResearcherDetailResponse;
        if (!cancelled) setData(json);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "เกิดข้อผิดพลาด");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchDetail();
    return () => { cancelled = true; };
  }, [personCode]);

  if (loading) return <DetailSkeleton />;
  if (error) return <ErrorDisplay message={error} statusCode={statusCode} />;
  if (!data) return <ErrorDisplay message="ไม่พบข้อมูล" statusCode={404} />;

  const { researcher: r, stats, projects, byYear } = data;
  // Only masked code is available — route API already masks it
  // Person code in HTML is always the masked form

  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      {/* ── Breadcrumb ───────────────────────────────────────────── */}
      <nav className="mb-4 text-sm text-gray-400" aria-label="เส้นทางนำทาง">
        <Link
          href="/dashboard"
          className="hover:text-maejo-green focus:outline-none focus:underline"
        >
          Dashboard
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800">นักวิจัย</span>
      </nav>

      {/* ── Researcher profile header ────────────────────────────── */}
      <header className="mb-8">
        <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
          {r.nameTh ?? (
            <span className="italic text-gray-400">ไม่มีชื่อนักวิจัย</span>
          )}
        </h1>
        <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-1 text-sm text-gray-500">
          <span>{r.personTypeName}</span>
          <span>{r.position}</span>
          <span>{r.disciplineGroupName}</span>
          {r.departmentName && <span>{r.departmentName}</span>}
        </div>
        {r.personCode && (
          <p className="mt-2 text-xs text-gray-400">
            รหัส: {r.personCode}
          </p>
        )}
      </header>

      {/* ── Stats cards ──────────────────────────────────────────── */}
      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-xl border border-gray-100 bg-white p-4 text-center shadow-sm">
          <p className="text-xs text-gray-500">โครงการทั้งหมด</p>
          <p className="mt-1 text-lg font-bold text-maejo-green">
            {stats.totalProjects}
          </p>
        </div>
        <div className="rounded-xl border border-gray-100 bg-white p-4 text-center shadow-sm">
          <p className="text-xs text-gray-500">งบประมาณรวม</p>
          <p className="mt-1 text-lg font-bold text-maejo-green">
            {formatCurrency(stats.totalBudget)}
          </p>
        </div>
        <div className="rounded-xl border border-gray-100 bg-white p-4 text-center shadow-sm">
          <p className="text-xs text-gray-500">ปีงบประมาณ</p>
          <p className="mt-1 text-lg font-bold text-gray-700">
            {stats.budgetYears.length}
          </p>
        </div>
        <div className="rounded-xl border border-gray-100 bg-white p-4 text-center shadow-sm">
          <p className="text-xs text-gray-500">บทบาท</p>
          <p className="mt-1 text-lg font-bold text-gray-700">
            {stats.roles.length}
          </p>
        </div>
      </div>

      {/* ── Roles breakdown ─────────────────────────────────────── */}
      {stats.roles.length > 0 && (
        <div className="mb-8 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
          <h2 className="mb-3 text-sm font-semibold text-gray-800">
            บทบาทในโครงการ
          </h2>
          <div className="flex flex-wrap gap-2">
            {stats.roles.map((role) => (
              <span
                key={role.label}
                className="rounded-full bg-maejo-green/10 px-3 py-1 text-xs font-medium text-maejo-green"
              >
                {role.label} ({role.count})
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ── Year-by-year breakdown ───────────────────────────────── */}
      <div className="mb-8">
        <ByYearSection byYear={byYear} />
      </div>

      {/* ── All projects (flat list) ─────────────────────────────── */}
      {projects.length > 0 && (
        <div className="mb-8 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-base font-semibold text-gray-800">
            โครงการทั้งหมด ({projects.length} โครงการ)
          </h2>
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
                {projects.map((proj) => (
                  <tr
                    key={proj.researchId}
                    className="border-b border-gray-50 transition-colors hover:bg-gray-50"
                  >
                    <td className="px-3 py-3">
                      <Link
                        href={`/research/projects/${proj.researchId}`}
                        className="font-medium text-maejo-green hover:text-maejo-green-light focus:outline-none focus:underline"
                      >
                        {proj.nameTh ?? (
                          <span className="italic text-gray-400">ไม่มีชื่อ</span>
                        )}
                      </Link>
                      <div className="mt-0.5 text-xs text-gray-400">
                        {proj.fundingType ?? ""}
                      </div>
                    </td>
                    <td className="px-3 py-3 text-gray-600">
                      {proj.typeName ?? (
                        <span className="text-gray-300">—</span>
                      )}
                    </td>
                    <td className="px-3 py-3 text-center">
                      <span
                        className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                          proj.isSuccess
                            ? "bg-green-100 text-green-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {proj.isSuccess ? "สำเร็จ" : "ดำเนินการ"}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-right text-gray-600">
                      {proj.budgetYear ?? (
                        <span className="text-gray-300">—</span>
                      )}
                    </td>
                    <td className="px-3 py-3 text-right font-medium text-gray-800">
                      {proj.totalBudget > 0
                        ? formatCurrency(proj.totalBudget)
                        : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Back link ───────────────────────────────────────────── */}
      <nav className="mt-8 text-center">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1 text-sm text-maejo-green hover:text-maejo-green-light focus:outline-none focus:underline"
        >
          ← กลับไปหน้า Dashboard
        </Link>
      </nav>

      {data.generatedAt && (
        <p className="mt-4 text-center text-xs text-gray-400">
          อัปเดตล่าสุด:{" "}
          {new Date(data.generatedAt).toLocaleString("th-TH", {
            dateStyle: "medium",
            timeStyle: "short",
          })}
        </p>
      )}
    </main>
  );
}
