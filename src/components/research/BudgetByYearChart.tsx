interface BudgetYearEntry {
  year: number;
  totalBudget: number;
  projectCount: number;
}

interface BudgetByYearChartProps {
  data: BudgetYearEntry[];
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

function ChartSkeleton() {
  return (
    <div className="animate-pulse rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-4 h-5 w-40 rounded bg-gray-200" />
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="h-4 w-12 rounded bg-gray-200" />
            <div
              className="h-5 rounded bg-gray-200"
              style={{ width: `${60 + i * 10}%` }}
            />
            <div className="h-4 w-16 rounded bg-gray-100" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function BudgetByYearChart({
  data,
  loading = false,
  error = null,
}: BudgetByYearChartProps) {
  if (loading) return <ChartSkeleton />;

  if (error) {
    return (
      <div
        role="alert"
        className="rounded-xl border border-red-200 bg-red-50 p-5 text-center text-sm text-red-700"
      >
        ไม่สามารถโหลดข้อมูลงบประมาณรายปีได้
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div
        role="status"
        className="rounded-xl border border-gray-200 bg-white p-5 text-center text-sm text-gray-500"
      >
        ไม่มีข้อมูลงบประมาณรายปี
      </div>
    );
  }

  const maxBudget = Math.max(...data.map((d) => d.totalBudget));

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <h2 className="mb-1 text-base font-semibold text-gray-800">
        งบประมาณรายปี
      </h2>
      <p className="mb-4 text-xs text-gray-400">งบประมาณแยกตามปีงบประมาณ</p>

      <div className="space-y-3" role="list" aria-label="งบประมาณรายปี">
        {data.map((entry) => {
          const percent =
            maxBudget > 0 ? (entry.totalBudget / maxBudget) * 100 : 0;
          return (
            <div key={entry.year} role="listitem" className="flex items-center gap-3">
              <span className="w-14 text-right text-sm font-medium text-gray-700">
                {entry.year}
              </span>
              <div className="flex-1">
                <div className="h-6 w-full rounded-md bg-gray-100">
                  <div
                    className="flex h-6 items-center justify-end rounded-md bg-gradient-to-r from-maejo-green to-maejo-green-light px-2 text-xs font-medium text-white transition-all"
                    style={{ width: `${Math.max(percent, 2)}%` }}
                    role="meter"
                    aria-valuenow={entry.totalBudget}
                    aria-valuemin={0}
                    aria-valuemax={maxBudget}
                    aria-label={`ปี ${entry.year} งบประมาณ ${formatCurrency(entry.totalBudget)}`}
                  >
                    {percent > 15 && formatCurrency(entry.totalBudget)}
                  </div>
                </div>
              </div>
              <span className="w-8 text-right text-xs text-gray-400">
                {entry.projectCount} โครงการ
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
