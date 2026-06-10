import type { Locale } from "@/lib/locale";

export const personnelSectionLabels: Record<
  Locale,
  { aboutHeading: string; contactHeading: string; role: string; department: string; contact: string }
> = {
  th: {
    aboutHeading: "ผู้บริหารและหน่วยงาน",
    contactHeading: "ช่องทางติดต่อ",
    role: "ตำแหน่ง",
    department: "สังกัด",
    contact: "ติดต่อ",
  },
  en: {
    aboutHeading: "Leadership and organizational units",
    contactHeading: "Contact channels",
    role: "Role",
    department: "Department",
    contact: "Contact",
  },
};
