import HomeSectionRenderer from "@/components/home/HomeSectionRenderer";
import { hero } from "@/data/hero";
import { isLocale } from "@/lib/locale";
import { buildPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: l } = await params;
  if (!isLocale(l)) return {};
  const h = hero[l];
  return buildPageMetadata({
    locale: l,
    segment: "",
    title: h.title,
    description: h.text,
    appendOrgSuffix: false,
  });
}

export default async function HomePage({ params }: Props) {
  const { locale: l } = await params;
  if (!isLocale(l)) notFound();

  return <HomeSectionRenderer locale={l} />;
}
