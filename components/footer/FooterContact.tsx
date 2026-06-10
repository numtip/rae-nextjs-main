import { footer } from "@/data/footer";
import type { Locale } from "@/lib/locale";

type Props = {
  locale: Locale;
};

export default function FooterContact({ locale }: Props) {
  const f = footer[locale];

  return (
    <div className="footer-contact">
      <strong className="footer-brand">{f.contactLabel}</strong>
      <p className="panel-text footer-meta">
        {f.description}
        <code>{f.publicPath}</code>
      </p>
    </div>
  );
}
