import type { Locale } from "@/lib/locale";
import FooterContact from "./FooterContact";
import FooterLinks from "./FooterLinks";
import PreviewFooter from "@/components/PreviewFooter";

type Props = {
  locale: Locale;
};

export default function SiteFooter({ locale }: Props) {
  return (
    <footer className="site-footer" id="contact-footer">
      <div className="footer-inner">
        <FooterContact locale={locale} />
        <FooterLinks locale={locale} />
        <PreviewFooter />
      </div>
    </footer>
  );
}
