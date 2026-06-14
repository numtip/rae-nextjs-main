import type { ReactNode } from "react";

interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export default function EmptyState({
  icon = "🔍",
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div
      role="status"
      className="rounded-xl border border-gray-200 bg-white p-12 text-center shadow-sm"
    >
      <div className="mb-3 text-3xl">{icon}</div>
      <p className="mb-1 text-sm font-medium text-gray-700">{title}</p>
      {description && (
        <p className="mb-4 text-xs text-gray-400">{description}</p>
      )}
      {action && (
        <button
          type="button"
          onClick={action.onClick}
          className="rounded-lg bg-maejo-green px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-maejo-green-light focus:outline-none focus:ring-2 focus:ring-maejo-green/50"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}

export type { EmptyStateProps };
