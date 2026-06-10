import { quickLinkGroups, quickLinksSection, resolveQuickHref } from "@/data/quickLinks";
import type { Locale } from "@/lib/locale";

export default function QuickLinks({ locale }: { locale: Locale }) {
  const sec = quickLinksSection[locale];

  return (
    <section className="section-block" id="quick-links">
      <h2 className="section-heading">{sec.heading}</h2>
      <p className="section-subtext">{sec.subtext}</p>
      <div className="grid-two">
        {quickLinkGroups.map((group) => (
          <article key={group.title.th} className="card-panel">
            <h3 className="panel-title">{group.title[locale]}</h3>
            <ul className="panel-list">
              {group.links.map((link) => (
                <li key={resolveQuickHref(link, locale) + link.label.th}>
                  <a href={resolveQuickHref(link, locale)}>{link.label[locale]}</a>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
