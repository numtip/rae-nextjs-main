import PageSimple from "@/components/PageSimple";
import SiteSearch from "@/components/SiteSearch";
import { innerPages } from "@/data/pages";
import { isLocale } from "@/lib/locale";
import { buildPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: l } = await params;
  if (!isLocale(l)) return {};
  const p = innerPages[l].search;
  return {
    ...buildPageMetadata({
      locale: l,
      segment: "search",
      title: p.title,
      description: p.lead,
    }),
    robots: { index: false, follow: true },
  };
}

export default async function SearchPage({ params }: Props) {
  const { locale: l } = await params;
  if (!isLocale(l)) notFound();

  return (
    <>
      <PageSimple {...innerPages[l].search} titleId="page-search-title" />
      <SiteSearch locale={l} labelledBy="page-search-title" />
    </>
  );
}
