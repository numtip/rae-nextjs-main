import taxonomyJson from "../../../docs/document-center/taxonomy.json";
import registryJson from "./registry/document-registry.wtms-1920.partial.json";
import searchIndexJson from "./registry/search-index.wtms-1920.partial.json";
import type {
  DocumentCategory,
  DocumentRecord,
  DocumentStatus,
  DocumentRegistry,
  Taxonomy,
} from "./types";

const taxonomy = taxonomyJson as Taxonomy;

type PartialRegistryEntry = {
  id: string;
  title: string;
  category: string;
  folder: string;
  fileName: string;
  fileType: string;
  version: string;
  status: DocumentStatus;
  sourcePage?: string;
  sourceUrl?: string;
  storageProvider?: string;
  storageUrl?: string;
  updatedDate: string;
  owner: string;
  tags: string[];
  migrationBatch?: string;
  notes?: string;
};

type PartialSearchIndexEntry = {
  id: string;
  searchText: string;
};

const sourcePage = "https://rae.mju.ac.th/wtms_webpageDetail.aspx?wID=1920";
const registryEntries = registryJson as PartialRegistryEntry[];
const searchIndexEntries = searchIndexJson as PartialSearchIndexEntry[];
const searchTextById = new Map(
  searchIndexEntries.map((entry) => [entry.id, entry.searchText]),
);

function buildNote(entry: PartialRegistryEntry): string | undefined {
  const parts = [
    entry.notes,
    entry.sourcePage ? `sourcePage=${entry.sourcePage}` : undefined,
    entry.sourceUrl ? `sourceUrl=${entry.sourceUrl}` : undefined,
    entry.storageProvider ? `storageProvider=${entry.storageProvider}` : undefined,
  ].filter((part): part is string => Boolean(part));

  return parts.length > 0 ? parts.join(" | ") : undefined;
}

function normalizeRegistryEntry(entry: PartialRegistryEntry): DocumentRecord {
  return {
    id: entry.id,
    title: entry.title,
    category: entry.category,
    owner: entry.owner,
    file_type: entry.fileType.toLowerCase(),
    status: entry.status,
    updated_date: entry.updatedDate,
    onedrive_path: `${entry.folder}/${entry.fileName}`,
    storage_url: entry.storageUrl,
    tags: entry.tags,
    version: entry.version,
    visibility: entry.storageUrl ? "public" : "internal",
    note: buildNote(entry),
  };
}

const registry: DocumentRegistry = {
  version: "wtms-1920-partial-001",
  updated: "2026-06-17",
  source: sourcePage,
  documents: registryEntries.map(normalizeRegistryEntry),
};

export function isListableDocument(doc: DocumentRecord): boolean {
  return (
    doc.status === "current" &&
    (doc.visibility === "public" || doc.visibility === "internal")
  );
}

export function sortByUpdatedDateDesc(docs: DocumentRecord[]): DocumentRecord[] {
  return [...docs].sort((a, b) => b.updated_date.localeCompare(a.updated_date));
}

export function getEnabledCategories(): DocumentCategory[] {
  return taxonomy.categories
    .filter((c) => c.enabled)
    .sort((a, b) => a.sort_order - b.sort_order);
}

export function getCategoryById(id: string): DocumentCategory | undefined {
  return taxonomy.categories.find((c) => c.id === id);
}

export function getAllDocuments(): DocumentRecord[] {
  return registry.documents;
}

export function getDocumentSearchText(id: string): string {
  return searchTextById.get(id) ?? "";
}

export function getPublicDocuments(): DocumentRecord[] {
  return sortByUpdatedDateDesc(registry.documents.filter(isListableDocument));
}

export function getDocumentsByCategory(slug: string): DocumentRecord[] {
  return sortByUpdatedDateDesc(
    registry.documents.filter(
      (doc) => doc.category === slug && isListableDocument(doc),
    ),
  );
}

export function getDocumentById(id: string): DocumentRecord | undefined {
  return registry.documents.find((doc) => doc.id === id);
}

export function getRelatedDocuments(document: DocumentRecord): DocumentRecord[] {
  return sortByUpdatedDateDesc(
    registry.documents.filter(
      (doc) =>
        doc.id !== document.id &&
        doc.category === document.category &&
        isListableDocument(doc),
    ),
  ).slice(0, 4);
}

export function countDocumentsByCategory(slug: string): number {
  return getDocumentsByCategory(slug).length;
}

export function getRelatedCategories(
  category: DocumentCategory,
): DocumentCategory[] {
  const enabled = getEnabledCategories();
  return enabled.filter((c) => c.id !== category.id).slice(0, 3);
}

export function getDistinctFileTypes(): string[] {
  return [...new Set(registry.documents.map((d) => d.file_type))].sort();
}

export function getRegistryMeta(): Pick<DocumentRegistry, "version" | "updated" | "source"> {
  return {
    version: registry.version,
    updated: registry.updated,
    source: registry.source,
  };
}

export function getDocumentKpis() {
  const listable = getPublicDocuments();
  const categories = getEnabledCategories();
  const fileTypes = new Set(listable.map((d) => d.file_type));
  const latestDate =
    listable.length > 0
      ? listable.reduce((max, d) =>
          d.updated_date > max ? d.updated_date : max,
        listable[0].updated_date)
      : registry.updated;

  return {
    totalDocuments: listable.length,
    totalCategories: categories.length,
    latestUpdated: latestDate,
    fileTypeCount: fileTypes.size,
  };
}
