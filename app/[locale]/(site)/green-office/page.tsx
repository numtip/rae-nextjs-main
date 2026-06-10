import PageSimple from "@/components/PageSimple";
import { innerPages } from "@/data/pages";
import { isLocale } from "@/lib/locale";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ locale: string }> };

export default async function GreenOfficePage({ params }: Props) {
  const { locale: l } = await params;
  if (!isLocale(l)) notFound();
  return <PageSimple {...innerPages[l]["green-office"]} />;
}
