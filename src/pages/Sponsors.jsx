import { useEffect, useRef } from 'react';

const tiers = [
  { tier: 'Title Sponsor', sponsors: ['Sponsor Name', 'Sponsor Name'] },
  { tier: 'Gold Sponsor', sponsors: ['Sponsor Name', 'Sponsor Name', 'Sponsor Name'] },
  { tier: 'Silver Sponsor', sponsors: ['Sponsor Name', 'Sponsor Name', 'Sponsor Name', 'Sponsor Name'] },
];

export default function Sponsors() {
  const refs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
    }, { threshold: 0.1 });
    refs.current.forEach(r => r && observer.observe(r));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="page-main">
      <div className="page-hero">
        <div className="page-hero-bg" />
        <div className="section-label">Our Partners</div>
        <h1 className="page-hero-title">Our <em>Sponsors</em></h1>
        <p className="page-hero-sub">The organizations that believe in our mission and make it possible.</p>
      </div>

      <section className="sponsors-section">
        {tiers.map((t, ti) => (
          <div className="sponsor-tier reveal" key={ti} ref={el => refs.current[ti] = el}>
            <div className="sponsor-tier-label">{t.tier}</div>
            <div className={`sponsor-logos sponsor-logos-${ti === 0 ? 'title' : ti === 1 ? 'gold' : 'silver'}`}>
              {t.sponsors.map((s, si) => (
                <div className="sponsor-logo-card" key={si}>
                  <div className="sponsor-logo-placeholder">{s}</div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="sponsor-cta reveal" ref={el => refs.current[3] = el}>
          <div className="section-label">Partner With Us</div>
          <h2 className="section-heading">Become a <em>Sponsor</em></h2>
          <p className="philosophy-body" style={{ marginTop: '1rem', maxWidth: '560px' }}>
            Align your brand with the next generation of leaders. Reach out to explore partnership opportunities for our upcoming events.
          </p>
          <a href="/contact" className="btn-primary" style={{ marginTop: '2rem', display: 'inline-flex' }}>
            Get in Touch <span className="btn-arrow">→</span>
          </a>
        </div>
      </section>
    </main>
  );
}
