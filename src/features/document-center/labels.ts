import type { DocumentStatus, DocumentVisibility } from "./types";
import type { Locale } from "@/lib/locale";

export const statusLabels: Record<Locale, Record<DocumentStatus, string>> = {
  th: {
    current: "ฉบับปัจจุบัน",
    obsolete: "เลิกใช้แล้ว",
    archived: "เก็บถาวร",
    draft: "ร่าง",
  },
  en: {
    current: "Current",
    obsolete: "Obsolete",
    archived: "Archived",
    draft: "Draft",
  },
};

export const visibilityLabels: Record<
  Locale,
  Record<DocumentVisibility, string>
> = {
  th: {
    public: "สาธารณะ",
    internal: "ภายในองค์กร",
    restricted: "จำกัดสิทธิ์",
  },
  en: {
    public: "Public",
    internal: "Internal",
    restricted: "Restricted",
  },
};

export const uiLabels = {
  th: {
    heroTitle: "ศูนย์เอกสาร RAE",
    heroSubtitle:
      "ค้นหา ดาวน์โหลด และอ้างอิงเอกสารอย่างเป็นทางการ — ไฟล์จัดเก็บบน OneDrive",
    searchPlaceholder: "ค้นหาเอกสาร…",
    searchButton: "ค้นหา",
    categoriesTitle: "หมวดหมู่เอกสาร",
    featuredTitle: "เอกสารล่าสุด",
    allDocumentsTitle: "เอกสารทั้งหมด",
    viewAll: "ดูเอกสารทั้งหมด",
    helpTitle: "ต้องการความช่วยเหลือ?",
    helpText:
      "หากไม่พบเอกสารหรือลิงก์เสีย กรุณาติดต่อเจ้าของเอกสารหรือผู้ดูแลระบบ ไฟล์ไม่ได้จัดเก็บบนเว็บไซต์นี้",
    download: "ดาวน์โหลด",
    details: "รายละเอียด",
    documents: "เอกสาร",
    ownerGroup: "กลุ่มดูแล",
    relatedDocuments: "เอกสารที่เกี่ยวข้อง",
    relatedCategories: "หมวดหมู่ที่เกี่ยวข้อง",
    backToHub: "กลับศูนย์เอกสาร",
    noResults: "ไม่พบเอกสาร",
    noResultsHint: "ลองเปลี่ยนคำค้นหาหรือตัวกรอง หรือเลือกจากหมวดหมู่",
    clearFilters: "ล้างตัวกรอง",
    resultsCount: "ผลลัพธ์",
    kpiDocuments: "เอกสาร",
    kpiCategories: "หมวดหมู่",
    kpiLatest: "อัปเดตล่าสุด",
    kpiFileTypes: "ประเภทไฟล์",
    warningObsolete: "เอกสารฉบับนี้เลิกใช้แล้ว — โปรดใช้เอกสารฉบับใหม่ตามหมายเหตุ",
    warningArchived:
      "เอกสารนี้ถูกเก็บถาวรและอาจไม่เป็นฉบับปัจจุบัน",
    warningDraft:
      "เอกสารฉบับร่าง — ยังไม่เผยแพร่อย่างเป็นทางการ",
    warningRestricted:
      "เอกสารจำกัดสิทธิ์ — การดาวน์โหลดอาจต้องใช้สิทธิ์ OneDrive",
    warningNoLink: "ลิงก์ดาวน์โหลดไม่พร้อมใช้งาน — ติดต่อเจ้าของเอกสาร",
    emptyCategory: "ยังไม่มีเอกสารในหมวดหมู่นี้",
    filterCategory: "หมวดหมู่",
    filterFileType: "ประเภทไฟล์",
    filterStatus: "สถานะ",
    filterVisibility: "การมองเห็น",
    all: "ทั้งหมด",
    note: "หมายเหตุ",
    metadata: "ข้อมูลเอกสาร",
    documentId: "รหัสเอกสาร",
    owner: "เจ้าของเอกสาร",
    version: "ฉบับที่",
    updated: "วันที่ปรับปรุง",
    onedrivePath: "ที่เก็บ OneDrive",
  },
  en: {
    heroTitle: "RAE Document Center",
    heroSubtitle:
      "Find, download, and reference official documents — files stored on OneDrive",
    searchPlaceholder: "Search documents…",
    searchButton: "Search",
    categoriesTitle: "Document categories",
    featuredTitle: "Recent documents",
    allDocumentsTitle: "All documents",
    viewAll: "View all documents",
    helpTitle: "Need help?",
    helpText:
      "If a document is missing or a link is broken, contact the document owner or system administrator. Files are not stored on this website.",
    download: "Download",
    details: "Details",
    documents: "documents",
    ownerGroup: "Owner group",
    relatedDocuments: "Related documents",
    relatedCategories: "Related categories",
    backToHub: "Back to document center",
    noResults: "No documents found",
    noResultsHint: "Try different keywords or filters, or browse by category",
    clearFilters: "Clear filters",
    resultsCount: "Results",
    kpiDocuments: "Documents",
    kpiCategories: "Categories",
    kpiLatest: "Latest update",
    kpiFileTypes: "File types",
    warningObsolete:
      "This document is obsolete — please use the newer version noted below",
    warningArchived: "This document is archived and may not be current",
    warningDraft: "Draft document — not officially published",
    warningRestricted:
      "Restricted document — download may require OneDrive permissions",
    warningNoLink: "Download link unavailable — contact document owner",
    emptyCategory: "No documents in this category yet",
    filterCategory: "Category",
    filterFileType: "File type",
    filterStatus: "Status",
    filterVisibility: "Visibility",
    all: "All",
    note: "Note",
    metadata: "Document metadata",
    documentId: "Document ID",
    owner: "Owner",
    version: "Version",
    updated: "Last updated",
    onedrivePath: "OneDrive path",
  },
} as const;
