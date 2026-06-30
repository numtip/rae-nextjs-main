/**
 * Stitch Landing V2 — Bilingual Content
 *
 * Source: docs/design-freeze-v2/stitch-landing-v2/code.html
 * Status: Draft — all content needs human review before production
 *
 * NOTE: Statistics values are hardcoded from Stitch HTML source.
 * They may not reflect current RAE data.
 * ⚠️ NEEDS_VERIFICATION — confirm with RAE team before production use.
 */

import type { Locale } from "@/lib/locale";

export type PartnerItem = {
  id: string;
  nameTh: string;
  nameEn: string;
  shortName?: string;
  logo?: string;
  type: string;
};

export type StitchLandingContent = {
  lang: Locale;
  topBar: {
    loginLabel: string;
    loginHref: string;
    altLocaleLabel: string;
    altLocaleHref: string;
  };
  nav: {
    logoAlt: string;
    siteName: string;
    siteSubtitle: string;
    links: { label: string; href: string; isActive?: boolean }[];
    searchPlaceholder: string;
    quickAccessLabel: string;
  };
  hero: {
    backgroundImage: string;
    headlineBeforeGold: string;
    headlineGold: string;
    headlineAfterGold: string;
    paragraph: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
  };
  services: {
    kicker: string;
    description: string;
    viewAllLabel: string;
    viewAllHref: string;
    benefits: { label: string; iconName: string }[];
    cards: {
      id: string;
      title: string;
      description: string;
      shortDescription: string;
      href: string;
      image: string;
      imageAlt: string;
      icon: string;
      order: number;
    }[];
  };
  statistics: {
    title: string;
    subtitle: string;
    viewAllLabel: string;
    viewAllHref: string;
    /** ⚠️ NEEDS_VERIFICATION — values are from Stitch HTML, not verified */
    stats: {
      id: string;
      iconName: "projects" | "publications" | "personnel" | "community";
      value: number;
      label: string;
      unit: string;
    }[];
  };
  researchList: {
    title: string;
    viewAllLabel: string;
    viewAllHref: string;
    featuredImage: string;
    featuredImageAlt: string;
    items: {
      id: string;
      thumbnail: string;
      thumbnailAlt: string;
      tag: string;
      title: string;
      researcher: string;
    }[];
  };
  newsList: {
    title: string;
    viewAllLabel: string;
    viewAllHref: string;
    featured: {
      image: string;
      imageAlt: string;
      title: string;
      date: string;
    };
    items: {
      id: string;
      thumbnail: string;
      thumbnailAlt: string;
      title: string;
      date: string;
    }[];
  };
  knowledgeResources: {
    title: string;
    description: string;
    resources: {
      id: string;
      iconName:
        | "search"
        | "document"
        | "book"
        | "journal"
        | "video";
      title: string;
      description: string;
      href: string;
    }[];
  };
  partners: {
    title: string;
    subtitle: string;
    items: PartnerItem[];
  };
  footer: {
    logoAlt: string;
    organizationName: string;
    universityName: string;
    address: string;
    phone: string;
    email: string;
    columns: {
      title: string;
      links: { label: string; href: string }[];
    }[];
    socialLinks: {
      platform: "facebook" | "line" | "youtube";
      href: string;
    }[];
    newsletterPlaceholder: string;
    newsletterButtonLabel: string;
    copyright: string;
    legalLinks: { label: string; href: string }[];
  };
};

export const stitchLanding: Record<Locale, StitchLandingContent> = {
  th: {
    lang: "th",

    topBar: {
      loginLabel: "เข้าสู่ระบบสำหรับบุคลากร",
      loginHref: "#",
      altLocaleLabel: "English",
      altLocaleHref: "#",
    },

    nav: {
      logoAlt: "RAE Logo",
      siteName: "RAE",
      siteSubtitle: "สำนักวิจัยและส่งเสริมวิชาการการเกษตร มหาวิทยาลัยแม่โจ้",
      links: [
        { label: "หน้าหลัก", href: "#", isActive: true },
        { label: "เกี่ยวกับเรา", href: "#" },
        { label: "วิจัยและนวัตกรรม", href: "#" },
        { label: "บริการวิชาการ", href: "#" },
        { label: "เอกสารเผยแพร่", href: "#" },
        { label: "ข่าวสารและกิจกรรม", href: "#" },
      ],
      searchPlaceholder: "ค้นหา...",
      quickAccessLabel: "Quick Access",
    },

    hero: {
      backgroundImage: "/images/stitch-v6/hero-background.jpg",
      headlineBeforeGold: "สร้างองค์ความรู้ สู่นวัตกรรมเกษตร",
      headlineGold: "เพื่อชุมชน",
      headlineAfterGold: "และสังคมที่ยั่งยืน",
      paragraph:
        "มุ่งมั่นด้านการวิจัย ส่งเสริมวิชาการ และบริการวิชาการด้านการเกษตร เพื่อพัฒนาเศรษฐกิจ สังคม และสิ่งแวดล้อมอย่างยั่งยืน",
      primaryCta: { label: "เกี่ยวกับเรา", href: "#" },
      secondaryCta: { label: "บริการของเรา", href: "#" },
    },

    services: {
      kicker: "OUR SERVICES",
      description: "บริการวิชาการและการถ่ายทอดองค์ความรู้สู่สังคม",
      viewAllLabel: "ดูทั้งหมด",
      viewAllHref: "#",
      benefits: [
        { label: "ผู้เชี่ยวชาญมืออาชีพ", iconName: "professional" },
        { label: "มาตรฐานระดับสากล", iconName: "standard" },
        { label: "ยั่งยืนและเป็นมิตรต่อสิ่งแวดล้อม", iconName: "sustainable" },
        { label: "ร่วมมือเพื่ออนาคต", iconName: "collaboration" },
      ],
      cards: [
        {
          id: "svc-1",
          title: "โครงการพระราชดำริและเศรษฐกิจพอเพียง",
          description: "พัฒนาแหล่งเรียนรู้และโครงการต้นแบบด้านเกษตรผสมผสาน เกษตรอินทรีย์ และการพัฒนาชุมชนตามหลักปรัชญาของเศรษฐกิจพอเพียง",
          shortDescription: "แหล่งเรียนรู้และต้นแบบเกษตรพอเพียง",
          image: "/images/stitch-v6/knowledge-ecosystem.jpg",
          imageAlt: "โครงการพระราชดำริและเกษตรพอเพียง",
          icon: "Sprout",
          href: "/services/royal-initiatives",
          order: 1,
        },
        {
          id: "svc-2",
          title: "ศูนย์เกษตรอินทรีย์แม่โจ้",
          description: "ศูนย์กลางองค์ความรู้ นวัตกรรม การฝึกอบรมระบบรับรองแบบมีส่วนร่วม PGS และการส่งเสริมช่องทางการตลาดสินค้าอินทรีย์",
          shortDescription: "องค์ความรู้และตลาดเกษตรอินทรีย์",
          image: "/images/stitch-v6/integrated-research.jpg",
          imageAlt: "ศูนย์เกษตรอินทรีย์แม่โจ้",
          icon: "Leaf",
          href: "/services/organic-center",
          order: 2,
        },
        {
          id: "svc-3",
          title: "ศูนย์ทดสอบ วิจัยและพัฒนากัญชง",
          description: "ดำเนินงานด้านการทดสอบ วิจัย พัฒนา ถ่ายทอดองค์ความรู้ ฝึกอบรม ศึกษาดูงาน และต่อยอดผลิตภัณฑ์จากกัญชง",
          shortDescription: "วิจัย ถ่ายทอด และต่อยอดผลิตภัณฑ์กัญชง",
          image: "/images/stitch-v6/research-excellence.jpg",
          imageAlt: "ศูนย์ทดสอบ วิจัยและพัฒนากัญชง",
          icon: "Microscope",
          href: "/services/hemp-research",
          order: 3,
        },
        {
          id: "svc-4",
          title: "ส่งเสริมอาชีพและคลินิกเทคโนโลยี",
          description: "นำองค์ความรู้ไปแก้ไขปัญหา พัฒนาอาชีพ และให้คำปรึกษาแก่ชุมชน เกษตรกร และกลุ่มเป้าหมายผ่านฐานเรียนรู้และคลินิกเทคโนโลยี",
          shortDescription: "ให้คำปรึกษาและพัฒนาอาชีพชุมชน",
          image: "/images/stitch-v6/farmer-engagement.jpg",
          imageAlt: "การส่งเสริมอาชีพและคลินิกเทคโนโลยี",
          icon: "UsersRound",
          href: "/services/community-career",
          order: 4,
        },
        {
          id: "svc-5",
          title: "ถ่ายทอดเทคโนโลยีและผลิตภัณฑ์วิจัย",
          description: "ถ่ายทอดเทคโนโลยี จัดหลักสูตรฝึกอบรม และจำหน่ายผลผลิต สายพันธุ์ดี วัสดุปลูก และผลิตภัณฑ์จากงานวิจัยภายใต้แบรนด์ MORE",
          shortDescription: "อบรม ถ่ายทอด และต่อยอดผลิตภัณฑ์วิจัย",
          image: "/images/stitch-v6/knowledge-transfer.jpg",
          imageAlt: "การถ่ายทอดเทคโนโลยีและผลิตภัณฑ์วิจัย",
          icon: "PackageCheck",
          href: "/services/technology-transfer",
          order: 5,
        },
      ],
    },

    statistics: {
      title: "ผลงานและสถิติ",
      subtitle: "(ข้อมูลโดยสังเขป)",
      viewAllLabel: "ดูสถิติทั้งหมด",
      viewAllHref: "#",
      // ⚠️ NEEDS_VERIFICATION — values from Stitch HTML, not independently verified
      stats: [
        {
          id: "stat-1",
          iconName: "projects",
          value: 586,
          label: "งานวิจัยที่ดำเนินการ",
          unit: "โครงการ",
        },
        {
          id: "stat-2",
          iconName: "publications",
          value: 1248,
          label: "ผลงานตีพิมพ์",
          unit: "เรื่อง",
        },
        {
          id: "stat-3",
          iconName: "personnel",
          value: 124,
          label: "นักวิจัยและบุคลากร",
          unit: "คน",
        },
        {
          id: "stat-4",
          iconName: "community",
          value: 8732,
          label: "ชุมชนที่ได้รับประโยชน์",
          unit: "คน",
        },
      ],
    },

    researchList: {
      title: "งานวิจัยและนวัตกรรมเด่น",
      viewAllLabel: "ดูทั้งหมด",
      viewAllHref: "#",
      featuredImage: "/images/stitch-v6/integrated-research.jpg",
      featuredImageAlt: "Robotic arm in greenhouse",
      items: [
        {
          id: "research-1",
          thumbnail: "/images/stitch-v6/research-excellence.jpg",
          thumbnailAlt: "Greenhouse",
          tag: "นวัตกรรม",
          title: "ระบบปลูกพืชอัจฉริยะในโรงเรือนควบคุมอัตโนมัติ",
          researcher: "รศ.ดร.สมชาย โชติ และคณะ",
        },
        {
          id: "research-2",
          thumbnail: "/images/stitch-v6/knowledge-transfer.jpg",
          thumbnailAlt: "Rice field",
          tag: "พืชและเทคโนโลยีการผลิต",
          title: "การพัฒนาพันธุ์ข้าวหอมคุณภาพทนแล้ง",
          researcher: "ผศ.ดร.นฤมล พรมจง และคณะ",
        },
        {
          id: "research-3",
          thumbnail: "/images/stitch-v6/farmer-engagement.jpg",
          thumbnailAlt: "Microscope",
          tag: "สัตว์และเทคโนโลยีชีวภาพ",
          title: "โปรไบโอติกจากจุลินทรีย์ท้องถิ่นเพื่อสุขภาพสัตว์",
          researcher: "ดร.วราภรณ์ ชัยเชษฐ์ และคณะ",
        },
      ],
    },

    newsList: {
      title: "ข่าวสารและกิจกรรม",
      viewAllLabel: "ดูทั้งหมด",
      viewAllHref: "#",
      featured: {
        image: "/images/stitch-v6/news-featured.jpg",
        imageAlt: "MOU Signing",
        title:
          "พิธีลงนามบันทึกข้อตกลงความร่วมมือด้านวิจัยและนวัตกรรมกับหน่วยงานภาคเครือข่าย",
        date: "20 พฤษภาคม 2567",
      },
      items: [
        {
          id: "news-1",
          thumbnail: "/images/stitch-v6/research-to-community.jpg",
          thumbnailAlt: "Training",
          title:
            'อบรมเชิงปฏิบัติการ "เทคโนโลยีการผลิตพืชปลอดภัย" สำหรับเกษตรกรยุคใหม่',
          date: "15 พฤษภาคม 2567",
        },
        {
          id: "news-2",
          thumbnail: "/images/stitch-v6/community-impact.jpg",
          thumbnailAlt: "Conference",
          title: "ประชุมวิชาการระดับชาติ มหาวิทยาลัยแม่โจ้ ครั้งที่ 10",
          date: "10 พฤษภาคม 2567",
        },
        {
          id: "news-3",
          thumbnail: "/images/stitch-v6/academic-services.jpg",
          thumbnailAlt: "Field work",
          title:
            "ลงพื้นที่ติดตามผลการดำเนินงานโครงการยกระดับคุณภาพชีวิตชุมชน",
          date: "5 พฤษภาคม 2567",
        },
      ],
    },

    knowledgeResources: {
      title: "แหล่งองค์ความรู้",
      description: "เข้าถึงองค์ความรู้และเอกสารเผยแพร่ด้านการเกษตร",
      resources: [
        {
          id: "kr-1",
          iconName: "search",
          title: "ฐานข้อมูลงานวิจัย",
          description: "ค้นหาและสืบค้นงานวิจัย",
          href: "#",
        },
        {
          id: "kr-2",
          iconName: "document",
          title: "เอกสารเผยแพร่",
          description: "รายงานวิจัย คู่มือ แนวทาง",
          href: "#",
        },
        {
          id: "kr-3",
          iconName: "book",
          title: "คลังความรู้การเกษตร",
          description: "องค์ความรู้ เทคโนโลยี",
          href: "#",
        },
        {
          id: "kr-4",
          iconName: "journal",
          title: "วารสารและสิ่งพิมพ์",
          description: "วารสารวิชาการ ออนไลน์",
          href: "#",
        },
        {
          id: "kr-5",
          iconName: "video",
          title: "สื่อและมัลติมีเดีย",
          description: "วิดีโอ สื่อการสอน Infographic",
          href: "#",
        },
      ],
    },

    partners: {
      title: "หน่วยงานและเครือข่ายความร่วมมือ",
      subtitle: "เครือข่ายความร่วมมือด้านการวิจัยและวิชาการกับหน่วยงานชั้นนำ",
      items: [
        { id: "p7", nameTh: "มหาวิทยาลัยแม่โจ้", nameEn: "Maejo University", shortName: "MJU", logo: "/assets/partners/maejo.png", type: "มหาวิทยาลัย" },
        { id: "p1", nameTh: "มหาวิทยาลัยเชียงใหม่", nameEn: "Chiang Mai University", shortName: "CMU", logo: "/assets/partners/cmu.png", type: "มหาวิทยาลัย" },
        { id: "p2", nameTh: "กรมวิชาการเกษตร", nameEn: "Department of Agriculture", shortName: "DOA", logo: "/assets/partners/doa.png", type: "หน่วยงานรัฐ" },
        { id: "p3", nameTh: "สำนักงานพัฒนาวิทยาศาสตร์และเทคโนโลยีแห่งชาติ", nameEn: "National Science and Technology Development Agency", shortName: "NSTDA", logo: "/assets/partners/nstda.svg", type: "หน่วยงานวิจัย" },
        { id: "p4", nameTh: "มหาวิทยาลัยเกษตรศาสตร์", nameEn: "Kasetsart University", shortName: "KU", logo: "/assets/partners/ku.svg", type: "มหาวิทยาลัย" },
        { id: "p6", nameTh: "สำนักงานการวิจัยแห่งชาติ", nameEn: "National Research Council of Thailand", shortName: "NRCT", logo: "/assets/partners/nrct.png", type: "หน่วยงานวิจัย" },
        { id: "p5", nameTh: "สำนักงานคณะกรรมการส่งเสริมวิทยาศาสตร์ วิจัยและนวัตกรรม", nameEn: "Thailand Science Research and Innovation", shortName: "TSRI", logo: "/assets/partners/tsri.png", type: "หน่วยงานวิจัย" },
        { id: "p8", nameTh: "ภาคีเครือข่ายภาคเอกชนและชุมชน", nameEn: "Private Sector & Community Partners", shortName: "เอกชน", type: "เครือข่าย" },
      ],
    },

    footer: {
      logoAlt: "RAE Logo",
      organizationName: "สำนักวิจัยและส่งเสริมวิชาการการเกษตร",
      universityName: "มหาวิทยาลัยแม่โจ้",
      address:
        "63 หมู่ 4 ตำบลหนองหาร อำเภอสันทราย จังหวัดเชียงใหม่ 50290",
      phone: "0 5387 3400",
      email: "rae@mju.ac.th",
      columns: [
        {
          title: "เมนูหลัก",
          links: [
            { label: "เกี่ยวกับเรา", href: "#" },
            { label: "วิจัยและนวัตกรรม", href: "#" },
            { label: "บริการวิชาการ", href: "#" },
            { label: "องค์ความรู้", href: "#" },
            { label: "เอกสารเผยแพร่", href: "#" },
            { label: "ข่าวสารและกิจกรรม", href: "#" },
            { label: "ติดต่อเรา", href: "#" },
          ],
        },
        {
          title: "บริการยอดนิยม",
          links: [
            { label: "บริการตรวจวิเคราะห์", href: "#" },
            { label: "บริการอบรมและถ่ายทอด", href: "#" },
            { label: "ให้คำปรึกษาและแนะนำ", href: "#" },
            { label: "ฐานข้อมูลงานวิจัย", href: "#" },
            { label: "คลังความรู้การเกษตร", href: "#" },
          ],
        },
      ],
      socialLinks: [
        { platform: "facebook", href: "#" },
        { platform: "line", href: "#" },
        { platform: "youtube", href: "#" },
      ],
      newsletterPlaceholder: "อีเมลของคุณ",
      newsletterButtonLabel: "สมัครรับข่าวสาร",
      copyright:
        "© 2024 Office of Agricultural Research and Extension, Maejo University. All Rights Reserved.",
      legalLinks: [
        { label: "นโยบายความเป็นส่วนตัว", href: "#" },
        { label: "เงื่อนไขการใช้งาน", href: "#" },
        { label: "แผนผังเว็บไซต์", href: "#" },
      ],
    },
  },
  en: {
    lang: "en",
    // English content maps same structure with translated labels
    topBar: {
      loginLabel: "Staff Login",
      loginHref: "#",
      altLocaleLabel: "ไทย",
      altLocaleHref: "#",
    },
    nav: {
      logoAlt: "RAE Logo",
      siteName: "RAE",
      siteSubtitle: "Office of Agricultural Research and Extension Maejo University",
      links: [
        { label: "Home", href: "#", isActive: true },
        { label: "About Us", href: "#" },
        { label: "Research & Innovation", href: "#" },
        { label: "Academic Services", href: "#" },
        { label: "Publications", href: "#" },
        { label: "News & Events", href: "#" },
      ],
      searchPlaceholder: "Search...",
      quickAccessLabel: "Quick Access",
    },
    hero: {
      backgroundImage: "/images/stitch-v6/hero-background.jpg",
      headlineBeforeGold: "Building Knowledge, Agricultural Innovation",
      headlineGold: "for Community",
      headlineAfterGold: "and Sustainable Society",
      paragraph:
        "Committed to research, academic extension, and agricultural services for sustainable economic, social, and environmental development.",
      primaryCta: { label: "About Us", href: "#" },
      secondaryCta: { label: "Our Services", href: "#" },
    },
    services: {
      kicker: "OUR SERVICES",
      description: "Academic services and knowledge transfer to society",
      viewAllLabel: "View All",
      viewAllHref: "#",
      benefits: [
        { label: "Professional Experts", iconName: "professional" },
        { label: "International Standards", iconName: "standard" },
        { label: "Sustainable & Eco-Friendly", iconName: "sustainable" },
        { label: "Collaborating for the Future", iconName: "collaboration" },
      ],
      cards: [
        { id: "svc-1", title: "Royal Initiatives & Sufficiency Economy", description: "Learning centers and demonstration projects for integrated farming, organic agriculture, and community development based on the Sufficiency Economy Philosophy.", shortDescription: "Learning centers for sustainable agriculture", image: "/images/stitch-v6/knowledge-ecosystem.jpg", imageAlt: "Royal initiatives and sufficiency economy", icon: "Sprout", href: "/services/royal-initiatives", order: 1 },
        { id: "svc-2", title: "Maejo Organic Agriculture Center", description: "Knowledge hub for organic innovation, PGS participatory guarantee system training, and organic product market channel development.", shortDescription: "Organic knowledge and market hub", image: "/images/stitch-v6/integrated-research.jpg", imageAlt: "Maejo Organic Agriculture Center", icon: "Leaf", href: "/services/organic-center", order: 2 },
        { id: "svc-3", title: "Hemp Testing Research & Development Center", description: "Hemp variety testing, research, development, knowledge transfer, training, study visits, and hemp product commercialization.", shortDescription: "Hemp research and product development", image: "/images/stitch-v6/research-excellence.jpg", imageAlt: "Hemp Testing Research and Development Center", icon: "Microscope", href: "/services/hemp-research", order: 3 },
        { id: "svc-4", title: "Community Career Promotion & Technology Clinic", description: "Delivering knowledge to solve problems, develop careers, and provide consulting to communities and farmers through learning centers and technology clinics.", shortDescription: "Career consulting for communities", image: "/images/stitch-v6/farmer-engagement.jpg", imageAlt: "Community career promotion and technology clinic", icon: "UsersRound", href: "/services/community-career", order: 4 },
        { id: "svc-5", title: "Technology Transfer & Research Products", description: "Technology transfer, specialized training courses, distribution of agricultural products, premium seeds, planting materials, and MORE brand research products.", shortDescription: "Training and research product commercialization", image: "/images/stitch-v6/knowledge-transfer.jpg", imageAlt: "Technology transfer and research products", icon: "PackageCheck", href: "/services/technology-transfer", order: 5 },
      ],
    },
    statistics: {
      title: "Our Impact",
      subtitle: "(Overview)",
      viewAllLabel: "View All Statistics",
      viewAllHref: "#",
      stats: [
        { id: "stat-1", iconName: "projects", value: 586, label: "Research Projects", unit: "projects" },
        { id: "stat-2", iconName: "publications", value: 1248, label: "Publications", unit: "papers" },
        { id: "stat-3", iconName: "personnel", value: 124, label: "Researchers & Staff", unit: "people" },
        { id: "stat-4", iconName: "community", value: 8732, label: "Community Beneficiaries", unit: "people" },
      ],
    },
    researchList: {
      title: "Featured Research & Innovation",
      viewAllLabel: "View All",
      viewAllHref: "#",
      featuredImage: "/images/stitch-v6/integrated-research.jpg",
      featuredImageAlt: "Robotic arm in greenhouse",
      items: [
        { id: "research-1", thumbnail: "/images/stitch-v6/research-excellence.jpg", thumbnailAlt: "Greenhouse", tag: "Innovation", title: "Smart Greenhouse Automated Cultivation System", researcher: "Assoc. Prof. Dr. Somchai Chote et al." },
        { id: "research-2", thumbnail: "/images/stitch-v6/knowledge-transfer.jpg", thumbnailAlt: "Rice field", tag: "Plant Technology", title: "Drought-Resistant Aromatic Rice Variety Development", researcher: "Asst. Prof. Dr. Naruemon Promjong et al." },
        { id: "research-3", thumbnail: "/images/stitch-v6/farmer-engagement.jpg", thumbnailAlt: "Microscope", tag: "Animal Biotechnology", title: "Local Microbial Probiotics for Animal Health", researcher: "Dr. Waraporn Chaichet et al." },
      ],
    },
    newsList: {
      title: "News & Events",
      viewAllLabel: "View All",
      viewAllHref: "#",
      featured: { image: "/images/stitch-v6/news-featured.jpg", imageAlt: "MOU Signing", title: "MOU Signing Ceremony for Research and Innovation Cooperation with Network Partners", date: "May 20, 2024" },
      items: [
        { id: "news-1", thumbnail: "/images/stitch-v6/research-to-community.jpg", thumbnailAlt: "Training", title: 'Workshop: "Safe Agricultural Production Technology" for Modern Farmers', date: "May 15, 2024" },
        { id: "news-2", thumbnail: "/images/stitch-v6/community-impact.jpg", thumbnailAlt: "Conference", title: "Maejo University National Academic Conference No. 10", date: "May 10, 2024" },
        { id: "news-3", thumbnail: "/images/stitch-v6/academic-services.jpg", thumbnailAlt: "Field work", title: "Field Monitoring for Community Quality of Life Improvement Project", date: "May 5, 2024" },
      ],
    },
    knowledgeResources: {
      title: "Knowledge Resources",
      description: "Access agricultural knowledge and publications",
      resources: [
        { id: "kr-1", iconName: "search", title: "Research Database", description: "Search and browse research", href: "#" },
        { id: "kr-2", iconName: "document", title: "Publications", description: "Research reports, manuals, guides", href: "#" },
        { id: "kr-3", iconName: "book", title: "Agricultural Knowledge", description: "Knowledge and technology", href: "#" },
        { id: "kr-4", iconName: "journal", title: "Journals", description: "Academic journals online", href: "#" },
        { id: "kr-5", iconName: "video", title: "Media & Multimedia", description: "Videos, tutorials, infographics", href: "#" },
      ],
    },
    partners: {
      title: "Partner Organizations & Networks",
      subtitle: "Collaboration network with leading research and academic institutions",
      items: [
        { id: "p7", nameTh: "มหาวิทยาลัยแม่โจ้", nameEn: "Maejo University", shortName: "MJU", logo: "/assets/partners/maejo.png", type: "University" },
        { id: "p1", nameTh: "มหาวิทยาลัยเชียงใหม่", nameEn: "Chiang Mai University", shortName: "CMU", logo: "/assets/partners/cmu.png", type: "University" },
        { id: "p2", nameTh: "กรมวิชาการเกษตร", nameEn: "Department of Agriculture", shortName: "DOA", logo: "/assets/partners/doa.png", type: "Government" },
        { id: "p3", nameTh: "สำนักงานพัฒนาวิทยาศาสตร์และเทคโนโลยีแห่งชาติ", nameEn: "National Science and Technology Development Agency", shortName: "NSTDA", logo: "/assets/partners/nstda.svg", type: "Research" },
        { id: "p4", nameTh: "มหาวิทยาลัยเกษตรศาสตร์", nameEn: "Kasetsart University", shortName: "KU", logo: "/assets/partners/ku.svg", type: "University" },
        { id: "p6", nameTh: "สำนักงานการวิจัยแห่งชาติ", nameEn: "National Research Council of Thailand", shortName: "NRCT", logo: "/assets/partners/nrct.png", type: "Research" },
        { id: "p5", nameTh: "สำนักงานคณะกรรมการส่งเสริมวิทยาศาสตร์ วิจัยและนวัตกรรม", nameEn: "Thailand Science Research and Innovation", shortName: "TSRI", logo: "/assets/partners/tsri.png", type: "Research" },
        { id: "p8", nameTh: "ภาคีเครือข่ายภาคเอกชนและชุมชน", nameEn: "Private Sector & Community Partners", shortName: "Private", type: "Network" },
      ],
    },
    footer: {
      logoAlt: "RAE Logo",
      organizationName: "Office of Agricultural Research and Extension",
      universityName: "Maejo University",
      address: "63 Moo 4, Tambon Nong Han, Amphoe San Sai, Chiang Mai 50290",
      phone: "0 5387 3400",
      email: "rae@mju.ac.th",
      columns: [
        {
          title: "Main Menu",
          links: [
            { label: "About Us", href: "#" },
            { label: "Research & Innovation", href: "#" },
            { label: "Academic Services", href: "#" },
            { label: "Knowledge Base", href: "#" },
            { label: "Publications", href: "#" },
            { label: "News & Events", href: "#" },
            { label: "Contact Us", href: "#" },
          ],
        },
        {
          title: "Popular Services",
          links: [
            { label: "Analytical Services", href: "#" },
            { label: "Training & Extension", href: "#" },
            { label: "Consulting Services", href: "#" },
            { label: "Research Database", href: "#" },
            { label: "Agricultural Knowledge", href: "#" },
          ],
        },
      ],
      socialLinks: [
        { platform: "facebook", href: "#" },
        { platform: "line", href: "#" },
        { platform: "youtube", href: "#" },
      ],
      newsletterPlaceholder: "Your email",
      newsletterButtonLabel: "Subscribe",
      copyright:
        "© 2024 Office of Agricultural Research and Extension, Maejo University. All Rights Reserved.",
      legalLinks: [
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Use", href: "#" },
        { label: "Sitemap", href: "#" },
      ],
    },
  },
};
