import { documentRegistry } from "@/data/documents";
import { localizeDocument } from "@/lib/documents-i18n";
import type { Locale } from "@/lib/locale";
import { localizeNews } from "@/lib/news-i18n";
import {
  newsRegistry,
  publishedNewsIndices,
  slugForNewsIndex,
} from "@/data/news-registry";
import { academicServicesRegistry } from "@/data/academic-services-registry";
import { researchServicesRegistry } from "@/data/research-services-registry";
import { localizeService } from "@/lib/services-i18n";
import { personnelRegistry } from "@/data/personnel-registry";
import { localizePersonnel } from "@/lib/personnel-i18n";

export type SearchKind = "news" | "document" | "service" | "personnel";

export type SearchHit = {
  id: string;
  kind: SearchKind;
  title: string;
  excerpt: string;
  href: string;
  category?: string;
  tags: string[];
};

function haystack(hit: SearchHit): string {
  return [hit.title, hit.excerpt, hit.category ?? "", ...hit.tags].join(" ").toLowerCase();
}

export function filterSearchHits(hits: SearchHit[], query: string): SearchHit[] {
  const q = query.trim().toLowerCase();
  if (!q) return hits;
  const tokens = q.split(/\s+/).filter(Boolean);
  return hits.filter((h) => {
    const text = haystack(h);
    return tokens.every((t) => text.includes(t));
  });
}

function buildHits(locale: Locale): SearchHit[] {
  const hits: SearchHit[] = [];

  for (const i of publishedNewsIndices()) {
    const record = newsRegistry[i];
    const v = localizeNews(record, locale);
    const slug = slugForNewsIndex(i);
    hits.push({
      id: `news-${i}`,
      kind: "news",
      title: v.title,
      excerpt: v.summary,
      href: `/news-events/${slug}/`,
      category: v.category,
      tags: v.tags,
    });
  }

  documentRegistry.forEach((doc, i) => {
    const v = localizeDocument(doc, locale);
    hits.push({
      id: `doc-${i}`,
      kind: "document",
      title: v.name,
      excerpt: `${v.category} · ${v.type} · v${v.version}`,
      href: "/forms-documents/",
      category: v.category,
      tags: [v.type, `v${v.version}`],
    });
  });

  researchServicesRegistry.forEach((svc, i) => {
    const v = localizeService(svc, locale);
    hits.push({
      id: `svc-r-${i}`,
      kind: "service",
      title: v.name,
      excerpt: v.description,
      href: "/research-services/",
      tags: [locale === "th" ? "บริการวิจัย" : "Research services"],
    });
  });

  academicServicesRegistry.forEach((svc, i) => {
    const v = localizeService(svc, locale);
    hits.push({
      id: `svc-a-${i}`,
      kind: "service",
      title: v.name,
      excerpt: v.description,
      href: "/academic-services/",
      tags: [locale === "th" ? "บริการวิชาการ" : "Academic services"],
    });
  });

  personnelRegistry.forEach((person, i) => {
    const v = localizePersonnel(person, locale);
    hits.push({
      id: `person-${i}`,
      kind: "personnel",
      title: v.name,
      excerpt: [v.role, v.department, v.contact].join(" · "),
      href: "/contact/",
      category: v.role,
      tags: [v.department],
    });
  });

  return hits;
}

export const searchHitsByLocale: Record<Locale, SearchHit[]> = {
  th: buildHits("th"),
  en: buildHits("en"),
};
