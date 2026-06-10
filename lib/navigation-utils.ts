import type { Locale } from "@/lib/locale";

/** Match current pathname against a nav item path (locale-aware). */
export function isNavActive(pathname: string, locale: Locale, path: string): boolean {
  const normalized = pathname.replace(/\/$/, "") || "/";
  const localeRoot = `/${locale}`;

  if (path === "/") {
    return normalized === localeRoot;
  }

  const segment = path.replace(/\/$/, "");
  const target = `${localeRoot}${segment}`;
  return normalized === target || normalized.startsWith(`${target}/`);
}
