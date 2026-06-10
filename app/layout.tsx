import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ORG_NAME_EN, ORG_NAME_TH } from "@/lib/org-names";
import { getMetadataBase } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: {
    default: ORG_NAME_TH,
    template: "%s",
  },
  description: ORG_NAME_EN,
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={`${inter.variable} h-full antialiased`}
      lang="th"
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
