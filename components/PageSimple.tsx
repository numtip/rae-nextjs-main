import type { InnerPage } from "@/data/pages";

export default function PageSimple({
  title,
  lead,
  bullets,
  titleId,
}: InnerPage & { titleId?: string }) {
  return (
    <section className="section-block page-simple">
      <h1 id={titleId}>{title}</h1>
      <p className="panel-text page-lead">{lead}</p>
      {bullets && bullets.length > 0 ? (
        <ul className="page-bullets">
          {bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
