import type { ServiceRecord } from "@/data/content-models";
import type { Locale } from "@/lib/locale";

export function localizeService(record: ServiceRecord, locale: Locale) {
  if (locale === "en") {
    const t = record.translation_en;
    return {
      name: t.name,
      description: t.description,
      steps: t.steps,
      contact_point: t.contact_point,
    };
  }
  return {
    name: record.name,
    description: record.description,
    steps: record.steps,
    contact_point: record.contact_point,
  };
}
