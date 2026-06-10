/** Ordered homepage section registry — single source for IA and rendering */
export type HomeSectionId =
  | "hero"
  | "quick-links"
  | "services-overview"
  | "research-systems-cta"
  | "kpi-impact"
  | "news-highlights"
  | "documents-cta"
  | "green-office";

export type HomeSectionDef = {
  id: HomeSectionId;
  anchor: string;
  group: "intro" | "services" | "content" | "utility";
};

export const homeSections: HomeSectionDef[] = [
  { id: "hero", anchor: "hero", group: "intro" },
  { id: "quick-links", anchor: "quick-links", group: "intro" },
  { id: "services-overview", anchor: "services-overview", group: "services" },
  { id: "research-systems-cta", anchor: "research-gateway", group: "services" },
  { id: "kpi-impact", anchor: "impact-metrics", group: "content" },
  { id: "news-highlights", anchor: "news-highlights", group: "content" },
  { id: "documents-cta", anchor: "forms-documents", group: "utility" },
  { id: "green-office", anchor: "green-office", group: "utility" },
];

/** Flat ordered list of section IDs for rendering */
export const homeSectionOrder: HomeSectionId[] = homeSections.map((s) => s.id);
