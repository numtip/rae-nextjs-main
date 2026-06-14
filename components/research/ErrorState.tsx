interface ErrorStateProps {
  message: string;
  onRetry: () => void;
  title?: string;
}

export default function ErrorState({
  message,
  onRetry,
  title = "เกิดข้อผิดพลาด",
}: ErrorStateProps) {
  return (
    <main className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-4 text-center">
      <div className="mb-4 text-4xl" role="img" aria-label="ข้อผิดพลาด">
        ⚠️
      </div>
      <h1 className="mb-2 text-xl font-semibold text-gray-800">{title}</h1>
      <p className="mb-6 max-w-md text-sm text-gray-500">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="rounded-lg bg-maejo-green px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-maejo-green-light focus:outline-none focus:ring-2 focus:ring-maejo-green/50"
      >
        ลองอีกครั้ง
      </button>
    </main>
  );
}
