import { promises as fs } from "fs";
import path from "path";

const ROOT = "G:/ProjectAI/rae-nextjs-main";
const REGISTRY_JSON = path.join(ROOT, "src", "features", "document-center", "registry", "document-registry.wtms-1920.partial.json");
const SEARCH_JSON = path.join(ROOT, "src", "features", "document-center", "registry", "search-index.wtms-1920.partial.json");

function isNonEmpty(value) {
  return String(value ?? "").trim().length > 0;
}

function hostOf(url) {
  try {
    return new URL(url).host.toLowerCase();
  } catch {
    return "";
  }
}

function parseSharepointUrl(url) {
  return {
    isSharepoint: url.startsWith("https://maejo365-my.sharepoint.com/"),
    hasFolderPattern: /\/:f:\//i.test(url),
    host: hostOf(url),
  };
}

async function main() {
  const registry = JSON.parse(await fs.readFile(REGISTRY_JSON, "utf8"));
  const searchIndex = JSON.parse(await fs.readFile(SEARCH_JSON, "utf8"));
  const requiredFields = [
    "id",
    "title",
    "category",
    "folder",
    "fileName",
    "fileType",
    "version",
    "status",
    "storageProvider",
    "storageUrl",
    "owner",
  ];
  const duplicateTitles = [];
  const duplicateIds = [];
  const duplicateStorageUrls = [];
  const folderUrlWarnings = [];
  const hostWarnings = [];
  const missingFields = [];
  const seenIds = new Set();
  const seenUrls = new Set();
  const titleCounts = new Map();

  if (registry.length !== 11) {
    throw new Error(`Registry count must be 11, got ${registry.length}`);
  }
  if (searchIndex.length !== 11) {
    throw new Error(`Search index count must be 11, got ${searchIndex.length}`);
  }
  const registryIds = registry.map((item) => item.id);
  const searchIds = searchIndex.map((item) => item.id);
  if (registryIds.length !== searchIds.length || registryIds.some((id, i) => id !== searchIds[i])) {
    throw new Error("Search index IDs must exactly match registry IDs");
  }

  for (const item of registry) {
    for (const field of requiredFields) {
      if (!isNonEmpty(item[field])) {
        missingFields.push(`${item.id || "(no id)"}:${field}`);
      }
    }
    if (!isNonEmpty(item.storageUrl)) {
      throw new Error(`Blank storageUrl for ${item.id}`);
    }
    const parsed = parseSharepointUrl(item.storageUrl);
    if (!parsed.isSharepoint) {
      throw new Error(`storageUrl host outside maejo365-my.sharepoint.com for ${item.id}`);
    }
    if (parsed.hasFolderPattern) {
      throw new Error(`Folder share URL rejected for ${item.id}`);
    }
    if (seenIds.has(item.id)) {
      duplicateIds.push(item.id);
    }
    seenIds.add(item.id);
    if (seenUrls.has(item.storageUrl)) {
      duplicateStorageUrls.push(item.storageUrl);
    }
    seenUrls.add(item.storageUrl);
    titleCounts.set(item.title, (titleCounts.get(item.title) || 0) + 1);
    if (/\/:f:\//i.test(item.storageUrl)) folderUrlWarnings.push(item.storageUrl);
    if (hostOf(item.storageUrl) !== "maejo365-my.sharepoint.com") hostWarnings.push(item.storageUrl);
  }

  for (const [title, count] of titleCounts.entries()) {
    if (count > 1) duplicateTitles.push(`${title} (${count})`);
  }

  if (missingFields.length) throw new Error(`Missing registry fields: ${missingFields.join(", ")}`);
  if (duplicateIds.length) throw new Error(`Duplicate IDs: ${duplicateIds.join(", ")}`);
  if (duplicateStorageUrls.length) throw new Error(`Duplicate storage URLs: ${duplicateStorageUrls.length}`);

  console.log(JSON.stringify({
    registryCount: registry.length,
    searchIndexCount: searchIndex.length,
    duplicateTitleWarnings: duplicateTitles,
    folderUrlWarnings,
    hostWarnings,
    result: "PASS",
  }, null, 2));
}

main().catch((err) => {
  console.error(err && err.stack ? err.stack : String(err));
  process.exitCode = 1;
});
