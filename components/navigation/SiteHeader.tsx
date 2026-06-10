import Link from "next/link";
import { brand } from "@/data/brand";
import LanguageSwitch from "@/components/LanguageSwitch";
import PageContainer from "@/components/layout/PageContainer";
import type { Locale } from "@/lib/locale";
import { withLocale } from "@/lib/paths";
import MainNav from "./MainNav";
import MobileNav from "./MobileNav";

type Props = {
  locale: Locale;
};

export default function SiteHeader({ locale }: Props) {
  const b = brand[locale];
  const navLabel = locale === "th" ? "หลัก" : "Main";

  return (
    <header className="site-header">
      <PageContainer className="header-inner">
        <div className="brand-block">
          <p className="brand-title">
            <Link href={withLocale(locale, "/")}>{b.title}</Link>
          </p>
          <p className="brand-subtitle">{b.subtitle}</p>
        </div>
        <div className="header-tools-row">
          <div className="header-tools">
            <Link href={withLocale(locale, "/search/")} className="header-search-link">
              {locale === "th" ? "ค้นหา" : "Search"}
            </Link>
            <LanguageSwitch locale={locale} />
            <span className="badge-runtime">{b.runtimeBadge}</span>
          </div>
          <MobileNav locale={locale} ariaLabel={navLabel} />
        </div>
      </PageContainer>
      <MainNav locale={locale} ariaLabel={navLabel} />
    </header>
  );
}
