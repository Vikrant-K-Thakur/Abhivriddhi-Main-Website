import { useEffect, useRef } from 'react';

const events = [
  { tag: 'Flagship', title: 'EDGE', edition: '2026 Edition', desc: 'Our annual flagship event — a transformative experience blending industry exposure, skill-building workshops, and high-stakes competitions.', status: 'Upcoming' },
  { tag: 'Workshop', title: 'LinkedIn Masterclass', edition: 'Series IV', desc: 'A hands-on session guiding students to craft compelling professional profiles and build meaningful networks.', status: 'Upcoming' },
  { tag: 'Competition', title: 'Case Study Challenge', edition: '2025', desc: 'Inter-college case study competition testing analytical thinking, presentation skills, and business acumen.', status: 'Past' },
  { tag: 'Seminar', title: 'Industry Connect', edition: 'Vol. III', desc: 'An exclusive speaker series featuring industry veterans sharing insights on career navigation and leadership.', status: 'Past' },
];

export default function Events() {
  const headerRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
    }, { threshold: 0.1 });
    if (headerRef.current) observer.observe(headerRef.current);
    if (listRef.current) observer.observe(listRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <main className="page-main">
      <div className="page-hero">
        <div className="page-hero-bg" />
        <div className="section-label">What We Do</div>
        <h1 className="page-hero-title">Our <em>Events</em></h1>
        <p className="page-hero-sub">Curated experiences designed to challenge, inspire, and transform.</p>
      </div>

      <section className="events-section">
        <div className="reveal" ref={headerRef}>
          <div className="section-label">All Events</div>
          <h2 className="section-heading">Experiences that <em>Define</em></h2>
        </div>
        <div className="events-list reveal-stagger" ref={listRef}>
          {events.map((ev, i) => (
            <div className="event-card" key={i}>
              <div className="event-card-left">
                <div className="event-tag">{ev.tag}</div>
                <h3 className="event-title">{ev.title}</h3>
                <div className="event-edition">{ev.edition}</div>
              </div>
              <div className="event-card-body">
                <p className="event-desc">{ev.desc}</p>
              </div>
              <div className="event-card-right">
                <span className={`event-status ${ev.status === 'Upcoming' ? 'status-upcoming' : 'status-past'}`}>{ev.status}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
