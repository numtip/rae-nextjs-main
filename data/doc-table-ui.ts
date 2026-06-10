import type { Locale } from "@/lib/locale";

export const docTableLabels: Record<
  Locale,
  {
    registryTitle: string;
    registrySub: string;
    colName: string;
    colCategory: string;
    colType: string;
    colVersion: string;
    colUpdated: string;
    colFile: string;
    download: string;
  }
> = {
  th: {
    registryTitle: "รายการแบบฟอร์มและเอกสาร",
    registrySub:
      "แสดงเวอร์ชันและวันที่ปรับปรุงล่าสุดตามตารางรีจีสตรีบนเว็บไซต์นี้ — โปรดตรวจสอบชนิดไฟล์ก่อนดาวน์โหลด",
    colName: "ชื่อเอกสาร",
    colCategory: "หมวด",
    colType: "ชนิด",
    colVersion: "เวอร์ชัน",
    colUpdated: "ปรับปรุงล่าสุด",
    colFile: "ไฟล์",
    download: "ดาวน์โหลด",
  },
  en: {
    registryTitle: "Forms & documents registry",
    registrySub:
      "Version and last updated follow the on-site table — confirm the file type before downloading (see rae.mju.ac.th for signed originals if needed).",
    colName: "Title",
    colCategory: "Category",
    colType: "Type",
    colVersion: "Version",
    colUpdated: "Last updated",
    colFile: "File",
    download: "Download",
  },
};
