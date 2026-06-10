import { SiteShell } from "@/components/layout";
import { isLocale } from "@/lib/locale";
import { notFound } from "next/navigation";

export default async function SiteLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale: l } = await params;
  if (!isLocale(l)) notFound();

  return <SiteShell locale={l}>{children}</SiteShell>;
}
