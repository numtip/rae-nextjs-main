import Link from "next/link";
import { ctaHref, researchSystemsCta } from "@/data/cta";
import type { Locale } from "@/lib/locale";

export default function ResearchSystemsCTA({ locale }: { locale: Locale }) {
  const c = researchSystemsCta[locale];

  return (
    <section className="section-block" id="research-gateway">
      <div className="cta-strip">
        <div>
          <h3 className="cta-title">{c.title}</h3>
          <p className="cta-text">{c.text}</p>
        </div>
        <Link className="cta-button" href={ctaHref(locale, c)}>
          {c.buttonLabel}
        </Link>
      </div>
    </section>
  );
}
