interface MiniKpiEntry {
  icon: string;
  label: string;
  value: string;
  valueClassName?: string;
}

interface MiniKpiCardsProps {
  items: MiniKpiEntry[];
  columns?: number;
  className?: string;
}

function MiniKpiSkeleton({ columns = 5 }: { columns?: number }) {
  return (
    <div
      className={`mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-${columns}`}
      aria-label="กำลังโหลดตัวชี้วัด"
    >
      {Array.from({ length: columns }).map((_, i) => (
        <div
          key={i}
          className="h-20 animate-pulse rounded-xl bg-gray-100"
        />
      ))}
    </div>
  );
}

export default function MiniKpiCards({
  items,
  columns = 5,
  className = "",
}: MiniKpiCardsProps) {
  if (items.length === 0) return null;

  const gridCols =
    columns === 5
      ? "sm:grid-cols-3 lg:grid-cols-5"
      : columns === 4
        ? "sm:grid-cols-2 lg:grid-cols-4"
        : columns === 3
          ? "sm:grid-cols-3"
          : `sm:grid-cols-3 lg:grid-cols-${columns}`;

  return (
    <section
      className={`mb-6 grid grid-cols-2 gap-4 ${gridCols} ${className}`}
      aria-label="ตัวชี้วัดหลัก"
    >
      {items.map((item, idx) => (
        <article
          key={idx}
          className="rounded-xl border border-gray-200 bg-white p-4 text-center shadow-sm"
        >
          <div className="mb-2 text-xl">{item.icon}</div>
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
            {item.label}
          </p>
          <p
            className={`mt-1 text-lg font-bold ${
              item.valueClassName ?? "text-gray-700"
            }`}
          >
            {item.value}
          </p>
        </article>
      ))}
    </section>
  );
}

export { MiniKpiSkeleton };
export type { MiniKpiEntry, MiniKpiCardsProps };
