import { quickLinkGroups, quickLinksSection, resolveQuickHref } from "@/data/quickLinks";
import type { Locale } from "@/lib/locale";

function externalSuffix(locale: Locale): string {
  return locale === "th" ? " (เปิดบริการภายนอก)" : " (external service)";
}

export default function QuickLinks({ locale }: { locale: Locale }) {
  const sec = quickLinksSection[locale];

  return (
    <section className="section-block quick-links-section" id="quick-links" aria-labelledby="quick-links-heading">
      <h2 id="quick-links-heading" className="section-heading">
        {sec.heading}
      </h2>
      <p className="section-subtext">{sec.subtext}</p>
      <div className="grid-two quick-links-grid">
        {quickLinkGroups.map((group) => (
          <article key={group.title.th} className="card-panel quick-link-card">
            <h3 className="panel-title">{group.title[locale]}</h3>
            <ul className="panel-list quick-link-list">
              {group.links.map((link) => {
                const href = resolveQuickHref(link, locale);
                const isExternal = link.kind === "external";
                const label = link.label[locale];
                return (
                  <li key={href + link.label.th}>
                    <a
                      href={href}
                      className="quick-link-item"
                      {...(isExternal
                        ? {
                            rel: "noopener noreferrer",
                            "aria-label": `${label}${externalSuffix(locale)}`,
                          }
                        : { "aria-label": label })}
                    >
                      <span className="quick-link-label">{label}</span>
                      <span className="quick-link-chevron" aria-hidden="true">
                        →
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
