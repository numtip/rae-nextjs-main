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
      titleLine2Italic: "และผลกระทบเพื่อสังคม",
      paragraph:
        `ขับเคลื่อนอนาคตเกษตรกรรมด้วยงานวิจัย บริการวิชาการ และการถ่ายทอดองค์ความรู้สู่ชุมชน โดย${ORG_NAME_TH}`,
      primaryCta: "ดูผลงานของเรา",
      secondaryCta: "บริการวิชาการ",
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
      kicker: "เสาหลักของสถาบัน",
      title: "ภาพรวมหน่วยงาน",
      pillars: [
        {
          title: "ความเป็นเลิศด้านงานวิจัย",
          text: "ขับเคลื่อนวิทยาศาสตร์เกษตรทั้งขั้นพื้นฐานและประยุกต์เพื่อแก้ปัญหาความท้าทายระดับโลก ด้วยระเบียบวิธีวิจัยที่เข้มงวดและสิ่งอำนวยความสะดวกระดับ前沿",
        },
        {
          title: "บริการวิชาการ",
          text: "แปลผลงานวิจัยที่ซับซ้อนสู่องค์ความรู้ที่เข้าถึงได้ การฝึกอบรมทางเทคนิค และบริการให้คำปรึกษาสำหรับภาคการเกษตร",
        },
        {
          title: "ผลกระทบต่อชุมชน",
          text: "สร้างพลังให้เกษตรกรและสหกรณ์ในพื้นที่ผ่านโครงการextension ที่เข้มแข็ง เพื่อให้มั่นใจว่านวัตกรรมทางวิชาการไปถึงไร่นาอย่างแท้จริง",
        },
      ],
    },

    /* ─── Research to Community ───────────────────────────────────── */
    researchToCommunity: {
      title: "จากงานวิจัยสู่ชุมชน",
      paragraph:
        "พันธกิจของเราไปไกลกว่าการค้นพบ เรามุ่งมั่นให้ทุกความก้าวหน้าในห้องปฏิบัติการแปรเปลี่ยนเป็นแนวทางปฏิบัติที่ยั่งยืนบนพื้นที่จริง นี่คือปรัชญาการส่งเสริมและถ่ายทอดองค์ความรู้ของสำนักวิจัยและส่งเสริมวิชาการการเกษตร",
      steps: [
        { icon: "science", label: "การค้นพบจากงานวิจัย" },
        { icon: "school", label: "การสังเคราะห์องค์ความรู้" },
        { icon: "handshake", label: "การถ่ายทอดสู่ชุมชน" },
      ],
    },

    /* ─── Research Showcase ───────────────────────────────────────── */
    showcase: {
      kicker: "การนำเสนอเชิงบรรณาธิการ",
      title: "สาขาวิชาที่บุกเบิก",
      viewAll: "ดูทั้งหมด",
      features: [
        {
          tag: "งานวิจัย",
          tagStyle: "secondary-container",
          title: "การวิจัยเกษตรกรรมแบบบูรณาการ",
          text: "ขับเคลื่อนวิทยาศาสตร์เกษตรทั้งขั้นพื้นฐานและประยุกต์เพื่อแก้ปัญหาความท้าทายระดับโลก ด้วยระเบียบวิธีวิจัยที่เข้มงวดและสิ่งอำนวยความสะดวกระดับ前沿",
          layout: "overlay",
        },
        {
          tag: "บริการ",
          tagStyle: "primary",
          title: "บริการวิชาการมืออาชีพ",
          layout: "overlay",
        },
        {
          tag: "Extension",
          tagStyle: "default",
          title: "การถ่ายทอดความรู้และบริการวิชาการ",
          text: "สร้างพลังให้เกษตรกรและสหกรณ์ในพื้นที่ผ่านโครงการextension ที่เข้มแข็ง",
          cta: "อ่านเพิ่มเติม",
          layout: "card",
        },
        {
          tag: "ชุมชน",
          tagStyle: "default",
          title: "โครงการส่งเสริมเกษตรกร",
          text: "แปลโมเดลทางวิชาการสู่ข้อมูลเชิงลึกที่เข้าถึงได้บนมือถือสำหรับสหกรณ์ระดับภูมิภาค",
          cta: "อ่านเพิ่มเติม",
          layout: "card",
        },
        {
          tag: "พัฒนา",
          tagStyle: "default",
          title: "โครงการพัฒนาชุมชน",
          text: "บูรณาการเซนเซอร์ฮาร์ดแวร์กับแบบจำลองพยากรณ์อากาศเพื่อการใช้น้ำอย่างมีประสิทธิภาพสูง",
          cta: "อ่านเพิ่มเติม",
          bgStyle: "primary",
          layout: "card",
        },
      ],
    },

    /* ─── Knowledge Ecosystem ─────────────────────────────────────── */
    ecosystem: {
      kicker: "แพลตฟอร์มบูรณาการ",
      title: "ระบบนิเวศองค์ความรู้",
      paragraph:
        "เข้าถึงโครงสร้างพื้นฐานดิจิทัลส่วนกลางของเรา ที่เชื่อมต่องานวิจัย เอกสารการส่งเสริม สื่อการเรียนรู้ และโครงการของสถาบันในประสบการณ์เดียว เพื่อเสริมสร้างเรื่องราวจากงานวิจัยสู่ผลกระทบ",
      items: [
        { icon: "menu_book", label: "พอร์ทัลวิจัยและศูนย์เอกสาร" },
        { icon: "school", label: "ศูนย์การเรียนรู้" },
        { icon: "eco", label: "โครงการสำนักงานสีเขียว" },
      ],
      cta: "เข้าสู่ระบบนิเวศ",
    },

    /* ─── Signature Experience ────────────────────────────────────── */
    signature: {
      kicker: "จังหวะแห่งนวัตกรรม",
      titleLine1: "จากการค้นพบ",
      titleLine2Italic: "สู่การเปลี่ยนแปลงในชุมชน",
      paragraph:
        `ขับเคลื่อนอนาคตเกษตรกรรมด้วยงานวิจัย บริการวิชาการ และการถ่ายทอดองค์ความรู้สู่ชุมชน โดย${ORG_NAME_TH}`,
      badges: ["การมีส่วนร่วมระดับชาติ", "ผลกระทบที่ขับเคลื่อนด้วยข้อมูล"],
    },

    /* ─── News & Insights ────────────────────────────────────────── */
    news: {
      title: "ข่าวสารและข้อมูลเชิงลึก",
      paragraph:
        "สิ่งพิมพ์ล่าสุด ความก้าวหน้าทางระเบียบวิธี และประกาศของสถาบันจากทีมวิจัยของเรา",
      goToNewsroom: "ไปที่ห้องข่าว",
      featured: {
        tag: "กิจกรรมส่งเสริม",
        date: "24 ต.ค. 2567",
        title: "อบรมภาคสนามล่าสุดสำหรับเกษตรกรอินทรีย์ท้องถิ่น",
        text: "การศึกษาระยะทศวรรษเผยให้เห็นกลุ่มแบคทีเรียใหม่ที่สามารถเสริมความต้านทานของระบบรากต่อการสัมผัสอุณหภูมิสูงเป็นเวลานานในสภาพอากาศเขตร้อน",
        cta: "อ่านรายงานฉบับเต็ม",
      },
      dispatches: [
        {
          tag: "ไฮไลท์งานวิจัย",
          tagColor: "secondary-container",
          date: "18 ต.ค. 2567",
          title: "ระบบปลูกข้าวยั่งยืนเพื่อความเข้มแข็งของภูมิภาค",
          text: "ได้รับทุน 4 ล้านเหรียญเพื่อขยายการทดสอบหลายพื้นที่ของเทคนิคการปลูกข้าวที่ปล่อยมีเทนต่ำ",
        },
        {
          tag: "โครงการอบรม",
          tagColor: "primary",
          date: "12 ต.ค. 2567",
          title: "ประกาศนียบัตรวิชาชีพด้านการเกษตรแม่นยำสูง",
          text: "ปล่อยไลบรารี Python ใหม่สำหรับนักวิจัยเพื่อประมวลผล Point Cloud LiDAR ของระบบสวนผลไม้",
        },
        {
          tag: "โครงการชุมชน",
          tagColor: "secondary-container",
          date: "5 ต.ค. 2567",
          title: `${ORG_NAME_TH} ร่วมมือกับสหกรณ์ภูมิภาคเพื่อการผลิตที่เพิ่มมูลค่า`,
          text: `ร่วมกับผู้เชี่ยวชาญระดับโลก ณ ${ORG_NAV_SECONDARY_TH} ในการประชุมสุดยอดสามวันว่าด้วยการเกษตรที่ปรับตัวต่อสภาพภูมิอากาศ`,
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
      titleLine2Italic: "and Impact for Society",
      paragraph:
        `Empowering the future of agriculture through research excellence, academic services, and dedicated community extension from ${ORG_NAME_EN}.`,
      primaryCta: "Explore Our Work",
      secondaryCta: "Academic Services",
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
      kicker: "Institutional Pillars",
      title: "At a Glance",
      pillars: [
        {
          title: "Research Excellence",
          text: "Driving fundamental and applied agricultural science to solve global challenges through rigorous methodologies and state-of-the-art facilities.",
        },
        {
          title: "Academic Services",
          text: "Translating complex research data into accessible knowledge, technical training, and advisory services for the agricultural sector.",
        },
        {
          title: "Community Impact",
          text: "Empowering local farmers and cooperatives through active extension programs, ensuring academic innovation reaches the fields.",
        },
      ],
    },

    /* ─── Research to Community ───────────────────────────────────── */
    researchToCommunity: {
      title: "From Research to Community",
      paragraph:
        "Our mandate goes beyond discovery. We ensure that every breakthrough in the lab translates into tangible, sustainable practices on the ground. This is the extension philosophy of the Office of Agricultural Research and Extension.",
      steps: [
        { icon: "science", label: "Research Discovery" },
        { icon: "school", label: "Knowledge Synthesis" },
        { icon: "handshake", label: "Community Extension" },
      ],
    },

    /* ─── Research Showcase ───────────────────────────────────────── */
    showcase: {
      kicker: "Editorial Showcase",
      title: "Pioneering Fields of Study",
      viewAll: "View All Disciplines",
      features: [
        {
          tag: "Research",
          tagStyle: "secondary-container",
          title: "Integrated Agricultural Research",
          text: "Driving fundamental and applied agricultural science to solve global challenges through rigorous methodologies and state-of-the-art facilities.",
          layout: "overlay",
        },
        {
          tag: "Services",
          tagStyle: "primary",
          title: "Professional Academic Services",
          layout: "overlay",
        },
        {
          tag: "Extension",
          tagStyle: "default",
          title: "Knowledge Transfer & Extension",
          text: "Empowering local farmers and cooperatives through active extension programs, ensuring academic innovation reaches the fields.",
          cta: "Read More",
          layout: "card",
        },
        {
          tag: "Community",
          tagStyle: "default",
          title: "Farmer Engagement Programs",
          text: "Translating academic models into mobile-accessible insights for regional cooperatives.",
          cta: "Read More",
          layout: "card",
        },
        {
          tag: "Development",
          tagStyle: "default",
          title: "Community Development Initiatives",
          text: "Integrating hardware sensors with predictive weather models for hyper-efficient water use.",
          cta: "Read More",
          bgStyle: "primary",
          layout: "card",
        },
      ],
    },

    /* ─── Knowledge Ecosystem ─────────────────────────────────────── */
    ecosystem: {
      kicker: "Integrated Platform",
      title: "Knowledge Ecosystem",
      paragraph:
        "Access our centralized digital infrastructure connecting academic research, extension documents, learning modules, and institutional initiatives in one seamless experience to reinforce our Research to Impact narrative.",
      items: [
        { icon: "menu_book", label: "Research Portal & Document Center" },
        { icon: "school", label: "Learning Center" },
        { icon: "eco", label: "Green Office Initiative" },
      ],
      cta: "Enter Ecosystem",
    },

    /* ─── Signature Experience ────────────────────────────────────── */
    signature: {
      kicker: "The Pulse of Innovation",
      titleLine1: "From Discovery",
      titleLine2Italic: "to Community",
      paragraph:
        `Empowering the future of agriculture through research excellence, academic services, and dedicated community extension from ${ORG_NAME_EN}.`,
      badges: ["National-Level Contribution", "Data-Driven Impact"],
    },

    /* ─── News & Insights ────────────────────────────────────────── */
    news: {
      title: "News & Insights",
      paragraph:
        "Latest publications, methodological breakthroughs, and institutional announcements from our research teams.",
      goToNewsroom: "Go to Newsroom",
      featured: {
        tag: "Extension Activity",
        date: "Oct 24, 2024",
        title: "Latest Field Training Workshop for Local Organic Farmers",
        text: "A decade-long study reveals novel bacterial consortia capable of significantly buffering root systems against prolonged high-temperature exposure in tropical climates.",
        cta: "Read Full Paper",
      },
      dispatches: [
        {
          tag: "Research Highlight",
          tagColor: "secondary-container",
          date: "Oct 18, 2024",
          title: "Sustainable Rice Cultivation Systems for Regional Resilience",
          text: "Securing $4M to expand multi-site testing of low-methane emitting paddy cultivation techniques.",
        },
        {
          tag: "Training Program",
          tagColor: "primary",
          date: "Oct 12, 2024",
          title: "Upcoming Professional Certification in Precision Agriculture",
          text: "New Python library released for researchers to streamline LiDAR point cloud processing of orchard systems.",
        },
        {
          tag: "Community Project",
          tagColor: "secondary-container",
          date: "Oct 05, 2024",
          title: `${ORG_NAME_EN} Partners with Regional Cooperatives for Value-Added Production`,
          text: `Join global experts at ${ORG_NAV_SECONDARY_EN} for a three-day summit on climate-adaptive agriculture.`,
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
