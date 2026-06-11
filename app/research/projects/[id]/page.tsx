"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

// ─── Local types matching ProjectDetailResponse ────────────────────

interface ProjectDetailProject {
  researchId: number;
  refCode: string | null;
  nameTh: string | null;
  nameEng: string | null;
  typeId: number | null;
  typeName: string | null;
  programId: number | null;
  programName: string | null;
  isSeries: boolean;
  isSeriesMain: boolean;
  isSuccess: boolean;
  dateBegin: string | null;
  dateFinish: string | null;
  totalBudget: number;
}

interface ResearcherEntry {
  researcherId: number;
  personTypeName: string;
  personCode: string | null;
  personName: string | null;
  positionId: string;
  position: string;
  departmentName: string | null;
  workPercent: number | null;
  researchPersonBudget: number | null;
  disciplineGroupName: string;
}

interface BudgetEntry {
  budgetId: number;
  moneyTypeName: string | null;
  moneyName: string | null;
  levelName: string | null;
  budgetDetail: string | null;
  budgetYear: number | null;
  budgetBath: number | null;
}

interface ProjectDetailResponse {
  project: ProjectDetailProject;
  researchers: ResearcherEntry[];
  budgets: BudgetEntry[];
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

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "—";
  try {
    return new Date(dateStr).toLocaleDateString("th-TH", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}

// ─── Loading skeleton ───────────────────────────────────────────────

function DetailSkeleton() {
  return (
    <div className="mx-auto max-w-4xl animate-pulse px-4 py-8">
      <div className="mb-6 h-4 w-32 rounded bg-gray-200" />
      <div className="mb-8 h-8 w-3/4 rounded bg-gray-200" />
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
        {statusCode === 404 ? "ไม่พบโครงการ" : "เกิดข้อผิดพลาด"}
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

// ─── Budget entries section ─────────────────────────────────────────

function BudgetSection({ budgets }: { budgets: BudgetEntry[] }) {
  if (budgets.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-5 text-center text-sm text-gray-500 shadow-sm">
        ไม่มีข้อมูลงบประมาณ
      </div>
    );
  }

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-base font-semibold text-gray-800">
        รายการงบประมาณ ({budgets.length} รายการ)
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm" role="table">
          <thead>
            <tr className="border-b border-gray-100 text-xs font-medium uppercase tracking-wide text-gray-500">
              <th className="px-3 py-2 text-left">ปีงบ</th>
              <th className="px-3 py-2 text-left">ประเภททุน</th>
              <th className="px-3 py-2 text-left">แหล่งทุน</th>
              <th className="px-3 py-2 text-left">ระดับ</th>
              <th className="px-3 py-2 text-right">งบประมาณ</th>
            </tr>
          </thead>
          <tbody>
            {budgets.map((b) => (
              <tr
                key={b.budgetId}
                className="border-b border-gray-50 transition-colors hover:bg-gray-50"
              >
                <td className="px-3 py-3 text-gray-600">
                  {b.budgetYear ?? <span className="text-gray-300">—</span>}
                </td>
                <td className="px-3 py-3 text-gray-700">
                  {b.moneyTypeName ?? <span className="text-gray-300">—</span>}
                </td>
                <td className="px-3 py-3 text-gray-600">
                  {b.moneyName ?? <span className="text-gray-300">—</span>}
                </td>
                <td className="px-3 py-3 text-gray-600">
                  {b.levelName ?? <span className="text-gray-300">—</span>}
                </td>
                <td className="px-3 py-3 text-right font-medium text-gray-800">
                  {b.budgetBath !== null && b.budgetBath !== undefined
                    ? formatCurrency(b.budgetBath)
                    : <span className="text-gray-300">—</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

// ─── Researcher section ─────────────────────────────────────────────

function ResearcherSection({
  researchers,
}: {
  researchers: ResearcherEntry[];
}) {
  if (researchers.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-5 text-center text-sm text-gray-500 shadow-sm">
        ไม่มีข้อมูลนักวิจัย
      </div>
    );
  }

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-base font-semibold text-gray-800">
        นักวิจัย ({researchers.length} คน)
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm" role="table">
          <thead>
            <tr className="border-b border-gray-100 text-xs font-medium uppercase tracking-wide text-gray-500">
              <th className="px-3 py-2 text-left">ชื่อ</th>
              <th className="px-3 py-2 text-left">ประเภท</th>
              <th className="px-3 py-2 text-left">ตำแหน่ง</th>
              <th className="px-3 py-2 text-right">สัดส่วนงาน</th>
              <th className="px-3 py-2 text-right">งบประมาณบุคคล</th>
            </tr>
          </thead>
          <tbody>
            {researchers.map((r) => (
              <tr
                key={r.researcherId}
                className="border-b border-gray-50 transition-colors hover:bg-gray-50"
              >
                <td className="px-3 py-3">
                  <div className="font-medium text-gray-800">
                    {r.personName ?? (
                      <span className="italic text-gray-400">ไม่มีชื่อ</span>
                    )}
                  </div>
                  <div className="text-xs text-gray-400">
                    {r.personCode ?? "—"}
                  </div>
                </td>
                <td className="px-3 py-3 text-gray-700">{r.personTypeName}</td>
                <td className="px-3 py-3 text-gray-600">
                  {r.position}
                  {r.departmentName && (
                    <div className="text-xs text-gray-400">
                      {r.departmentName}
                    </div>
                  )}
                </td>
                <td className="px-3 py-3 text-right text-gray-600">
                  {r.workPercent !== null ? `${r.workPercent}%` : "—"}
                </td>
                <td className="px-3 py-3 text-right font-medium text-gray-800">
                  {r.researchPersonBudget !== null
                    ? formatCurrency(r.researchPersonBudget)
                    : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

// ─── Main page component ────────────────────────────────────────────

export default function ProjectDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [data, setData] = useState<ProjectDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusCode, setStatusCode] = useState<number | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;

    async function fetchDetail() {
      setLoading(true);
      setError(null);
      setStatusCode(undefined);

      try {
        const res = await fetch(`/api/research/projects/${encodeURIComponent(id)}`);
        if (!res.ok) {
          setStatusCode(res.status);
          const body = await res.json().catch(() => ({ error: "Unknown error" }));
          throw new Error((body as ApiError).error ?? `HTTP ${res.status}`);
        }
        const json = (await res.json()) as ProjectDetailResponse;
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
  }, [id]);

  if (loading) return <DetailSkeleton />;
  if (error) return <ErrorDisplay message={error} statusCode={statusCode} />;
  if (!data) return <ErrorDisplay message="ไม่พบข้อมูล" statusCode={404} />;

  const p = data.project;

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
        <span className="text-gray-600">โครงการ</span>
        <span className="mx-2">/</span>
        <span className="text-gray-800">{p.researchId}</span>
      </nav>

      {/* ── Project header ──────────────────────────────────────── */}
      <header className="mb-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
              {p.nameTh ?? (
                <span className="italic text-gray-400">ไม่มีชื่อโครงการ</span>
              )}
            </h1>
            {p.nameEng && (
              <p className="mt-1 text-sm text-gray-500">{p.nameEng}</p>
            )}
            {p.refCode && (
              <p className="mt-1 text-xs text-gray-400">
                รหัสอ้างอิง: {p.refCode}
              </p>
            )}
          </div>
          <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
              p.isSuccess
                ? "bg-green-100 text-green-700"
                : "bg-amber-100 text-amber-700"
            }`}
          >
            {p.isSuccess ? "สำเร็จ" : "ดำเนินการ"}
          </span>
        </div>
      </header>

      {/* ── Info cards ──────────────────────────────────────────── */}
      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-xl border border-gray-100 bg-white p-4 text-center shadow-sm">
          <p className="text-xs text-gray-500">งบประมาณรวม</p>
          <p className="mt-1 text-lg font-bold text-maejo-green">
            {formatCurrency(p.totalBudget)}
          </p>
        </div>
        <div className="rounded-xl border border-gray-100 bg-white p-4 text-center shadow-sm">
          <p className="text-xs text-gray-500">ประเภทโครงการ</p>
          <p className="mt-1 text-sm font-medium text-gray-700">
            {p.typeName ?? <span className="text-gray-300">—</span>}
          </p>
        </div>
        <div className="rounded-xl border border-gray-100 bg-white p-4 text-center shadow-sm">
          <p className="text-xs text-gray-500">วันที่เริ่ม</p>
          <p className="mt-1 text-sm font-medium text-gray-700">
            {formatDate(p.dateBegin)}
          </p>
        </div>
        <div className="rounded-xl border border-gray-100 bg-white p-4 text-center shadow-sm">
          <p className="text-xs text-gray-500">วันที่สิ้นสุด</p>
          <p className="mt-1 text-sm font-medium text-gray-700">
            {formatDate(p.dateFinish)}
          </p>
        </div>
      </div>

      {/* ── Program info row ────────────────────────────────────── */}
      {p.programName && (
        <div className="mb-8 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
          <p className="text-xs text-gray-500">สาขาวิชา / โปรแกรม</p>
          <p className="mt-1 text-sm font-medium text-gray-700">
            {p.programName}
          </p>
        </div>
      )}

      {/* ── Budget entries table ────────────────────────────────── */}
      <div className="mb-8">
        <BudgetSection budgets={data.budgets} />
      </div>

      {/* ── Researchers table ───────────────────────────────────── */}
      <div className="mb-8">
        <ResearcherSection researchers={data.researchers} />
      </div>

      {/* ── Back link ───────────────────────────────────────────── */}
      <nav className="mt-8 text-center">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1 text-sm text-maejo-green hover:text-maejo-green-light focus:outline-none focus:underline"
        >
          ← กลับไปหน้า Dashboard
        </Link>
      </nav>

      {/* ── Generated timestamp ─────────────────────────────────── */}
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
