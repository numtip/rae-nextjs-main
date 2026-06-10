/**
 * CSV file loader for the Research Analytics platform.
 *
 * Reads the a3.csv export file, parses it, and returns
 * a normalized ResearchDataset. Uses a global singleton cache
 * so the CSV is only parsed once per process lifetime.
 */

import * as fs from "node:fs";
import * as path from "node:path";
import Papa from "papaparse";
import { parseRow, normalizeRows } from "@/lib/csv/normalizer";
import { dataCache } from "@/lib/cache";
import { CSV_DATA_DIR, CSV_DATA_FILE, CACHE_TTL } from "@/lib/constants";
import type { ResearchDataset } from "@/lib/data/models";

/** Determine the CSV file path, preferring a provided path or the default. */
function resolveCsvPath(customPath?: string): string {
  if (customPath) return path.resolve(customPath);
  // Try from process.cwd() first (dev / build time)
  const defaultPath = path.resolve(process.cwd(), CSV_DATA_DIR, CSV_DATA_FILE);
  if (fs.existsSync(defaultPath)) return defaultPath;
  // Fallback: check exports/ directory
  const fallback = path.resolve(process.cwd(), "exports", "a3.csv");
  if (fs.existsSync(fallback)) return fallback;
  return defaultPath;
}

/** Error thrown when CSV source is not found. */
export class CsvNotFoundError extends Error {
  constructor(filePath: string) {
    super(`CSV data file not found: ${filePath}. Ensure a3.csv is placed in data/research/ or exports/.`);
    this.name = "CsvNotFoundError";
  }
}

/** Error thrown when CSV parsing fails. */
export class CsvParseError extends Error {
  constructor(message: string) {
    super(`CSV parse error: ${message}`);
    this.name = "CsvParseError";
  }
}

/**
 * Load and parse the Research CSV dataset.
 *
 * Results are cached for the lifetime of the process. Call this
 * function from API routes and server components to get the dataset.
 */
export async function loadResearchData(customPath?: string): Promise<ResearchDataset> {
  const cacheKey = "research:dataset";
  const cached = dataCache.get<ResearchDataset>(cacheKey);
  if (cached) return cached;

  const filePath = resolveCsvPath(customPath);

  if (!fs.existsSync(filePath)) {
    if (customPath) {
      throw new CsvNotFoundError(filePath);
    }
    // If default paths fail, try relative fallback
    const altPath = path.resolve(process.cwd(), "../../exports/a3.csv");
    if (fs.existsSync(altPath)) {
      return loadResearchData(altPath);
    }
    throw new CsvNotFoundError(filePath);
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");

  return new Promise<ResearchDataset>((resolve, reject) => {
    Papa.parse<string[]>(fileContent, {
      delimiter: ",",
      dynamicTyping: false,
      skipEmptyLines: true,
      // a3.csv has no header row — columns are positional
      worker: false,

      complete: (results) => {
        try {
          if (results.errors.length > 0) {
            // Log parse warnings but continue if we have data
            console.warn("CSV parse warnings:", results.errors);
          }

          const rawRows = results.data.map((fields) => parseRow(fields));
          const dataset = normalizeRows(rawRows);

          // Cache for process lifetime
          dataCache.set(cacheKey, dataset, CACHE_TTL.RAW_DATA);
          resolve(dataset);
        } catch (err) {
          reject(new CsvParseError(err instanceof Error ? err.message : String(err)));
        }
      },

      error: (err: Error) => {
        reject(new CsvParseError(err.message));
      },
    });
  });
}

/**
 * Synchronous version for use in initialisation / scripts.
 */
export function loadResearchDataSync(customPath?: string): ResearchDataset {
  const cacheKey = "research:dataset";
  const cached = dataCache.get<ResearchDataset>(cacheKey);
  if (cached) return cached;

  const filePath = resolveCsvPath(customPath);

  if (!fs.existsSync(filePath)) {
    const altPath = path.resolve(process.cwd(), "../../exports/a3.csv");
    if (fs.existsSync(altPath)) {
      return loadResearchDataSync(altPath);
    }
    throw new CsvNotFoundError(filePath);
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const parsed = Papa.parse<string[]>(fileContent, {
    delimiter: ",",
    dynamicTyping: false,
    skipEmptyLines: true,
  });

  if (parsed.errors.length > 0) {
    console.warn("CSV parse warnings:", parsed.errors);
  }

  const rawRows = parsed.data.map((fields) => parseRow(fields));
  const dataset = normalizeRows(rawRows);
  dataCache.set(cacheKey, dataset, CACHE_TTL.RAW_DATA);
  return dataset;
}
