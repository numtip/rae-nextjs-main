import type { Locale } from "@/lib/locale";
import {
  ORG_NAME_EN,
  ORG_NAME_TH,
  ORG_NAV_PRIMARY_EN,
  ORG_NAV_PRIMARY_TH,
  ORG_NAV_SECONDARY_EN,
  ORG_NAV_SECONDARY_TH,
} from "@/lib/org-names";

export type LandingContent = {
  /** <html lang> override — "th" for Thai, "en" for English */
  lang: Locale;

  /* ─── Nav ───────────────────────────────────────────────────────── */
  nav: {
    universityName: string;
    subtitle: string;
    links: { label: string; href: string }[];
    quickAccess: string;
  };

  /* ─── Hero ──────────────────────────────────────────────────────── */
  hero: {
    kicker: string;
    titleLine1: string;
    titleLine2Italic: string;
    paragraph: string;
    primaryCta: string;
    secondaryCta: string;
  };

  /* ─── Impact Metrics ────────────────────────────────────────────── */
  metrics: {
    label: string;
    placeholder: string;
  }[];

  /* ─── RAE at a Glance ──────────────────────────────────────────── */
  atAGlance: {
    kicker: string;
    title: string;
    pillars: {
      title: string;
      text: string;
    }[];
  };

  /* ─── Research to Community ─────────────────────────────────────── */
  researchToCommunity: {
    title: string;
    paragraph: string;
    steps: { icon: string; label: string }[];
  };

  /* ─── Research Showcase ─────────────────────────────────────────── */
  showcase: {
    kicker: string;
    title: string;
    viewAll: string;
    features: {
      tag: string;
      tagStyle: "secondary-container" | "primary" | "default";
      title: string;
      text?: string;
      cta?: string;
      bgStyle?: "default" | "primary";
      layout?: "overlay" | "card";
    }[];
  };

  /* ─── Knowledge Ecosystem ───────────────────────────────────────── */
  ecosystem: {
    kicker: string;
    title: string;
    paragraph: string;
    items: { icon: string; label: string }[];
    cta: string;
  };

  /* ─── Signature Experience ──────────────────────────────────────── */
  signature: {
    kicker: string;
    titleLine1: string;
    titleLine2Italic: string;
    paragraph: string;
    badges: string[];
  };

  /* ─── News & Insights ──────────────────────────────────────────── */
  news: {
    title: string;
    paragraph: string;
    goToNewsroom: string;
    featured: {
      tag: string;
      date: string;
      title: string;
      text: string;
      cta: string;
    };
    dispatches: {
      tag: string;
      tagColor: "secondary-container" | "primary";
      date: string;
      title: string;
      text: string;
    }[];
  };

  /* ─── Footer ───────────────────────────────────────────────────── */
  footer: {
    brandName: string;
    copyright: string;
    links: { label: string; href: string }[];
  };
};

export const landing: Record<Locale, LandingContent> = {
  th: {
    lang: "th",

    /* ─── Nav ─────────────────────────────────────────────────────── */
    nav: {
      universityName: ORG_NAV_PRIMARY_TH,
      subtitle: ORG_NAV_SECONDARY_TH,
      links: [
        { label: "งานวิจัย", href: "#" },
        { label: "นวัตกรรม", href: "#" },
        { label: "บริการวิชาการ", href: "#" },
        { label: "ผลกระทบ", href: "#" },
        { label: "เกี่ยวกับ", href: "#" },
      ],
      quickAccess: "เข้าใช้งานด่วน",
    },

    /* ─── Hero ────────────────────────────────────────────────────── */
    hero: {
      kicker: ORG_NAME_TH,
      titleLine1: "งานวิจัย องค์ความรู้",
      titleLine2Italic:
        "มุ่งพัฒนางานวิจัยและบริการวิชาการสู่สังคม",
      paragraph:
        `ขับเคลื่อนอนาคตเกษตรกรรมด้วยงานวิจัย บริการวิชาการ และการถ่ายทอดองค์ความรู้สู่ชุมชน โดย${ORG_NAME_TH}`,
      primaryCta: "ดูผลงานวิจัย",
      secondaryCta: "เรียนรู้เพิ่มเติม",
    },

    /* ─── Impact Metrics ──────────────────────────────────────────── */
    metrics: [
      { label: "โครงการวิจัย", placeholder: "—" },
      { label: "บริการวิชาการ", placeholder: "..." },
      { label: "แหล่งทรัพยากรความรู้", placeholder: "—" },
      { label: "โครงการชุมชน", placeholder: "..." },
      { label: "ความร่วมมือเชิงยุทธศาสตร์", placeholder: "—" },
    ],

    /* ─── RAE at a Glance ────────────────────────────────────────── */
    atAGlance: {
      kicker: "กองหลักของ RAE",
      title: "RAE ประกอบด้วย 3 กองหลัก",
      pillars: [
        {
          title: "กองบริหารงานวิจัย",
          text: "ดูแลทุนวิจัยและสนับสนุนนักวิจัย บริหารโครงการวิจัย และเชื่อมโยงแหล่งทุน",
        },
        {
          title: "กองบริหารงานบริการวิชาการ",
          text: "ฝึกอบรม ให้คำปรึกษา บริการห้องปฏิบัติการ และบริการวิชาการแก่ชุมชน",
        },
        {
          title: "กองบริหารงานสำนักวิจัยฯ",
          text: "บริหารจัดการสำนัก สนับสนุนการดำเนินงานของ RAE อย่างมีประสิทธิภาพ",
        },
      ],
    },

    /* ─── Research to Community ───────────────────────────────────── */
    researchToCommunity: {
      title: "จากงานวิจัยสู่ชุมชน",
      paragraph:
        "RAE เชื่อมโยงงานวิจัยการเกษตรสู่การบริการวิชาการที่ตอบโจทย์ชุมชน จากห้องปฏิบัติการสู่แปลงนา — จากนักวิจัยสู่เกษตรกร",
      steps: [
        { icon: "science", label: "วิจัยเพื่อชุมชน" },
        { icon: "school", label: "บริการวิชาการเพื่อสังคม" },
        { icon: "handshake", label: "สร้างผลกระทบที่ยั่งยืน" },
      ],
    },

    /* ─── Research Showcase ───────────────────────────────────────── */
    showcase: {
      kicker: "สาขางานวิจัย",
      title: "งานวิจัยของ RAE",
      viewAll: "ดูงานวิจัยทั้งหมด",
      features: [
        {
          tag: "งานวิจัย",
          tagStyle: "secondary-container",
          title: "การวิจัยเกษตรกรรมแบบบูรณาการ",
          text: "RAE บริหารงานวิจัยครอบคลุมหลายสาขาทางการเกษตร เชื่อมโยงนักวิจัยกับแหล่งทุน สวก. (ARDA) และสนับสนุนการดำเนินงานวิจัย",
          layout: "overlay",
        },
        {
          tag: "บริการวิชาการ",
          tagStyle: "primary",
          title: "กองบริหารงานบริการวิชาการ",
          layout: "overlay",
        },
        {
          tag: "Extension",
          tagStyle: "default",
          title: "ฝึกอบรมและให้คำปรึกษา",
          text: "RAE ให้บริการฝึกอบรม ให้คำปรึกษา บริการห้องปฏิบัติการ และการบริการวิชาการแก่ชุมชน",
          cta: "อ่านเพิ่มเติม",
          layout: "card",
        },
        {
          tag: "แหล่งทุน",
          tagStyle: "default",
          title: "ทุนวิจัย สวก. (ARDA)",
          text: "RAE เชื่อมโยงนักวิจัยกับแหล่งทุน Strategic Fund (SF) และ Research Utilization (RU) สำหรับปีงบประมาณ 2570",
          cta: "อ่านเพิ่มเติม",
          layout: "card",
        },
        {
          tag: "เอกสาร",
          tagStyle: "default",
          title: "ศูนย์เอกสาร RAE",
          text: "RAE ให้บริการดาวน์โหลดเอกสาร — เว็บไซต์เป็น Document Registry ไม่ใช่ระบบจัดเก็บเอกสาร ไฟล์ต้นฉบับทั้งหมดจัดเก็บใน SharePoint",
          cta: "อ่านเพิ่มเติม",
          bgStyle: "primary",
          layout: "card",
        },
      ],
    },

    /* ─── Knowledge Ecosystem ─────────────────────────────────────── */
    ecosystem: {
      kicker: "ระบบนิเวศองค์ความรู้",
      title: "ระบบนิเวศองค์ความรู้",
      paragraph:
        "RAE เชื่อมโยงงานวิจัย บริการวิชาการ เอกสาร และบุคลากร เข้าไว้ในระบบองค์ความรู้เดียวกัน เพื่อสนับสนุนการดำเนินงานอย่างมีประสิทธิภาพ",
      items: [
        { icon: "menu_book", label: "วิจัยและบริการวิชาการ" },
        { icon: "school", label: "เอกสารและแหล่งทุน" },
        { icon: "eco", label: "เครือข่ายชุมชน" },
      ],
      cta: "สำรวจองค์ความรู้",
    },

    /* ─── Signature Experience ────────────────────────────────────── */
    signature: {
      kicker: "พันธกิจของ RAE",
      titleLine1: "มุ่งพัฒนางานวิจัยและบริการวิชาการ",
      titleLine2Italic:
        "สู่สังคม โดยมีการเกษตรเป็นรากฐาน",
      paragraph:
        `มุ่งพัฒนางานวิจัยและบริการวิชาการสู่สังคม โดยมีการเกษตรเป็นรากฐาน`,
      badges: ["วิจัยเพื่อสังคม", "บริการวิชาการเพื่อชุมชน"],
    },

    /* ─── News & Insights ────────────────────────────────────────── */
    news: {
      title: "ข่าวสารและข้อมูลเชิงลึก",
      paragraph:
        "ข่าวสาร กิจกรรม และประกาศจาก RAE",
      goToNewsroom: "ไปที่ห้องข่าว",
      featured: {
        tag: "กิจกรรม",
        date: "16 มิ.ย. 2569",
        title: "Research Forum: นักวิจัยพบแหล่งทุน สวก. (ARDA)",
        text: "เมื่อวันที่ 16 มิถุนายน 2569 RAE จัดโครงการ Research Forum การอบรม 'นักวิจัยพบแหล่งทุน สวก.' โดยมี ผศ.ดร.สุริยจรัส เตชะตันมีนสกุล รองอธิการบดี เป็นประธาน",
        cta: "อ่านเพิ่มเติม",
      },
      dispatches: [
        {
          tag: "ทุนวิจัย",
          tagColor: "secondary-container",
          date: "2569",
          title:
            "ทุน Strategic Fund (SF) และ Research Utilization (RU) ปี 2570",
          text:
            "RAE เชื่อมโยงนักวิจัยกับแหล่งทุนจากสำนักงานพัฒนาการวิจัยการเกษตร (สวก./ARDA) ทั้งกองทุน Strategic Fund (SF) และ Research Utilization (RU)",
        },
        {
          tag: "บริการวิชาการ",
          tagColor: "primary",
          date: "2569",
          title:
            "กองบริหารงานบริการวิชาการ — ฝึกอบรมและให้คำปรึกษา",
          text:
            "RAE ให้บริการฝึกอบรม ให้คำปรึกษา บริการห้องปฏิบัติการ และการบริการวิชาการแก่ชุมชน",
        },
      ],
    },

    /* ─── Footer ──────────────────────────────────────────────────── */
    footer: {
      brandName: ORG_NAME_TH,
      copyright: `© 2567 ${ORG_NAME_TH} ความแม่นยำในการเติบโต`,
      links: [
        { label: "นโยบายความเป็นส่วนตัว", href: "#" },
        { label: "ข้อกำหนดการวิจัย", href: "#" },
        { label: "จริยธรรม", href: "#" },
        { label: "รายงานประจำปี", href: "#" },
      ],
    },
  },

  en: {
    lang: "en",

    /* ─── Nav ─────────────────────────────────────────────────────── */
    nav: {
      universityName: ORG_NAV_PRIMARY_EN,
      subtitle: ORG_NAV_SECONDARY_EN,
      links: [
        { label: "Research", href: "#" },
        { label: "Innovation", href: "#" },
        { label: "Extension", href: "#" },
        { label: "Impact", href: "#" },
        { label: "About", href: "#" },
      ],
      quickAccess: "Quick Access",
    },

    /* ─── Hero ────────────────────────────────────────────────────── */
    hero: {
      kicker: ORG_NAME_EN,
      titleLine1: "Research, Knowledge,",
      titleLine2Italic: "Advancing research and academic services to society",
      paragraph:
        `Empowering the future of agriculture through research excellence, academic services, and dedicated community extension from ${ORG_NAME_EN}.`,
      primaryCta: "Explore Our Research",
      secondaryCta: "Learn More About RAE",
    },

    /* ─── Impact Metrics ──────────────────────────────────────────── */
    metrics: [
      { label: "Research Projects", placeholder: "—" },
      { label: "Academic Services", placeholder: "..." },
      { label: "Knowledge Resources", placeholder: "—" },
      { label: "Community Programs", placeholder: "..." },
      { label: "Strategic Partnerships", placeholder: "—" },
    ],

    /* ─── RAE at a Glance ────────────────────────────────────────── */
    atAGlance: {
      kicker: "RAE Core Divisions",
      title: "RAE at a Glance",
      pillars: [
        {
          title: "Research Administration Division",
          text: "Manages grants, researcher support, project administration, and funding connections.",
        },
        {
          title: "Academic Service Administration",
          text: "Training, consulting, laboratory services, and community extension.",
        },
        {
          title: "RAE Office Administration",
          text: "Office management and administrative support for RAE operations.",
        },
      ],
    },

    /* ─── Research to Community ───────────────────────────────────── */
    researchToCommunity: {
      title: "From Research to Community",
      paragraph:
        "RAE connects agricultural research to academic services that answer community needs. From laboratory to rice field — from researcher to farmer.",
      steps: [
        { icon: "science", label: "Research for Community" },
        { icon: "school", label: "Academic Service for Society" },
        { icon: "handshake", label: "Sustainable Impact" },
      ],
    },

    /* ─── Research Showcase ───────────────────────────────────────── */
    showcase: {
      kicker: "Research Areas",
      title: "RAE Research",
      viewAll: "View All Research",
      features: [
        {
          tag: "Research",
          tagStyle: "secondary-container",
          title: "Integrated Agricultural Research",
          text: "RAE administers research across multiple agricultural fields, connects researchers to ARDA funding sources.",
          layout: "overlay",
        },
        {
          tag: "Academic Services",
          tagStyle: "primary",
          title: "Academic Service Administration",
          layout: "overlay",
        },
        {
          tag: "Extension",
          tagStyle: "default",
          title: "Training & Consulting",
          text: "RAE offers training, consulting, laboratory services, and community extension.",
          cta: "Read More",
          layout: "card",
        },
        {
          tag: "Funding",
          tagStyle: "default",
          title: "ARDA Research Funding",
          text: "RAE connects researchers to ARDA Strategic Fund (SF) and Research Utilization (RU) programs for FY 2570.",
          cta: "Read More",
          layout: "card",
        },
        {
          tag: "Documents",
          tagStyle: "default",
          title: "RAE Document Center",
          text: "RAE provides downloadable documents. Website is a Document Registry, not a DMS. All master files are stored in SharePoint/OneDrive.",
          cta: "Read More",
          bgStyle: "primary",
          layout: "card",
        },
      ],
    },

    /* ─── Knowledge Ecosystem ─────────────────────────────────────── */
    ecosystem: {
      kicker: "Knowledge Ecosystem",
      title: "Knowledge Ecosystem",
      paragraph:
        "RAE connects research, academic services, documents, and personnel into a unified knowledge system for efficient and effective operations.",
      items: [
        { icon: "menu_book", label: "Research & Academic Services" },
        { icon: "school", label: "Documents & Funding" },
        { icon: "eco", label: "Community Network" },
      ],
      cta: "Explore Knowledge Base",
    },

    /* ─── Signature Experience ────────────────────────────────────── */
    signature: {
      kicker: "RAE Mission",
      titleLine1: "Advancing Research and Academic Services",
      titleLine2Italic:
        "to Society, Grounded in Agriculture",
      paragraph:
        "Advance research and academic services to society, grounded in agriculture.",
      badges: ["Research for Society", "Academic Service for Community"],
    },

    /* ─── News & Insights ────────────────────────────────────────── */
    news: {
      title: "News & Insights",
      paragraph:
        "News, events, and announcements from RAE",
      goToNewsroom: "Go to Newsroom",
      featured: {
        tag: "Event",
        date: "June 16, 2026",
        title: "Research Forum: Researchers Meet ARDA Funding",
        text: "On 16 June 2026, RAE held a Research Forum on 'Researchers Meet ARDA Funding' chaired by Asst. Prof. Dr. Suriyajaras Techatanmeinsakul, Vice President of MJU.",
        cta: "Read More",
      },
      dispatches: [
        {
          tag: "Funding",
          tagColor: "secondary-container",
          date: "2026",
          title:
            "ARDA Strategic Fund (SF) & Research Utilization (RU) FY 2570",
          text:
            "RAE connects researchers to ARDA (Agricultural Research Development Agency) funding, including Strategic Fund (SF) and Research Utilization (RU) programs.",
        },
        {
          tag: "Academic Services",
          tagColor: "primary",
          date: "2026",
          title:
            "Academic Service Administration — Training & Consulting",
          text:
            "RAE offers training, consulting, laboratory services, and community extension.",
        },
      ],
    },

    /* ─── Footer ──────────────────────────────────────────────────── */
    footer: {
      brandName: ORG_NAME_EN,
      copyright: `© 2024 ${ORG_NAME_EN}. Precision in Growth.`,
      links: [
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Research", href: "#" },
        { label: "Ethics", href: "#" },
        { label: "Annual Report", href: "#" },
      ],
    },
  },
};
