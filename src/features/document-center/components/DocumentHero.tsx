import type { Locale } from "@/lib/locale";
import { uiLabels } from "../labels";
import DocumentSearchBox from "./DocumentSearchBox";

type Props = {
  locale: Locale;
};

export default function DocumentHero({ locale }: Props) {
  const labels = uiLabels[locale];

  return (
    <section className="dc-hero" aria-labelledby="dc-hero-title">
      <h1 id="dc-hero-title" className="dc-hero-title">
        {labels.heroTitle}
      </h1>
      <p className="dc-hero-subtitle">{labels.heroSubtitle}</p>
      <DocumentSearchBox locale={locale} variant="hero" />
    </section>
  );
}
