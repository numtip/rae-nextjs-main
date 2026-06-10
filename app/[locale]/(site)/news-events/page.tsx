import NewsListing from "@/components/NewsListing";
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
  const p = innerPages[l]["news-events"];
  return buildPageMetadata({
    locale: l,
    segment: "news-events",
    title: p.title,
    description: p.lead,
  });
}

export default async function NewsEventsPage({ params }: Props) {
  const { locale: l } = await params;
  if (!isLocale(l)) notFound();

  return (
    <>
      <PageSimple {...innerPages[l]["news-events"]} />
      <NewsListing locale={l} />
    </>
  );
}
