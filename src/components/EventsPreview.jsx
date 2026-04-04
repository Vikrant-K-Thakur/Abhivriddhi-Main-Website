import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const events = [
  {
    id: '01',
    name: 'Engineering Unplugged',
    tag: 'Flagship · Freshers',
    desc: 'An electrifying event that ignites the stage for freshers to confidently step into the spotlight and embrace the limitless possibilities of their 4-year engineering journey.',
    pills: ['Confidence', 'Opportunity', 'Passion', 'Engineering'],
    color: '#b8cc8a',
  },
  {
    id: '02',
    name: 'E.D.G.E',
    tag: 'Summit · 3 Days',
    desc: 'A transformative 3-day Student Development Summit empowering students with Resume Building, Personal Branding, Money Management, and career guidance.',
    pills: ['Resume Building', 'Personal Branding', 'Mock Interviews'],
    color: '#8ab4cc',
  },
  {
    id: '03',
    name: 'EATON Changing Gears',
    tag: 'Industry Partnership',
    desc: 'Flagship event in partnership with Eaton — specialized training in LinkedIn optimization, teamwork, and communication skills for professional success.',
    pills: ['LinkedIn', 'Teamwork', 'Career Boost'],
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
        <h2 className="section-heading">A Journey of <em>Growth</em></h2>
        <p className="ep-sub">Three stages. One continuous path toward student excellence.</p>
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
