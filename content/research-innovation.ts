/**
 * Research & Innovation — Section Data
 * Preview section for Stitch Landing V2
 * Future: expand into full Research Portal
 */

export type ResearchCard = {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  icon: string;
  image: string;
  imageAlt: string;
  href: string;
  order: number;
};

export type ResearchInnovationData = {
  titleTh: string;
  titleEn: string;
  subtitle: string;
  ctaLabel: string;
  ctaLabelEn: string;
  ctaHref: string;
  cards: ResearchCard[];
};

export const researchInnovation: ResearchInnovationData = {
  titleTh: "งานวิจัยและนวัตกรรม",
  titleEn: "Research & Innovation",
  subtitle:
    "ขับเคลื่อนงานวิจัย นวัตกรรม และความร่วมมือ เพื่อสร้างองค์ความรู้และผลกระทบต่อสังคมอย่างยั่งยืน",
  ctaLabel: "สำรวจงานวิจัยทั้งหมด",
  ctaLabelEn: "Explore Research",
  ctaHref: "/research",
  cards: [
    {
      id: "ri-1",
      title: "ยุทธศาสตร์และแผนวิจัย",
      titleEn: "Research Strategy",
      description: "กำหนดทิศทางและยุทธศาสตร์งานวิจัยให้สอดคล้องกับมหาวิทยาลัยและประเทศ",
      descriptionEn: "Define research direction and strategy aligned with university and national goals",
      icon: "Compass",
      image: "/images/stitch-v6/knowledge-ecosystem.jpg",
      imageAlt: "ยุทธศาสตร์และแผนวิจัย",
      href: "/research/strategy",
      order: 1,
    },
    {
      id: "ri-2",
      title: "ทุนวิจัย",
      titleEn: "Research Funding",
      description: "สนับสนุนการบริหารทุนวิจัยและการพัฒนาโครงการวิจัยทุกระดับ",
      descriptionEn: "Support research fund management and project development at all levels",
      icon: "HandCoins",
      image: "/images/stitch-v6/community-impact.jpg",
      imageAlt: "ทุนวิจัย",
      href: "/research/funding",
      order: 2,
    },
    {
      id: "ri-3",
      title: "ศูนย์วิจัยและความเป็นเลิศ",
      titleEn: "Research Centers",
      description: "เชื่อมโยงศูนย์วิจัย หน่วยวิจัย และศูนย์ความเป็นเลิศของมหาวิทยาลัย",
      descriptionEn: "Connect research centers, units, and excellence centers of the university",
      icon: "Building2",
      image: "/images/stitch-v6/integrated-research.jpg",
      imageAlt: "ศูนย์วิจัยและความเป็นเลิศ",
      href: "/research/centers",
      order: 3,
    },
    {
      id: "ri-4",
      title: "พัฒนาศักยภาพนักวิจัย",
      titleEn: "Research Capacity",
      description: "อบรม พัฒนา และสร้างเครือข่ายนักวิจัยสู่ระดับสากล",
      descriptionEn: "Train, develop, and build researcher networks to international standards",
      icon: "GraduationCap",
      image: "/images/stitch-v6/knowledge-transfer.jpg",
      imageAlt: "พัฒนาศักยภาพนักวิจัย",
      href: "/research/capacity",
      order: 4,
    },
    {
      id: "ri-5",
      title: "นวัตกรรมและการใช้ประโยชน์",
      titleEn: "Innovation",
      description: "ผลักดันผลงานวิจัยสู่การใช้ประโยชน์ เชิงพาณิชย์ และสังคม",
      descriptionEn: "Drive research outputs toward commercial and social utilization",
      icon: "Lightbulb",
      image: "/images/stitch-v6/research-excellence.jpg",
      imageAlt: "นวัตกรรมและการใช้ประโยชน์",
      href: "/research/innovation",
      order: 5,
    },
    {
      id: "ri-6",
      title: "เครือข่ายความร่วมมือ",
      titleEn: "Collaboration",
      description: "สร้างความร่วมมือกับหน่วยงานทั้งในประเทศและต่างประเทศ",
      descriptionEn: "Build partnerships with organizations both domestically and internationally",
      icon: "Handshake",
      image: "/images/stitch-v6/farmer-engagement.jpg",
      imageAlt: "เครือข่ายความร่วมมือ",
      href: "/research/collaboration",
      order: 6,
    },
  ],
};
