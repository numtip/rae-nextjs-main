import Link from "next/link";
import { ctaHref, documentsCta } from "@/data/cta";
import type { Locale } from "@/lib/locale";

export default function DocumentsCTA({ locale }: { locale: Locale }) {
  const c = documentsCta[locale];
  const href = ctaHref(locale, c);
  const buttonAria = `${c.buttonLabel}: ${c.title}`;

  return (
    <section
      className="section-block documents-cta-section"
      id="forms-documents"
      aria-labelledby="forms-documents-heading"
    >
      <div className="cta-strip documents-cta-strip">
        <div className="cta-strip-body">
          <h2 id="forms-documents-heading" className="cta-title">
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
