"use client";

/**
 * Preview Environment Banner
 *
 * Renders a fixed badge + build info bar in the top-right corner
 * when NEXT_PUBLIC_ENV=preview. Invisible in all other environments.
 */
export default function PreviewBanner() {
  const isPreview = process.env.NEXT_PUBLIC_ENV === "preview";

  if (!isPreview) return null;

  const sha = process.env.NEXT_PUBLIC_BUILD_SHA?.slice(0, 7) ?? "dev";
  const date = process.env.NEXT_PUBLIC_BUILD_DATE ?? new Date().toISOString();
  const branch = process.env.NEXT_PUBLIC_BUILD_BRANCH ?? "local";

  return (
    <div className="preview-banner" role="status" aria-label="Preview environment">
      <style>{`
        .preview-banner {
          position: fixed;
          top: 0;
          right: 0;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 2px;
          font-family: ui-monospace, monospace;
          font-size: 11px;
          line-height: 1.3;
          pointer-events: none;
          user-select: none;
        }
        .preview-badge {
          display: inline-block;
          background: #eab308;
          color: #000;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: 0 0 0 4px;
          font-size: 10px;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }
        .preview-meta {
          display: inline-block;
          background: rgba(0,0,0,0.75);
          color: #eab308;
          padding: 2px 8px;
          border-radius: 4px 0 0 4px;
          font-size: 10px;
          white-space: nowrap;
        }
      `}</style>
      <span className="preview-badge">PREVIEW</span>
      <span className="preview-meta">
        {branch}@{sha} | {new Date(date).toLocaleString()}
      </span>
    </div>
  );
}
