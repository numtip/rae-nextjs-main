import PageSimple from "@/components/PageSimple";
import { innerPages } from "@/data/pages";
import { isLocale } from "@/lib/locale";
import { buildPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: l } = await params;
  if (!isLocale(l)) return {};
  const p = innerPages[l]["green-office"];
  return buildPageMetadata({
    locale: l,
    segment: "green-office",
    title: p.title,
    description: p.lead,
  });
}

export default async function GreenOfficePage({ params }: Props) {
  const { locale: l } = await params;
  if (!isLocale(l)) notFound();
  return <PageSimple {...innerPages[l]["green-office"]} />;
}
