/* eslint-disable @next/next/no-page-custom-font */

import type { Metadata } from "next";
import { Hanken_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
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

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
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
      locale === "th"
        ? `ประตูบริการดิจิทัล ${ORG_NAME_TH}`
        : `Digital gateway — ${ORG_NAME_EN}`,
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
      className={`${inter.variable} ${hankenGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
      lang={locale}
      suppressHydrationWarning
    >
      <head>
        {/* Material Symbols for Stitch V6 landing */}
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
