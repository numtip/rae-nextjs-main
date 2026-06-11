interface KpiCardData {
  label: string;
  value: string;
  sublabel?: string;
  icon: string;
}

interface DashboardKpiCardsProps {
  data: KpiCardData[];
  loading?: boolean;
  error?: string | null;
}

function KpiCardSkeleton() {
  return (
    <div className="animate-pulse rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-3 h-8 w-8 rounded-lg bg-gray-200" />
      <div className="mb-2 h-4 w-24 rounded bg-gray-200" />
      <div className="mb-1 h-7 w-32 rounded bg-gray-200" />
      <div className="h-3 w-20 rounded bg-gray-100" />
    </div>
  );
}

export default function DashboardKpiCards({
  data,
  loading = false,
  error = null,
}: DashboardKpiCardsProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <KpiCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div
        role="alert"
        className="rounded-xl border border-red-200 bg-red-50 p-5 text-center text-sm text-red-700"
      >
        ไม่สามารถโหลดข้อมูลภาพรวมได้
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div
        role="status"
        className="rounded-xl border border-gray-200 bg-white p-5 text-center text-sm text-gray-500"
      >
        ไม่มีข้อมูลภาพรวม
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {data.map((card, idx) => (
        <article
          key={idx}
          className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
        >
          <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-maejo-green/10 text-lg">
            {card.icon}
          </div>
          <h3 className="text-xs font-medium uppercase tracking-wide text-gray-500">
            {card.label}
          </h3>
          <p className="mt-1 text-2xl font-bold text-maejo-green">
            {card.value}
          </p>
          {card.sublabel && (
            <p className="mt-0.5 text-xs text-gray-400">{card.sublabel}</p>
          )}
        </article>
      ))}
    </div>
  );
}
