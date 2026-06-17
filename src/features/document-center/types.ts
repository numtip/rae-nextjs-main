export type DocumentStatus = "current" | "obsolete" | "archived" | "draft";

export type DocumentVisibility = "public" | "internal" | "restricted";

export type DocumentFileType = string;

export interface DocumentCategory {
  id: string;
  name_th: string;
  name_en: string;
  folder: string;
  owner_group: string;
  description_th: string;
  sort_order: number;
  enabled: boolean;
}

export interface DocumentRecord {
  id: string;
  title: string;
  category: string;
  owner: string;
  file_type: DocumentFileType;
  status: DocumentStatus;
  updated_date: string;
  onedrive_path: string;
  storage_url?: string;
  tags: string[];
  version: string;
  visibility: DocumentVisibility;
  note?: string;
}

export interface Taxonomy {
  version: string;
  updated: string;
  categories: DocumentCategory[];
}

export interface DocumentRegistry {
  version: string;
  updated: string;
  source?: string;
  documents: DocumentRecord[];
}

export const DOCUMENT_STATUSES: DocumentStatus[] = [
  "current",
  "obsolete",
  "archived",
  "draft",
];

export const DOCUMENT_VISIBILITIES: DocumentVisibility[] = [
  "public",
  "internal",
  "restricted",
];

export const ID_PATTERN = /^RAE-DC-\d{4}$/;

export const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
