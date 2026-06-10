import Link from "next/link";
import { greenOffice } from "@/data/greenOffice";
import type { Locale } from "@/lib/locale";
import { withLocale } from "@/lib/paths";

const utilityKicker: Record<Locale, string> = {
  th: "ส่วนเสริม",
  en: "Utility",
};

const learnMoreLabel: Record<Locale, string> = {
  th: "ดูข้อมูลกรีนออฟฟิศ",
  en: "View green office info",
};

export default function GreenOfficeSection({ locale }: { locale: Locale }) {
  const g = greenOffice[locale];
  const href = withLocale(locale, g.path);
  const ctaAria = `${learnMoreLabel[locale]}: ${g.title}`;

  return (
    <section
      className="section-block greenoffice-utility-section card-panel"
      id="green-office"
      aria-labelledby="green-office-heading"
    >
      <p className="greenoffice-utility-kicker">{utilityKicker[locale]}</p>
      <h2 id="green-office-heading" className="section-heading">
        {g.title}
      </h2>
      <p className="panel-text">{g.text}</p>
      <Link href={href} className="greenoffice-utility-cta" aria-label={ctaAria}>
        <span>{learnMoreLabel[locale]}</span>
        <span className="greenoffice-utility-chevron" aria-hidden="true">
          →
        </span>
      </Link>
    </section>
  );
}
