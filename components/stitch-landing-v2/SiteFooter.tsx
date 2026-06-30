"use client";
/* eslint-disable @next/next/no-img-element */

import type { StitchLandingContent } from "@/content/stitch-landing";
import type { Locale } from "@/lib/locale";
import { assetPath } from "@/lib/assetPath";
import { FacebookIcon, LineIcon, YouTubeIcon } from "./icons/index";

type Props = { c: StitchLandingContent; locale: Locale };

const socialIconMap = {
  facebook: FacebookIcon,
  line: LineIcon,
  youtube: YouTubeIcon,
};

const socialBgMap: Record<string, string> = {
  facebook: "bg-blue-600",
  line: "bg-green-500",
  youtube: "bg-red-600",
};

export function SiteFooter({ c, locale }: Props) {
  return (
    <footer>
      {/* Main Footer — Maejo Green #005C3B */}
      <div className="bg-[#005C3B] text-gray-100 py-12">
        <div className="container mx-auto px-4">
          {/* Main Footer Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Logo & Contact */}
            <div>
              <div className="flex items-center gap-3 mb-4 text-white font-bold">
                <div className="w-14 h-14 flex-shrink-0 overflow-hidden">
                  <img
                    alt={c.footer.logoAlt}
                    src={assetPath("/images/logorae.png")}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h4 className="font-bold leading-tight text-white">
                    {c.footer.organizationName}
                  </h4>
                  <p className="text-sm text-gray-100">{c.footer.universityName}</p>
                </div>
              </div>
              <address className="not-italic text-sm space-y-2">
                <p className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 flex-shrink-0 text-gray-300 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                    <path
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                  </svg>
                  {c.footer.address}
                </p>
                <p className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 flex-shrink-0 text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                  </svg>
                  {c.footer.phone}
                </p>
                <p className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 flex-shrink-0 text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                  </svg>
                  {c.footer.email}
                </p>
              </address>
            </div>

            {/* Columns */}
            {c.footer.columns.map((col) => (
              <div key={col.title}>
                <h4 className="text-white font-bold mb-4">{col.title}</h4>
                <ul className="space-y-2 text-sm">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-gray-100 hover:text-[#D8A01A] transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Social & Newsletter */}
            <div>
              <h4 className="text-white font-bold mb-4">
                {locale === "th" ? "ติดตามเรา" : "Follow Us"}
              </h4>
              <div className="flex gap-2 mb-6">
                {c.footer.socialLinks.map((social) => {
                  const Icon = socialIconMap[social.platform];
                  return (
                    <a
                      key={social.platform}
                      href={social.href}
                      className={`w-8 h-8 rounded-full ${socialBgMap[social.platform]} flex items-center justify-center text-white hover:opacity-80 transition-opacity`}
                      aria-label={social.platform}
                    >
                      {Icon && <Icon className="w-4 h-4" />}
                    </a>
                  );
                })}
              </div>
              <h4 className="text-white font-bold mb-4">
                {locale === "th"
                  ? "รับข่าวสารและกิจกรรม"
                  : "Subscribe to Newsletter"}
              </h4>
              <form
                className="flex gap-2"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="email"
                  placeholder={c.footer.newsletterPlaceholder}
                  className="w-full rounded-md px-3 py-2 text-sm text-gray-800 bg-white border-none focus:ring-2 focus:ring-brand-gold placeholder:text-gray-500"
                  aria-label={c.footer.newsletterPlaceholder}
                />
                <button
                  type="submit"
                  className="bg-[#D8A01A] text-[#003F2A] px-4 py-2 rounded-md text-sm font-semibold hover:bg-[#c79318] transition-colors whitespace-nowrap"
                >
                  {c.footer.newsletterButtonLabel}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar — slightly darker green */}
      <div className="bg-[#004f33] text-gray-300 py-4">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-xs">
          <p className="text-gray-300">{c.footer.copyright}</p>
          <div className="flex gap-4 mt-3 md:mt-0">
            {c.footer.legalLinks.map((link, i) => (
              <span key={link.label} className="flex items-center gap-4">
                <a
                  href={link.href}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
                {i < c.footer.legalLinks.length - 1 && (
                  <span className="text-gray-500">|</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
