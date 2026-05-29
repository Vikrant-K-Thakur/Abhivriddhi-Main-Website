import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const events = [
  {
    id: '01',
    name: 'E.D.G.E',
    tag: 'Flagship Experience',
    desc: 'EDGE is our flagship experience designed to bridge ambition with opportunity. Through industry interaction, practical exposure, and meaningful dialogue, it enables students to develop clarity, confidence, and a professional edge.',
    pills: ['Industry Interaction', 'Practical Exposure', 'Professional Edge'],
    color: '#b8cc8a',
  },
  {
    id: '02',
    name: 'Engineering Unplugged',
    tag: 'Freshers · First Year',
    desc: 'Engineering Unplugged (EU) marks the beginning of the engineering journey. Curated for first-year students, it equips them with the mindset, direction, and insights needed to navigate the next four years with intention.',
    pills: ['Mindset', 'Direction', 'Clarity'],
    color: '#8ab4cc',
  },
  {
    id: '03',
    name: 'EATON',
    tag: 'Industry Collaboration',
    desc: 'EATON is a collaborative initiative designed to strengthen teamwork and essential soft skills. Through a series of interactive sessions and activities in a hybrid format, it enables students to develop communication, collaboration, and professional readiness.',
    pills: ['Teamwork', 'Communication', 'Soft Skills'],
    color: '#ccb88a',
  },
];

export default function EventsPreview() {
  const sectionRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
      });
    }, { threshold: 0.1 });
    sectionRef.current?.querySelectorAll('.reveal').forEach(c => observer.observe(c));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="events-preview" ref={sectionRef}>
      <div className="ep-header reveal">
        <div className="section-label">Featured Events</div>
        <h2 className="section-heading">The Development <em>Framework</em></h2>
        <p className="ep-sub">A structured pathway designed to guide students through every stage of their growth. From gaining early clarity and building essential skills to applying them in real-world environments, each experience contributes to developing confident, industry-ready professionals.</p>
      </div>

      <div className="ep-journey">
        {events.map((ev, i) => (
          <div
            key={ev.id}
            className={`ep-step${activeIdx === i ? ' ep-step--active' : ''}`}
            style={{ '--ev-color': ev.color, '--delay': `${i * 0.15}s` }}
            onMouseEnter={() => setActiveIdx(i)}
            onMouseLeave={() => setActiveIdx(null)}
          >
            {/* Connector line (not on last) */}
            {i < events.length - 1 && (
              <div className={`ep-connector${activeIdx === i ? ' ep-connector--lit' : ''}`}>
                <div className="ep-connector-line" />
                <div className="ep-connector-glow" style={{ '--glow-color': ev.color }} />
                <div className="ep-connector-dot" style={{ '--glow-color': ev.color }} />
              </div>
            )}

            {/* Step node */}
            <div className="ep-node" style={{ '--ev-color': ev.color }}>
              <div className="ep-node-ring" />
              <span className="ep-node-num">{ev.id}</span>
            </div>

            {/* Card */}
            <div className="ep-card" style={{ '--ev-color': ev.color }}>
              <div className="ep-card-glow" />
              <div className="ep-card-tag">{ev.tag}</div>
              <h3 className="ep-card-name">{ev.name}</h3>
              <p className="ep-card-desc">{ev.desc}</p>
              <div className="ep-pills">
                {ev.pills.map(p => <span key={p} className="ep-pill">{p}</span>)}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="ep-footer reveal">
        <Link to="/events" className="btn-ghost">View All Events →</Link>
      </div>
    </section>
  );
}
