import Link from "next/link";
import { footer } from "@/data/footer";
import type { Locale } from "@/lib/locale";
import { withLocale } from "@/lib/paths";

export default function Footer({ locale }: { locale: Locale }) {
  const f = footer[locale];
  const home = withLocale(locale, "/");

  return (
    <section className="site-footer" id="contact-footer">
      <strong>{f.contactLabel}</strong>
      <p className="panel-text">
        {f.description}
        <code>{f.publicPath}</code>
      </p>
      <div className="footer-links">
        {f.anchors.map((a) => (
          <Link key={a.hash} href={`${home}${a.hash}`}>
            {a.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
