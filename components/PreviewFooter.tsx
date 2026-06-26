"use client";

/**
 * Preview Environment Footer
 *
 * Displays build metadata in the site footer when NEXT_PUBLIC_ENV=preview.
 * Hidden in all other environments.
 */
export default function PreviewFooter() {
  const isPreview = process.env.NEXT_PUBLIC_ENV === "preview";

  if (!isPreview) return null;

  const sha = process.env.NEXT_PUBLIC_BUILD_SHA?.slice(0, 7) ?? "dev";
  const date = process.env.NEXT_PUBLIC_BUILD_DATE ?? new Date().toISOString();
  const branch = process.env.NEXT_PUBLIC_BUILD_BRANCH ?? "local";

  return (
    <div className="preview-footer" role="status" aria-label="Preview build info">
      <style>{`
        .preview-footer {
          margin-top: 12px;
          padding: 8px 0;
          border-top: 1px solid rgba(255,255,255,0.15);
          font-family: ui-monospace, monospace;
          font-size: 11px;
          color: rgba(255,255,255,0.5);
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }
        .preview-footer dt {
          font-weight: 600;
          color: rgba(255,255,255,0.7);
        }
        .preview-footer dd {
          margin: 0;
        }
      `}</style>
      <dl>
        <dt>Environment:</dt>
        <dd>Preview</dd>
      </dl>
      <dl>
        <dt>Commit:</dt>
        <dd>{sha}</dd>
      </dl>
      <dl>
        <dt>Branch:</dt>
        <dd>{branch}</dd>
      </dl>
      <dl>
        <dt>Build:</dt>
        <dd>{new Date(date).toISOString()}</dd>
      </dl>
    </div>
  );
}
