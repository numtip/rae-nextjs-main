import PageSimple from "@/components/PageSimple";
import PersonnelSection from "@/components/PersonnelSection";
import { innerPages } from "@/data/pages";
import { isLocale } from "@/lib/locale";
import { buildPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: l } = await params;
  if (!isLocale(l)) return {};
  const p = innerPages[l].about;
  return buildPageMetadata({
    locale: l,
    segment: "about",
    title: p.title,
    description: p.lead,
  });
}

export default async function AboutPage({ params }: Props) {
  const { locale: l } = await params;
  if (!isLocale(l)) notFound();
  return (
    <>
      <PageSimple {...innerPages[l].about} />
      <PersonnelSection locale={l} variant="about" />
    </>
  );
}
