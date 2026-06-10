import type { Locale } from "@/lib/locale";

/** Prefix internal app path with locale (trailing slash preserved). */
export function withLocale(locale: Locale, path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  if (p === "/") return `/${locale}/`;
  return `/${locale}${p}`;
}
