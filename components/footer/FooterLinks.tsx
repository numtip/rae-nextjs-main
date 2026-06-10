import Link from "next/link";
import { footer } from "@/data/footer";
import type { Locale } from "@/lib/locale";
import { withLocale } from "@/lib/paths";

type Props = {
  locale: Locale;
};

export default function FooterLinks({ locale }: Props) {
  const f = footer[locale];
  const home = withLocale(locale, "/");

  return (
    <nav className="footer-links" aria-label={locale === "th" ? "ลิงก์หน้าแรก" : "Homepage sections"}>
      {f.anchors.map((a) => (
        <Link key={a.hash} href={`${home}${a.hash}`}>
          {a.label}
        </Link>
      ))}
    </nav>
  );
}
