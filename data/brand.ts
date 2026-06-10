import type { Locale } from "@/lib/locale";
import { ORG_BRAND_SUBTITLE_EN, ORG_NAME_EN, ORG_NAME_TH } from "@/lib/org-names";

export const brand: Record<
  Locale,
  { title: string; subtitle: string; runtimeBadge: string }
> = {
  th: {
    title: ORG_NAME_TH,
    subtitle: "สำนักวิจัยและส่งเสริมวิชาการการเกษตร · มหาวิทยาลัยแม่โจ้",
    runtimeBadge: "เว็บสาธารณะ — เผยแพร่แบบ static",
  },
  en: {
    title: ORG_NAME_EN,
    subtitle: ORG_BRAND_SUBTITLE_EN,
    runtimeBadge: "Public site — static build",
  },
};
