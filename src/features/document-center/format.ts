import type { Locale } from "@/lib/locale";

export function formatDocumentDate(isoDate: string, locale: Locale): string {
  const d = new Date(`${isoDate}T12:00:00`);
  if (Number.isNaN(d.getTime())) return isoDate;
  return new Intl.DateTimeFormat(locale === "th" ? "th-TH" : "en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(d);
}
