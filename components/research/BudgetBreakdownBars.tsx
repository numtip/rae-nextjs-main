interface BudgetBarEntry {
  label: string;
  budget: number;
  count: number;
}

interface BudgetBreakdownBarsProps {
  title: string;
  subtitle?: string;
  data: BudgetBarEntry[];
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

function BarsSkeleton() {
  return (
    <div className="animate-pulse rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-4 h-5 w-36 rounded bg-gray-200" />
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i}>
            <div className="mb-1 flex justify-between">
              <div className="h-4 w-28 rounded bg-gray-200" />
              <div className="h-4 w-16 rounded bg-gray-100" />
            </div>
            <div className="h-5 rounded-md bg-gray-100" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function BudgetBreakdownBars({
  title,
  subtitle,
  data,
  loading = false,
  error = null,
}: BudgetBreakdownBarsProps) {
  if (loading) return <BarsSkeleton />;

  if (error) {
    return (
      <div
        role="alert"
        className="rounded-xl border border-red-200 bg-red-50 p-5 text-center text-sm text-red-700"
      >
        ไม่สามารถโหลดข้อมูลได้
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div
        role="status"
        className="rounded-xl border border-gray-200 bg-white p-5 text-center text-sm text-gray-500"
      >
        ไม่มีข้อมูล
      </div>
    );
  }

  const maxBudget = Math.max(...data.map((d) => d.budget));
  const totalBudget = data.reduce((s, d) => s + d.budget, 0);

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <h2 className="mb-1 text-base font-semibold text-gray-800">{title}</h2>
      {subtitle && <p className="mb-4 text-xs text-gray-400">{subtitle}</p>}

      <div className="space-y-4" role="list" aria-label={title}>
        {data.map((entry, idx) => {
          const percent = maxBudget > 0 ? (entry.budget / maxBudget) * 100 : 0;
          const share =
            totalBudget > 0
              ? ((entry.budget / totalBudget) * 100).toFixed(1)
              : "0.0";
          return (
            <div key={idx} role="listitem">
              <div className="mb-1 flex items-baseline justify-between gap-2 text-sm">
                <span className="flex-1 font-medium text-gray-700">
                  {entry.label}
                </span>
                <span className="shrink-0 text-xs text-gray-400">
                  {entry.count} รายการ &middot; {share}%
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-5 flex-1 rounded-md bg-gray-100">
                  <div
                    className="h-5 rounded-md bg-gradient-to-r from-maejo-green/70 to-maejo-green"
                    style={{ width: `${Math.max(percent, 2)}%` }}
                    role="meter"
                    aria-valuenow={entry.budget}
                    aria-valuemin={0}
                    aria-valuemax={maxBudget}
                    aria-label={`${entry.label} ${formatCurrency(entry.budget)}`}
                  />
                </div>
                <span className="min-w-28 shrink-0 text-right text-xs text-gray-500">
                  {formatCurrency(entry.budget)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
