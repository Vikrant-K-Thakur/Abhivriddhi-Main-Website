import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const events = [
  {
    num: '01',
    title: 'Engineering Unplugged',
    tag: 'Flagship · Freshers',
    desc: 'Engineering Unplugged (EU) marks the beginning of the engineering journey. Curated for first-year students, it equips them with the mindset, direction, and insights needed to navigate the next four years with intention.',
    pills: ['Confidence', 'Opportunity', 'Passion', 'Engineering'],
    color: '#b8cc8a',
  },
  {
    num: '02',
    title: 'E.D.G.E',
    tag: 'Summit · 3 Days',
    desc: 'EDGE is our flagship experience designed to bridge ambition with opportunity. Through industry interaction, practical exposure, and meaningful dialogue, it enables students to develop clarity, confidence, and a professional edge.',
    pills: ['Resume Building', 'Personal Branding', 'Mock Interviews'],
    color: '#8ab4cc',
  },
  {
    num: '03',
    title: 'EATON Changing Gears',
    tag: 'Industry Partnership',
    desc: 'EATON is a collaborative initiative designed to strengthen teamwork and essential soft skills. Through a series of interactive sessions and activities in a hybrid format, it enables students to develop communication, collaboration, and professional readiness.',
    pills: ['LinkedIn', 'Teamwork', 'Career Boost'],
    color: '#ccb88a',
  },
];

export default function Philosophy() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const dotsRef = useRef([]);
  const progressBarRef = useRef(null);
  const activeIndex = useRef(-1);

  useEffect(() => {
    const cards = cardsRef.current;
    const dots = dotsRef.current;
    const bar = progressBarRef.current;

    const setActive = (idx) => {
      if (activeIndex.current === idx) return;
      activeIndex.current = idx;

      cards.forEach((card, i) => {
        if (!card) return;
        if (i < idx) {
          card.style.opacity = '0.45';
          card.style.transform = 'translateY(0px) scale(0.93)';
          card.style.filter = 'blur(1px)';
        } else if (i === idx) {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0px) scale(1)';
          card.style.filter = 'blur(0px)';
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(80px) scale(0.95)';
          card.style.filter = 'blur(4px)';
        }
        card.classList.toggle('phil-card--active', i === idx);
      });

      dots.forEach((dot, i) => {
        if (!dot) return;
        dot.classList.toggle('phil-dot--active', i === idx);
        dot.classList.toggle('phil-dot--done', i < idx);
      });

      if (bar) {
        const pct = idx < 0 ? 0 : ((idx + 1) / events.length) * 100;
        bar.style.height = `${pct}%`;
      }
    };

    const observers = cards.map((card, i) => {
      if (!card) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(i); },
        { threshold: 0.55 }
      );
      obs.observe(card);
      return obs;
    });

    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      cards.forEach((card, i) => {
        if (!card || i !== activeIndex.current) return;
        const shift = (-rect.top / (rect.height - window.innerHeight) - (i / events.length)) * 18;
        card.style.transform = `translateY(${-shift}px) scale(1)`;
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observers.forEach(o => o && o.disconnect());
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section id="philosophy" className="phil-section" ref={sectionRef}>
      {/* LEFT sticky panel */}
      <div className="phil-left">
        <div className="phil-left-inner">
          <div className="section-label">Featured Events</div>
          <h2 className="phil-heading">
            A Journey of <em>Growth</em>
          </h2>
          <p className="phil-sub">
            Three landmark experiences. One continuous path toward student excellence — from freshers to industry-ready professionals.
          </p>
          <div className="phil-progress-track">
            <div className="phil-progress-bar" ref={progressBarRef} />
            <div className="phil-dots">
              {events.map((_, i) => (
                <div
                  key={i}
                  className="phil-dot"
                  ref={el => dotsRef.current[i] = el}
                  title={events[i].title}
                />
              ))}
            </div>
          </div>
          <Link to="/events" className="btn-ghost" style={{ marginTop: '2rem', display: 'inline-flex' }}>View All Events →</Link>
        </div>
      </div>

      {/* RIGHT scrolling cards */}
      <div className="phil-right">
        <div className="phil-cards-wrap">
          {events.map((ev, i) => (
            <div
              className="phil-card"
              key={i}
              ref={el => cardsRef.current[i] = el}
              style={{ '--ev-color': ev.color, borderColor: `${ev.color}22` }}
            >
              <div className="phil-card-num">{ev.num}</div>
              <div className="phil-card-body">
                <div className="phil-card-tag" style={{ fontSize: '0.78rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: ev.color, opacity: 0.8, marginBottom: '0.5rem' }}>{ev.tag}</div>
                <div className="phil-card-title" style={{ color: ev.color === '#b8cc8a' ? undefined : ev.color }}>{ev.title}</div>
                <div className="phil-card-desc">{ev.desc}</div>
                <div className="ep-pills" style={{ marginTop: '1.2rem' }}>
                  {ev.pills.map(p => (
                    <span key={p} className="ep-pill" style={{ '--ev-color': ev.color, color: ev.color, borderColor: ev.color }}>{ p}</span>
                  ))}
                </div>
              </div>
              <div className="phil-card-glow" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
