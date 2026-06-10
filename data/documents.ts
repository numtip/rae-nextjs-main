import type { DocumentRecord } from "@/data/content-models";
import { ORG_NAME_EN, ORG_NAME_TH } from "@/lib/org-names";

/**
 * Source of truth for Forms & Documents (static). File names/URLs are shipped in /public;
 * titles should track the “Forms & download” set published for OARE; replace PDFs in lockstep.
 */
export const documentRegistry: DocumentRecord[] = [
  {
    name: "แบบแจ้งโครงการวิจัยที่ต้องพิจารณาด้านจริยธรรมการวิจัยในคน",
    type: "PDF",
    category: "งานวิจัย",
    version: "1.2",
    file_url: "/documents/rae-research-ethics-notification.pdf",
    updated_at: "2025-11-04",
    translation_en: {
      name: "Notification form for human research ethics review",
      category: "Research",
    },
  },
  {
    name: `คำขอรับบริการวิชาการต่อ${ORG_NAME_TH}`,
    type: "PDF",
    category: "บริการวิชาการ",
    version: "2.0",
    file_url: "/documents/rae-academic-service-request.pdf",
    updated_at: "2026-01-15",
    translation_en: {
      name: `Request for academic services to ${ORG_NAME_EN}`,
      category: "Academic services",
    },
  },
  {
    name: "แบบตรวจสอบความครบถ้วนของเอกสารเบิกจ่ายงบวิจัย",
    type: "PDF",
    category: "การเงินและพัสดุ",
    version: "1.0",
    file_url: "/documents/rae-fund-disbursement-checklist.pdf",
    updated_at: "2025-08-22",
    translation_en: {
      name: "Checklist for research fund disbursement documents",
      category: "Finance & procurement",
    },
  },
  {
    name: "คู่มือการเตรียมเอกสารประกอบการจัดซื้อจัดจ้าง (ส่วนที่เกี่ยวกับงานสำนักฯ)",
    type: "PDF",
    category: "การเงินและพัสดุ",
    version: "1.1",
    file_url: "/documents/rae-procurement-documentation-guide.pdf",
    updated_at: "2025-12-01",
    translation_en: {
      name: `Guide to procurement documentation (sections relating to ${ORG_NAME_EN})`,
      category: "Finance & procurement",
    },
  },
  {
    name: "แบบฟอร์มบันทึกการประชุมคณะกรรมการโครงการวิจัย",
    type: "PDF",
    category: "งานวิจัย",
    version: "1.0",
    file_url: "/documents/rae-project-board-meeting-minutes.pdf",
    updated_at: "2026-02-10",
    translation_en: {
      name: "Research project board meeting minutes template",
      category: "Research",
    },
  },
];
