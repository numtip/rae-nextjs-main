import PageSimple from "@/components/PageSimple";
import ServiceCatalog from "@/components/ServiceCatalog";
import { researchServicesRegistry } from "@/data/research-services-registry";
import { innerPages } from "@/data/pages";
import { isLocale } from "@/lib/locale";
import { buildPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: l } = await params;
  if (!isLocale(l)) return {};
  const p = innerPages[l]["research-services"];
  return buildPageMetadata({
    locale: l,
    segment: "research-services",
    title: p.title,
    description: p.lead,
  });
}

export default async function ResearchServicesPage({ params }: Props) {
  const { locale: l } = await params;
  if (!isLocale(l)) notFound();
  return (
    <>
      <PageSimple {...innerPages[l]["research-services"]} />
      <ServiceCatalog locale={l} services={researchServicesRegistry} />
    </>
  );
}
