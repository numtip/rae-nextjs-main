interface FundingTypeEntry {
  label: string;
  budget: number;
  percentage: number;
}

interface FundingTypeBreakdownProps {
  data: FundingTypeEntry[];
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

function BreakdownSkeleton() {
  return (
    <div className="animate-pulse rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-4 h-5 w-36 rounded bg-gray-200" />
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="h-4 w-32 rounded bg-gray-200" />
            <div className="h-5 flex-1 rounded bg-gray-200" />
            <div className="h-4 w-20 rounded bg-gray-100" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function FundingTypeBreakdown({
  data,
  loading = false,
  error = null,
}: FundingTypeBreakdownProps) {
  if (loading) return <BreakdownSkeleton />;

  if (error) {
    return (
      <div
        role="alert"
        className="rounded-xl border border-red-200 bg-red-50 p-5 text-center text-sm text-red-700"
      >
        ไม่สามารถโหลดข้อมูลประเภททุนได้
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div
        role="status"
        className="rounded-xl border border-gray-200 bg-white p-5 text-center text-sm text-gray-500"
      >
        ไม่มีข้อมูลประเภททุน
      </div>
    );
  }

  const maxBudget = Math.max(...data.map((d) => d.budget));

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <h2 className="mb-1 text-base font-semibold text-gray-800">
        ประเภททุนวิจัย
      </h2>
      <p className="mb-4 text-xs text-gray-400">สัดส่วนงบประมาณตามประเภททุน</p>

      <div className="space-y-4" role="list" aria-label="ประเภททุนวิจัย">
        {data.map((entry, idx) => {
          const percent =
            maxBudget > 0 ? (entry.budget / maxBudget) * 100 : 0;
          return (
            <div key={idx} role="listitem">
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="font-medium text-gray-700">{entry.label}</span>
                <span className="text-xs text-gray-500">
                  {entry.percentage.toFixed(1)}%
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-5 flex-1 rounded-md bg-gray-100">
                  <div
                    className="h-5 rounded-md bg-gradient-to-r from-maejo-green/80 to-maejo-green"
                    style={{ width: `${Math.max(percent, 2)}%` }}
                    role="meter"
                    aria-valuenow={entry.budget}
                    aria-valuemin={0}
                    aria-valuemax={maxBudget}
                    aria-label={`${entry.label} ${formatCurrency(entry.budget)}`}
                  />
                </div>
                <span className="min-w-24 text-right text-xs text-gray-500">
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
