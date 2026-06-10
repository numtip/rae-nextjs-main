import Link from "next/link";
import { brand } from "@/data/brand";
import LanguageSwitch from "@/components/LanguageSwitch";
import { mainNav } from "@/data/navigation";
import type { Locale } from "@/lib/locale";
import { withLocale } from "@/lib/paths";

export default function HeaderNav({ locale }: { locale: Locale }) {
  const b = brand[locale];
  const navLabel = locale === "th" ? "หลัก" : "Main";

  return (
    <header className="site-header">
      <div className="layout-container header-inner">
        <div className="brand-block">
          <h1 className="brand-title">
            <Link href={withLocale(locale, "/")}>{b.title}</Link>
          </h1>
          <p className="brand-subtitle">{b.subtitle}</p>
        </div>
        <div className="header-tools">
          <Link href={withLocale(locale, "/search/")} className="header-search-link">
            {locale === "th" ? "ค้นหา" : "Search"}
          </Link>
          <LanguageSwitch locale={locale} />
          <span className="badge-runtime">{b.runtimeBadge}</span>
        </div>
      </div>
      <nav className="layout-container nav-row" aria-label={navLabel}>
        <ul className="nav-list">
          {mainNav.map((item) => (
            <li key={item.path}>
              <Link href={withLocale(locale, item.path)}>{item.label[locale]}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
