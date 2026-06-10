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
  const p = innerPages[l]["research-systems"];
  return buildPageMetadata({
    locale: l,
    segment: "research-systems",
    title: p.title,
    description: p.lead,
  });
}

export default async function ResearchSystemsPage({ params }: Props) {
  const { locale: l } = await params;
  if (!isLocale(l)) notFound();
  return <PageSimple {...innerPages[l]["research-systems"]} />;
}
