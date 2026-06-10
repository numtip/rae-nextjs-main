import type { Metadata } from "next";
import type { Locale } from "@/lib/locale";
import { ORG_NAME_EN, ORG_NAME_TH } from "@/lib/org-names";
import { absoluteSiteUrl } from "@/lib/site";

export function clipMetaDescription(raw: string, max = 155): string {
  const oneLine = raw.replace(/\s+/g, " ").trim();
  if (oneLine.length <= max) return oneLine;
  const cut = oneLine.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  const trimmed = (lastSpace > 40 ? cut.slice(0, lastSpace) : cut).trimEnd();
  return `${trimmed}…`;
}

/** segment: "" home, or "about", "news-events", … (no slashes) */
export function canonicalRelativePath(locale: Locale, segment: string): string {
  const seg = segment.replace(/^\/+|\/+$/g, "");
  if (!seg) return `${locale}/`;
  return `${locale}/${seg}/`;
}

export function buildPageMetadata(input: {
  locale: Locale;
  segment: string;
  title: string;
  description: string;
  /** Default true. Set false when title already includes the official org name. */
  appendOrgSuffix?: boolean;
}): Metadata {
  const { locale, segment, title, description, appendOrgSuffix = true } = input;
  const org = locale === "th" ? ORG_NAME_TH : ORG_NAME_EN;
  const fullTitle = appendOrgSuffix ? `${title} · ${org}` : title;
  const desc = clipMetaDescription(description);
  const selfRel = canonicalRelativePath(locale, segment);
  const thRel = canonicalRelativePath("th", segment);
  const enRel = canonicalRelativePath("en", segment);
  const absSelf = absoluteSiteUrl(selfRel.replace(/\/$/, ""));
  const absTh = absoluteSiteUrl(thRel.replace(/\/$/, ""));
  const absEn = absoluteSiteUrl(enRel.replace(/\/$/, ""));

  return {
    title: fullTitle,
    description: desc,
    alternates: {
      canonical: selfRel,
      languages: {
        th: absTh,
        en: absEn,
        "x-default": absTh,
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "th" ? "th_TH" : "en_US",
      alternateLocale: locale === "th" ? ["en_US"] : ["th_TH"],
      url: absSelf,
      title: fullTitle,
      description: desc,
      siteName: org,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: desc,
    },
  };
}
