import { greenOffice } from "@/data/greenOffice";
import type { Locale } from "@/lib/locale";

export default function GreenOfficeSection({ locale }: { locale: Locale }) {
  const g = greenOffice[locale];

  return (
    <section className="section-block greenoffice-section card-panel" id="green-office">
      <h2 className="section-heading">{g.title}</h2>
      <p className="panel-text">{g.text}</p>
    </section>
  );
}
