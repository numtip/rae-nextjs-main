import type { MetadataRoute } from "next";
import { publishedNewsIndices, slugForNewsIndex } from "@/data/news-registry";
import { locales } from "@/lib/locale";
import { absoluteSiteUrl } from "@/lib/site";

export const dynamic = "force-static";

/** Listing pages only (omit noindex routes e.g. /search/). */
const STATIC_SEGMENTS = [
  "",
  "about",
  "research-services",
  "academic-services",
  "news-events",
  "forms-documents",
  "contact",
  "green-office",
  "research-systems",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const loc of locales) {
    for (const seg of STATIC_SEGMENTS) {
      const path = seg ? `${loc}/${seg}` : loc;
      entries.push({
        url: absoluteSiteUrl(path),
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: seg === "" ? 1 : 0.85,
      });
    }
    for (const i of publishedNewsIndices()) {
      const slug = slugForNewsIndex(i);
      entries.push({
        url: absoluteSiteUrl(`${loc}/news-events/${slug}`),
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.65,
      });
    }
  }

  return entries;
}
