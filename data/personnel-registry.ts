import type { PersonnelRecord } from "@/data/content-models";
import { ORG_NAME_EN, ORG_NAME_TH } from "@/lib/org-names";

/**
 * Leadership and internal units (static). Director and telephone numbers follow
 * public pages of มหาวิทยาลัยแม่โจ้ / สำนักวิจัยฯ (as of site publication).
 */
export const personnelRegistry: PersonnelRecord[] = [
  {
    name: "ผู้ช่วยศาสตราจารย์ ดร. ณัฐพล เลาห์รอดพันธุ์",
    role: "ผู้อำนวยการ",
    department: ORG_NAME_TH,
    contact:
      "โทรศัพท์: 0 5387 3405 (อ้างอิงรายชื่อผู้อำนวยการสำนัก มหาวิทยาลัยแม่โจ้) · เว็บไซต์สำนักฯ: rae.mju.ac.th",
    translation_en: {
      name: "Asst. Prof. Dr. Nattapol Laorodphan",
      role: "Director",
      department: ORG_NAME_EN,
      contact: "Tel. +66 53 873 405 (listed on Maejo University “Office Directors”) · Office site: rae.mju.ac.th",
    },
  },
  {
    name: "กองบริหารงานวิจัย",
    role: "หน่วยงานด้านการบริหารงานวิจัย",
    department: ORG_NAME_TH,
    contact: "โทรศัพท์: 0 5387 3400 (สำนักงานสำนักวิจัยฯ)",
    translation_en: {
      name: "Research Administration Division",
      role: "Research administration",
      department: ORG_NAME_EN,
      contact: "Tel. +66 53 873 400 (main office, OARE)",
    },
  },
  {
    name: "กองบริหารงานสำนักวิจัยฯ",
    role: "หน่วยงานด้านธุรการ การเงิน และสารสนเทศ",
    department: ORG_NAME_TH,
    contact: "โทรศัพท์: 0 5387 3400 (สำนักงานสำนักวิจัยฯ)",
    translation_en: {
      name: "OARE Administration Division",
      role: "Administration, finance, and information",
      department: ORG_NAME_EN,
      contact: "Tel. +66 53 873 400 (main office, OARE)",
    },
  },
  {
    name: "กองบริหารงานบริการวิชาการ",
    role: "หน่วยงานด้านประสานงานบริการวิชาการ",
    department: ORG_NAME_TH,
    contact: "โทรศัพท์: 0 5387 4293 (ตามประกาศกิจกรรมของสำนักฯ เช่น อบรม/ประสานงานบริการวิชาการ)",
    translation_en: {
      name: "Academic Services Division",
      role: "Academic services coordination",
      department: ORG_NAME_EN,
      contact: "Tel. +66 53 873 4293 (published on OARE notices for academic service activities)",
    },
  },
  {
    name: "ที่ตั้งสำนักงาน",
    role: "ติดต่อทั่วไป",
    department: ORG_NAME_TH,
    contact:
      "ชั้น 3 อาคารเฉลิมพระเกียรติสมเด็จพระเทพรัตนราชสุดา 63 หมู่ 4 ตำบลหนองหาร อำเภอสันทราย จังหวัดเชียงใหม่ 50290 · โทร. 0 5387 3400",
    translation_en: {
      name: "Office address",
      role: "General contact",
      department: ORG_NAME_EN,
      contact:
        "3rd floor, Chalerm Phra Kiet Somdet Phra Thepparat Ratchasuda Building, 63 Moo 4, Nong Han, Sansai, Chiang Mai 50290 · Tel. +66 53 873 400",
    },
  },
];
