import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HtmlLang from "@/components/HtmlLang";
import { isLocale } from "@/lib/locale";
import { ORG_NAME_EN, ORG_NAME_TH } from "@/lib/org-names";

export function generateStaticParams() {
  return [{ locale: "th" }, { locale: "en" }];
}

const titles: Record<string, string> = {
  th: ORG_NAME_TH,
  en: ORG_NAME_EN,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    title: titles[locale],
    description:
      locale === "th" ? `ประตูบริการดิจิทัล ${ORG_NAME_TH}` : `Digital gateway — ${ORG_NAME_EN}`,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <>
      <HtmlLang locale={locale} />
      {children}
    </>
  );
}
