import Footer from "@/components/Footer";
import HeaderNav from "@/components/HeaderNav";
import type { Locale } from "@/lib/locale";
import { isLocale } from "@/lib/locale";
import { notFound } from "next/navigation";

function skipMainLabel(locale: Locale): string {
  return locale === "th" ? "ข้ามไปยังเนื้อหา" : "Skip to main content";
}

export default async function SiteLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale: l } = await params;
  if (!isLocale(l)) notFound();

  return (
    <>
      <a className="skip-to-main" href="#main-content">
        {skipMainLabel(l)}
      </a>
      <HeaderNav locale={l} />
      <main id="main-content" className="main-content" tabIndex={-1}>
        <div className="layout-container">
          {children}
          <Footer locale={l} />
        </div>
      </main>
    </>
  );
}
