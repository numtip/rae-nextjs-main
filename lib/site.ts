const DEFAULT_ORIGIN = "https://raeservice.mju.ac.th";
const DEFAULT_PREFIX = "/rae-landing";

/** Public origin (no trailing slash). Override with NEXT_PUBLIC_SITE_ORIGIN. */
export const SITE_ORIGIN = (process.env.NEXT_PUBLIC_SITE_ORIGIN ?? DEFAULT_ORIGIN).replace(/\/$/, "");

/** Path prefix where nginx mounts this export (no leading/trailing slash), e.g. rae-landing */
export const SITE_PATH_PREFIX = (
  process.env.NEXT_PUBLIC_SITE_PATH_PREFIX ?? DEFAULT_PREFIX
)
  .replace(/^\/+|\/+$/g, "")
  .replace(/\/+/g, "");

/** Base URL for resolving relative metadata URLs (…/rae-landing/). */
export function getMetadataBase(): URL {
  return new URL(`${SITE_PATH_PREFIX}/`, `${SITE_ORIGIN}/`);
}

/**
 * Absolute public URL for HTML routes (trailing slash).
 * @param path e.g. "th/about" or "th" (no leading slash)
 */
export function absoluteSiteUrl(path: string): string {
  const inner = path.replace(/^\/+|\/+$/g, "");
  const combined = SITE_PATH_PREFIX ? `${SITE_PATH_PREFIX}/${inner}` : inner;
  return `${SITE_ORIGIN}/${combined}/`.replace(/([^:]\/)\/+/g, "$1");
}

/** sitemap.xml, robots.txt, etc. (no trailing slash) */
export function absolutePublicFile(path: string): string {
  const inner = path.replace(/^\/+|\/+$/g, "");
  const combined = SITE_PATH_PREFIX ? `${SITE_PATH_PREFIX}/${inner}` : inner;
  return `${SITE_ORIGIN}/${combined}`.replace(/([^:]\/)\/+/g, "$1");
}
