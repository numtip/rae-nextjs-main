import Link from "next/link";
import { hero } from "@/data/hero";
import type { Locale } from "@/lib/locale";
import { withLocale } from "@/lib/paths";

export default function Hero({ locale }: { locale: Locale }) {
  const h = hero[locale];
  const base = withLocale(locale, "/");

  return (
    <section className="hero-section section-block" id="hero">
      <p className="hero-kicker">{h.kicker}</p>
      <h2 className="hero-title">{h.title}</h2>
      <p className="hero-text">{h.text}</p>
      <div className="hero-actions">
        <Link className="btn-link btn-link-primary" href={`${base}${h.primaryCta.hash}`}>
          {h.primaryCta.label}
        </Link>
        <Link className="btn-link btn-link-secondary" href={`${base}${h.secondaryCta.hash}`}>
          {h.secondaryCta.label}
        </Link>
      </div>
    </section>
  );
}
