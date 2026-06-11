import Link from "next/link";

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

interface RecentProjectsTableProps {
  items: ProjectTableItem[];
  loading?: boolean;
  error?: string | null;
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    maximumFractionDigits: 0,
  }).format(amount);
}

function TableSkeleton() {
  return (
    <div className="animate-pulse rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-4 h-5 w-36 rounded bg-gray-200" />
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              {Array.from({ length: 5 }).map((_, i) => (
                <th key={i} className="px-3 py-2 text-left">
                  <div className="h-3 w-16 rounded bg-gray-200" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, i) => (
              <tr key={i}>
                {Array.from({ length: 5 }).map((_, j) => (
                  <td key={j} className="px-3 py-3">
                    <div
                      className="h-4 rounded bg-gray-100"
                      style={{ width: `${50 + j * 10}%` }}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function RecentProjectsTable({
  items,
  loading = false,
  error = null,
}: RecentProjectsTableProps) {
  if (loading) return <TableSkeleton />;

  if (error) {
    return (
      <div
        role="alert"
        className="rounded-xl border border-red-200 bg-red-50 p-5 text-center text-sm text-red-700"
      >
        ไม่สามารถโหลดข้อมูลโครงการล่าสุดได้
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div
        role="status"
        className="rounded-xl border border-gray-200 bg-white p-5 text-center text-sm text-gray-500"
      >
        ไม่มีข้อมูลโครงการ
      </div>
    );
  }

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <h2 className="mb-1 text-base font-semibold text-gray-800">
        โครงการล่าสุด
      </h2>
      <p className="mb-4 text-xs text-gray-400">10 โครงการล่าสุดในระบบ</p>

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
            {items.map((project) => (
              <tr
                key={project.researchId}
                className="border-b border-gray-50 transition-colors hover:bg-gray-50"
              >
                <td className="px-3 py-3 font-medium text-gray-800">
                  <Link
                    href={`/research/projects/${project.researchId}`}
                    className="text-maejo-green hover:text-maejo-green-light focus:outline-none focus:underline"
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
  );
}
