/** Shared content types (reconstructed from registry usage; not in production source maps). */

export type NewsTranslation = {
  title: string;
  summary: string;
  content: string;
  category: string;
  tags: string[];
};

export type NewsRecord = {
  title: string;
  summary: string;
  content: string;
  category: string;
  tags: string[];
  publish_date: string;
  status: string;
  translation_en?: NewsTranslation;
};

export type DocumentTranslation = {
  name: string;
  category: string;
};

export type DocumentRecord = {
  name: string;
  type: string;
  category: string;
  version: string;
  file_url: string;
  updated_at: string;
  translation_en?: DocumentTranslation;
};

export type ServiceTranslation = {
  name: string;
  description: string;
  steps: string[];
  contact_point: string;
};

export type ServiceRecord = {
  name: string;
  description: string;
  steps: string[];
  contact_point: string;
  translation_en: ServiceTranslation;
};

export type PersonnelTranslation = {
  name: string;
  role: string;
  department: string;
  contact: string;
};

export type PersonnelRecord = {
  name: string;
  role: string;
  department: string;
  contact: string;
  translation_en: PersonnelTranslation;
};

export type ServiceCard = {
  title: string;
  text: string;
  /** Internal route path (locale prefix applied at render) */
  path: string;
};
