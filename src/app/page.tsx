export default function HomePage() {
  return (
    <main
      style={{
        padding: "2rem",
        fontFamily: "system-ui, sans-serif",
        maxWidth: "640px",
        margin: "0 auto",
      }}
    >
      <h1>RAE Research Portal</h1>
      <p>Research Analytics Platform — API is running.</p>
      <ul>
        <li>
          <a href="/dashboard">ไปที่ Dashboard</a>
        </li>
        <li>
          <a href="/api/research/stats/overview">
            /api/research/stats/overview
          </a>
        </li>
        <li>
          <a href="/api/research/stats/budget">
            /api/research/stats/budget
          </a>
        </li>
        <li>
          <a href="/api/research/filters">/api/research/filters</a>
        </li>
        <li>
          <a href="/api/research/projects">/api/research/projects</a>
        </li>
      </ul>
    </main>
  );
}
