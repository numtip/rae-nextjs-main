import Link from "next/link";
import { hero } from "@/data/hero";
import type { Locale } from "@/lib/locale";
import { withLocale } from "@/lib/paths";

/** Variant A — Full-width video background with text overlay */
export default function HeroVariantA({ locale }: { locale: Locale }) {
  const h = hero[locale];
  const base = withLocale(locale, "/");

  return (
    <section
      className="hero-section hero-video-section"
      id="hero"
      aria-labelledby="hero-title"
    >
      <video
        className="hero-video-bg"
        autoPlay
        muted
        loop
        playsInline
        poster="/assets/posters/rae-hero-poster-v2-20260614.jpg"
        aria-hidden="true"
        preload="metadata"
      >
        <source
          src="/assets/motion/rae-hero-motion-v2-20260614.mp4"
          type="video/mp4"
        />
      </video>
      <div className="hero-inner hero-inner-overlay">
        <p className="hero-kicker">{h.kicker}</p>
        <h1 id="hero-title" className="hero-title">
          {h.title}
        </h1>
        <p className="hero-text">{h.text}</p>
        <div className="hero-actions">
          <Link
            className="btn-link btn-link-primary"
            href={`${base}${h.primaryCta.hash}`}
          >
            {h.primaryCta.label}
          </Link>
          <Link
            className="btn-link btn-link-secondary"
            href={`${base}${h.secondaryCta.hash}`}
          >
            {h.secondaryCta.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
