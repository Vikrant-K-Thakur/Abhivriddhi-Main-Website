import { useEffect, useRef } from 'react';

const team = [
  { role: 'President', name: 'Name', dept: 'Department · Year' },
  { role: 'Vice President', name: 'Name', dept: 'Department · Year' },
  { role: 'Secretary', name: 'Name', dept: 'Department · Year' },
  { role: 'Treasurer', name: 'Name', dept: 'Department · Year' },
  { role: 'Technical Head', name: 'Name', dept: 'Department · Year' },
  { role: 'Events Head', name: 'Name', dept: 'Department · Year' },
  { role: 'Marketing Head', name: 'Name', dept: 'Department · Year' },
  { role: 'Design Head', name: 'Name', dept: 'Department · Year' },
];

export default function Team() {
  const headerRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
    }, { threshold: 0.1 });
    if (headerRef.current) observer.observe(headerRef.current);
    if (gridRef.current) observer.observe(gridRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <main className="page-main">
      <div className="page-hero">
        <div className="page-hero-bg" />
        <div className="section-label">The People</div>
        <h1 className="page-hero-title">Meet the <em>Team</em></h1>
        <p className="page-hero-sub">The minds and hearts behind Abhivriddhi.</p>
      </div>

      <section className="team-section">
        <div className="reveal" ref={headerRef}>
          <div className="section-label">Core Committee · 2025–26</div>
          <h2 className="section-heading">Leadership <em>Council</em></h2>
        </div>
        <div className="team-grid reveal-stagger" ref={gridRef}>
          {team.map((m, i) => (
            <div className="team-card" key={i}>
              <div className="team-avatar">
                <svg viewBox="0 0 80 80" width="80" height="80" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="40" cy="30" r="18" fill="var(--surface2)" />
                  <ellipse cx="40" cy="72" rx="28" ry="18" fill="var(--surface2)" />
                </svg>
              </div>
              <div className="team-role">{m.role}</div>
              <div className="team-name">{m.name}</div>
              <div className="team-dept">{m.dept}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
