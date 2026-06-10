import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/locale";
import { ORG_NAME_EN, ORG_NAME_TH } from "@/lib/org-names";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: true,
});

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
    <html
      className={`${inter.variable} h-full antialiased`}
      lang={locale}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
