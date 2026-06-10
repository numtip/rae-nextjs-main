import type { DocumentRecord } from "@/data/content-models";
import type { Locale } from "@/lib/locale";

export function localizeDocument(record: DocumentRecord, locale: Locale) {
  if (locale === "en" && record.translation_en) {
    return {
      name: record.translation_en.name,
      category: record.translation_en.category,
      type: record.type,
      version: record.version,
      file_url: record.file_url,
      updated_at: record.updated_at,
    };
  }
  return {
    name: record.name,
    category: record.category,
    type: record.type,
    version: record.version,
    file_url: record.file_url,
    updated_at: record.updated_at,
  };
}
