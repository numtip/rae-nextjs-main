import "@/app/landing-v6/landing-v6.css";
import LandingRenderer from "@/components/landing-v6/LandingRenderer";
import { landing } from "@/content/landing";
import { isLocale } from "@/lib/locale";
import { buildPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: l } = await params;
  if (!isLocale(l)) return {};
  const c = landing[l];
  const title = `${c.hero.titleLine1} ${c.hero.titleLine2Italic}`;
  return buildPageMetadata({
    locale: l,
    segment: "",
    title,
    description: c.hero.paragraph,
    appendOrgSuffix: false,
  });
}

export default async function HomePage({ params }: Props) {
  const { locale: l } = await params;
  if (!isLocale(l)) notFound();

  return <LandingRenderer locale={l} />;
}
