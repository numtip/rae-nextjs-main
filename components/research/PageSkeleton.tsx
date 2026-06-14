interface PageSkeletonProps {
  /** Number of mini-KPI placeholder cards (0 to skip) */
  kpiCount?: number;
  /** Number of chart placeholder rows */
  chartRows?: number;
  /** Whether to show header placeholder */
  showHeader?: boolean;
}

export default function PageSkeleton({
  kpiCount = 5,
  chartRows = 2,
  showHeader = true,
}: PageSkeletonProps) {
  return (
    <div className="mx-auto max-w-7xl animate-pulse px-4 py-6 sm:px-6 lg:px-8">
      {showHeader && (
        <>
          <div className="mb-4 h-4 w-48 rounded bg-gray-200" />
          <div className="mb-6 h-8 w-64 rounded bg-gray-200" />
        </>
      )}

      {kpiCount > 0 && (
        <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {Array.from({ length: kpiCount }).map((_, i) => (
            <div key={i} className="h-20 rounded-xl bg-gray-100" />
          ))}
        </div>
      )}

      {Array.from({ length: chartRows }).map((_, rowIdx) => (
        <div
          key={rowIdx}
          className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2"
        >
          <div className="h-56 rounded-xl bg-gray-100" />
          <div className="h-56 rounded-xl bg-gray-100" />
        </div>
      ))}
    </div>
  );
}
