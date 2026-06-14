import type { Metadata } from "next";
import { getMetadataBase } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  robots: { index: true, follow: true },
};

/**
 * Minimal root shell — locale routes (`/th/`, `/en/`) each provide their own
 * <html lang={locale}> via [locale]/layout.tsx (suppressHydrationWarning).
 * The html/body here satisfy Next.js root-layout requirements for non-locale
 * routes (portal, dashboard) and dev-mode validation.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
