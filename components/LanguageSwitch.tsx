"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/locale";

export default function LanguageSwitch({ locale }: { locale: Locale }) {
  const pathname = usePathname() || "/";
  const rest = pathname.replace(/^\/(th|en)(?=\/|$)/, "") || "/";
  const normalized = rest.startsWith("/") ? rest : `/${rest}`;
  const thTarget = normalized === "/" ? "/th/" : `/th${normalized}`;
  const enTarget = normalized === "/" ? "/en/" : `/en${normalized}`;

  return (
    <div className="lang-switch" role="navigation" aria-label="Language">
      <Link href={thTarget} hrefLang="th" className={locale === "th" ? "is-active" : ""} lang="th">
        ไทย
      </Link>
      <span className="lang-switch-sep" aria-hidden>
        |
      </span>
      <Link href={enTarget} hrefLang="en" className={locale === "en" ? "is-active" : ""} lang="en">
        EN
      </Link>
    </div>
  );
}
