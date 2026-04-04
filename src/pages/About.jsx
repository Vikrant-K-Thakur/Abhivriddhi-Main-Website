import { useEffect, useRef } from 'react';

export default function About() {
  const refs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
    }, { threshold: 0.15 });
    refs.current.forEach(r => r && observer.observe(r));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="page-main">
      <div className="page-hero">
        <div className="page-hero-bg" />
        <div className="section-label">Who We Are</div>
        <h1 className="page-hero-title">About <em>Abhivriddhi</em></h1>
        <p className="page-hero-sub">A prestigious academic club forging leaders since 2022.</p>
      </div>

      <section className="about-story">
        <div className="reveal" ref={el => refs.current[0] = el}>
          <div className="section-label">Our Story</div>
          <h2 className="section-heading">Born from a <em>Conviction</em></h2>
          <div className="philosophy-body">
            <p>Abhivriddhi was born from a simple conviction: technical skill alone does not define a leader. The modern world demands something rarer — individuals who can navigate complexity with composure, communicate with precision, and lead with integrity.</p>
            <p>We exist to cultivate that rare quality. Through curated programming, expert mentorship, and a community of driven peers, we engineer the conditions for genuine, lasting growth.</p>
            <p>Founded in 2022, we have grown into a movement that spans multiple colleges, uniting students under a shared pursuit of excellence.</p>
          </div>
        </div>
        <div className="reveal-stagger about-pillars" ref={el => refs.current[1] = el}>
          {[
            { num: '01', title: 'Technical Prowess', desc: 'Bridging the gap between classroom knowledge and real-world application through hands-on exposure.' },
            { num: '02', title: 'Professional Presence', desc: 'Developing soft skills, communication, and executive presence that define tomorrow\'s leaders.' },
            { num: '03', title: 'Global Excellence', desc: 'Setting standards that transcend local benchmarks — preparing members for the global stage.' },
          ].map(p => (
            <div className="pillar" key={p.num}>
              <div className="pillar-num">{p.num}</div>
              <div className="pillar-title">{p.title}</div>
              <div className="pillar-desc">{p.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mission-section">
        <div className="reveal" ref={el => refs.current[2] = el}>
          <div className="section-label">Mission & Vision</div>
          <div className="mission-grid">
            {[
              { label: 'Mission', text: 'To cultivate well-rounded professionals by bridging the gap between academic learning and industry expectations through immersive experiences and mentorship.' },
              { label: 'Vision', text: 'To be the most impactful student-led academic club in the region — a launchpad for the next generation of global leaders.' },
              { label: 'Values', text: 'Integrity, discipline, collaboration, and an unrelenting pursuit of excellence in everything we do.' },
            ].map(m => (
              <div className="mission-card" key={m.label}>
                <div className="mission-card-label">{m.label}</div>
                <p>{m.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
