"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { hero } from "@/data/hero";
import type { Locale } from "@/lib/locale";
import { withLocale } from "@/lib/paths";

/** Variant C — Poster-first hero, video loads after page render */
export default function HeroVariantC({ locale }: { locale: Locale }) {
  const h = hero[locale];
  const base = withLocale(locale, "/");
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const preload = document.createElement("video");
    preload.preload = "auto";
    preload.muted = true;
    preload.playsInline = true;
    preload.loop = true;

    const source = document.createElement("source");
    source.src = "/assets/motion/rae-hero-motion-v2-20260614.mp4";
    source.type = "video/mp4";
    preload.appendChild(source);

    preload.oncanplaythrough = () => {
      setVideoReady(true);
    };

    preload.load();
    const timeout = setTimeout(() => {
      setVideoReady(true);
    }, 3000);

    return () => {
      preload.removeAttribute("src");
      preload.load();
      clearTimeout(timeout);
    };
  }, []);

  return (
    <section
      className="hero-section hero-video-section"
      id="hero"
      aria-labelledby="hero-title"
    >
      <div className="hero-poster-container" aria-hidden="true">
        {videoReady ? (
          <video
            className="hero-video-bg"
            autoPlay
            muted
            loop
            playsInline
            poster="/assets/posters/rae-hero-poster-v2-20260614.jpg"
            preload="auto"
          >
            <source
              src="/assets/motion/rae-hero-motion-v2-20260614.mp4"
              type="video/mp4"
            />
          </video>
        ) : (
          <Image
            src="/assets/posters/rae-hero-poster-v2-20260614.jpg"
            alt=""
            fill
            sizes="100vw"
            className="hero-video-bg hero-poster-only"
            priority
            unoptimized
          />
        )}
      </div>
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
