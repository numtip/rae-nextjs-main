"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/locale";
import { isNavActive } from "@/lib/navigation-utils";
import { withLocale } from "@/lib/paths";

type Props = {
  locale: Locale;
  path: string;
  label: string;
};

export default function NavItem({ locale, path, label }: Props) {
  const pathname = usePathname() || "/";
  const active = isNavActive(pathname, locale, path);

  return (
    <Link
      href={withLocale(locale, path)}
      className={active ? "is-active" : undefined}
      aria-current={active ? "page" : undefined}
    >
      {label}
    </Link>
  );
}
