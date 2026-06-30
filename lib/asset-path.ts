/**
 * Asset path helper for GitHub Pages compatibility.
 *
 * GitHub Pages serves the app under a basePath (e.g. /rae-nextjs-main).
 * next/image handles basePath automatically, but raw <img> tags and
 * CSS background-image URLs do NOT.
 *
 * Use this helper for:
 *   - <img src={assetPath("/images/...")} />
 *   - style={{ backgroundImage: `url(${assetPath("/images/...")})` }}
 *
 * Do NOT use for next/image src — Next.js handles that automatically.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function assetPath(path: string): string {
  if (!path) return path;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const normalised = path.startsWith("/") ? path : `/${path}`;
  return `${basePath}${normalised}`;
}
