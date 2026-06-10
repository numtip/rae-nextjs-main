import { personnelRegistry } from "@/data/personnel-registry";
import { personnelSectionLabels } from "@/data/personnel-ui";
import type { Locale } from "@/lib/locale";
import { localizePersonnel } from "@/lib/personnel-i18n";

export default function PersonnelSection({
  locale,
  variant,
}: {
  locale: Locale;
  variant: "about" | "contact";
}) {
  const ui = personnelSectionLabels[locale];
  const heading = variant === "about" ? ui.aboutHeading : ui.contactHeading;

  return (
    <section className="section-block personnel-section" aria-labelledby={`personnel-${variant}-title`}>
      <h2 id={`personnel-${variant}-title`} className="section-heading">
        {heading}
      </h2>
      <div className="personnel-grid">
        {personnelRegistry.map((record) => {
          const p = localizePersonnel(record, locale);
          return (
            <article key={record.name} className="card-panel personnel-card">
              <h3 className="panel-title personnel-name">{p.name}</h3>
              <dl className="personnel-dl">
                <div className="personnel-dl-row">
                  <dt>{ui.role}</dt>
                  <dd>{p.role}</dd>
                </div>
                <div className="personnel-dl-row">
                  <dt>{ui.department}</dt>
                  <dd>{p.department}</dd>
                </div>
                <div className="personnel-dl-row">
                  <dt>{ui.contact}</dt>
                  <dd className="personnel-contact">{p.contact}</dd>
                </div>
              </dl>
            </article>
          );
        })}
      </div>
    </section>
  );
}
