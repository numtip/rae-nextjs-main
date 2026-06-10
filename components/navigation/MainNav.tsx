import { mainNav } from "@/data/navigation";
import type { Locale } from "@/lib/locale";
import PageContainer from "@/components/layout/PageContainer";
import NavItem from "./NavItem";

type Props = {
  locale: Locale;
  ariaLabel: string;
};

export default function MainNav({ locale, ariaLabel }: Props) {
  return (
    <nav className="main-nav nav-row" aria-label={ariaLabel}>
      <PageContainer>
        <ul className="nav-list">
          {mainNav.map((item) => (
            <li key={item.path}>
              <NavItem locale={locale} path={item.path} label={item.label[locale]} />
            </li>
          ))}
        </ul>
      </PageContainer>
    </nav>
  );
}
