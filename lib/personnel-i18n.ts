import type { PersonnelRecord } from "@/data/content-models";
import type { Locale } from "@/lib/locale";

export function localizePersonnel(record: PersonnelRecord, locale: Locale) {
  if (locale === "en") {
    const t = record.translation_en;
    return { name: t.name, role: t.role, department: t.department, contact: t.contact };
  }
  return {
    name: record.name,
    role: record.role,
    department: record.department,
    contact: record.contact,
  };
}
