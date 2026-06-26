import SiteFooter from "@/components/footer/SiteFooter";
import SiteHeader from "@/components/navigation/SiteHeader";
import type { Locale } from "@/lib/locale";
import PageContainer from "./PageContainer";

type Props = {
  locale: Locale;
  children: React.ReactNode;
};

function skipMainLabel(locale: Locale): string {
  return locale === "th" ? "ข้ามไปยังเนื้อหา" : "Skip to main content";
}

export default function SiteShell({ locale, children }: Props) {
  return (
    <>
      <a className="skip-to-main" href="#main-content">
        {skipMainLabel(locale)}
      </a>
      <SiteHeader locale={locale} />
      <main id="main-content" className="main-content" tabIndex={-1}>
        <PageContainer>
          {children}
          <SiteFooter locale={locale} />
        </PageContainer>
      </main>
    </>
  );
}
