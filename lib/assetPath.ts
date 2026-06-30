/** Public asset path helper — handles GitHub Pages basePath */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function assetPath(path: string): string {
  if (!path) return path;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  if (path.startsWith("data:")) return path;
  return `${basePath}${path.startsWith("/") ? path : `/${path}`}`;
}
