/**
 * Landing V2 content scaffold — bilingual (TH/EN)
 *
 * STATUS: PLACEHOLDER
 *
 * This is a minimal scaffold awaiting the Google Stitch Landing V2 export.
 * When the V2 source is provided, replace the placeholder copy with the
 * approved bilingual content. Do NOT invent real metrics or fake content.
 *
 * Structure mirrors the institutional narrative:
 *   Hero → Pillars → Research → Ecosystem → Signature → Footer
 */

import type { Locale } from "@/lib/locale";
import {
  ORG_NAME_EN,
  ORG_NAME_TH,
  ORG_NAV_PRIMARY_EN,
  ORG_NAV_PRIMARY_TH,
  ORG_NAV_SECONDARY_EN,
  ORG_NAV_SECONDARY_TH,
} from "@/lib/org-names";

export type LandingV2Content = {
  lang: Locale;
  nav: {
    universityName: string;
    subtitle: string;
    quickAccess: string;
  };
  hero: {
    kicker: string;
    titleLine1: string;
    titleLine2Italic: string;
    paragraph: string;
    primaryCta: string;
    secondaryCta: string;
  };
  pillars: {
    kicker: string;
    title: string;
    items: { title: string; text: string }[];
  };
  research: {
    kicker: string;
    title: string;
    paragraph: string;
    cta: string;
  };
  ecosystem: {
    kicker: string;
    title: string;
    paragraph: string;
  };
  signature: {
    kicker: string;
    title: string;
    paragraph: string;
  };
  footer: {
    brandName: string;
    copyright: string;
  };
};

export const landingV2: Record<Locale, LandingV2Content> = {
  th: {
    lang: "th",
    nav: {
      universityName: ORG_NAV_PRIMARY_TH,
      subtitle: ORG_NAV_SECONDARY_TH,
      quickAccess: "เข้าใช้งานด่วน",
    },
    hero: {
      kicker: ORG_NAME_TH,
      titleLine1: "งานวิจัย องค์ความรู้",
      titleLine2Italic: "และผลกระทบเพื่อสังคม",
      paragraph: `[PLACEHOLDER V2] ขับเคลื่อนอนาคตเกษตรกรรมด้วยงานวิจัยและบริการวิชาการ โดย${ORG_NAME_TH}`,
      primaryCta: "ดูผลงานของเรา",
      secondaryCta: "บริการวิชาการ",
    },
    pillars: {
      kicker: "เสาหลักของสถาบัน",
      title: "ภาพรวมหน่วยงาน",
      items: [
        {
          title: "[PLACEHOLDER] ความเป็นเลิศด้านงานวิจัย",
          text: "[PLACEHOLDER V2] รอเนื้อหาจาก Stitch Landing V2 export",
        },
        {
          title: "[PLACEHOLDER] บริการวิชาการ",
          text: "[PLACEHOLDER V2] รอเนื้อหาจาก Stitch Landing V2 export",
        },
        {
          title: "[PLACEHOLDER] ผลกระทบต่อชุมชน",
          text: "[PLACEHOLDER V2] รอเนื้อหาจาก Stitch Landing V2 export",
        },
      ],
    },
    research: {
      kicker: "[PLACEHOLDER]",
      title: "[PLACEHOLDER] จากงานวิจัยสู่ชุมชน",
      paragraph: "[PLACEHOLDER V2] รอเนื้อหาจาก Stitch Landing V2 export",
      cta: "ดูเพิ่มเติม",
    },
    ecosystem: {
      kicker: "[PLACEHOLDER]",
      title: "[PLACEHOLDER] ระบบนิเวศความรู้",
      paragraph: "[PLACEHOLDER V2] รอเนื้อหาจาก Stitch Landing V2 export",
    },
    signature: {
      kicker: "[PLACEHOLDER]",
      title: "[PLACEHOLDER] ประสบการณ์ระดับสถาบัน",
      paragraph: "[PLACEHOLDER V2] รอเนื้อหาจาก Stitch Landing V2 export",
    },
    footer: {
      brandName: ORG_NAME_TH,
      copyright: `© ${new Date().getFullYear()} ${ORG_NAME_TH}`,
    },
  },
  en: {
    lang: "en",
    nav: {
      universityName: ORG_NAV_PRIMARY_EN,
      subtitle: ORG_NAV_SECONDARY_EN,
      quickAccess: "Quick Access",
    },
    hero: {
      kicker: ORG_NAME_EN,
      titleLine1: "Research, Knowledge",
      titleLine2Italic: "and Impact for Society",
      paragraph: `[PLACEHOLDER V2] Advancing the future of agriculture through research, academic services, and community extension by ${ORG_NAME_EN}`,
      primaryCta: "Explore Our Work",
      secondaryCta: "Academic Services",
    },
    pillars: {
      kicker: "Institutional Pillars",
      title: "RAE at a Glance",
      items: [
        {
          title: "[PLACEHOLDER] Research Excellence",
          text: "[PLACEHOLDER V2] Awaiting content from Stitch Landing V2 export",
        },
        {
          title: "[PLACEHOLDER] Academic Services",
          text: "[PLACEHOLDER V2] Awaiting content from Stitch Landing V2 export",
        },
        {
          title: "[PLACEHOLDER] Community Impact",
          text: "[PLACEHOLDER V2] Awaiting content from Stitch Landing V2 export",
        },
      ],
    },
    research: {
      kicker: "[PLACEHOLDER]",
      title: "[PLACEHOLDER] From Research to Community",
      paragraph: "[PLACEHOLDER V2] Awaiting content from Stitch Landing V2 export",
      cta: "Learn More",
    },
    ecosystem: {
      kicker: "[PLACEHOLDER]",
      title: "[PLACEHOLDER] Knowledge Ecosystem",
      paragraph: "[PLACEHOLDER V2] Awaiting content from Stitch Landing V2 export",
    },
    signature: {
      kicker: "[PLACEHOLDER]",
      title: "[PLACEHOLDER] Signature Experience",
      paragraph: "[PLACEHOLDER V2] Awaiting content from Stitch Landing V2 export",
    },
    footer: {
      brandName: ORG_NAME_EN,
      copyright: `© ${new Date().getFullYear()} ${ORG_NAME_EN}`,
    },
  },
};
