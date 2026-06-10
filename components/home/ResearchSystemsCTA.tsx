import Link from "next/link";
import { ctaHref, researchSystemsCta } from "@/data/cta";
import type { Locale } from "@/lib/locale";

export default function ResearchSystemsCTA({ locale }: { locale: Locale }) {
  const c = researchSystemsCta[locale];
  const href = ctaHref(locale, c);
  const buttonAria = `${c.buttonLabel}: ${c.title}`;

  return (
    <section
      className="section-block research-systems-cta-section"
      id="research-gateway"
      aria-labelledby="research-gateway-heading"
    >
      <div className="cta-strip research-systems-cta-strip">
        <div className="cta-strip-body">
          <h2 id="research-gateway-heading" className="cta-title">
            {c.title}
          </h2>
          <p className="cta-text">{c.text}</p>
        </div>
        <Link className="cta-button cta-button-row" href={href} aria-label={buttonAria}>
          <span>{c.buttonLabel}</span>
          <span className="cta-button-chevron" aria-hidden="true">
            →
          </span>
        </Link>
      </div>
    </section>
  );
}
