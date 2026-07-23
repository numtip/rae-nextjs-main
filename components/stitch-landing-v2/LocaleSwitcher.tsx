"use client";

import { assetPath } from "@/lib/assetPath";
import type { Locale } from "@/lib/locale";

type Props = { locale: Locale };

export function LocaleSwitcher({ locale }: Props) {
  const thHref = assetPath("/stitch-landing-v2");
  const enHref = assetPath("/en/stitch-landing-v2");

  return (
    <div className="flex items-center gap-1 text-xs font-medium" role="navigation" aria-label="Language">
      {locale === "th" ? (
        <span className="px-2 py-0.5 rounded bg-brand-primary text-white cursor-default">
          TH
        </span>
      ) : (
        <a
          href={thHref}
          hrefLang="th"
          lang="th"
          className="px-2 py-0.5 rounded text-gray-600 hover:text-brand-primary hover:bg-gray-100 transition-colors"
        >
          TH
        </a>
      )}
      <span className="text-gray-300" aria-hidden="true">/</span>
      {locale === "en" ? (
        <span className="px-2 py-0.5 rounded bg-brand-primary text-white cursor-default">
          EN
        </span>
      ) : (
        <a
          href={enHref}
          hrefLang="en"
          lang="en"
          className="px-2 py-0.5 rounded text-gray-600 hover:text-brand-primary hover:bg-gray-100 transition-colors"
        >
          EN
        </a>
      )}
    </div>
  );
}
