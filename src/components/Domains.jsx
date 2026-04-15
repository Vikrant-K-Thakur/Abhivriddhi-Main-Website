import { useEffect, useRef } from 'react';

const domains = [
  {
    name: 'Public Relations',
    team: 'Team Public Relations',
    tag: 'PR & Communications',
    desc: 'Our PR team connects with communities, builds partnerships, and manages communication channels to strengthen the organization\'s presence.',
    color: '#b8cc8a',
    rotate: '-2.5deg',
  },
  {
    name: 'Technical',
    team: 'Team Technical',
    tag: 'Tech & Innovation',
    desc: 'Driving innovation through hands-on projects, workshops, and technical challenges that bridge academic learning with industry demands.',
    color: '#8ab4cc',
    rotate: '1.8deg',
  },
  {
    name: 'Design',
    team: 'Team Design',
    tag: 'Creative & Visual',
    desc: 'Crafting the visual identity of Abhivriddhi — from event branding to digital assets, our designers shape how the world sees us.',
    color: '#cc9e8a',
    rotate: '-1.2deg',
  },
  {
    name: 'Content',
    team: 'Team Content',
    tag: 'Writing & Strategy',
    desc: 'Telling our story through compelling narratives, social media strategy, and editorial content that resonates with our audience.',
    color: '#b08acc',
    rotate: '2.2deg',
  },
  {
    name: 'Operations',
    team: 'Team Operations',
    tag: 'Logistics & Management',
    desc: 'The backbone of every event — coordinating logistics, managing timelines, and ensuring every detail is executed with precision.',
    color: '#ccb88a',
    rotate: '-1.8deg',
  },
];

export default function Domains() {
  const sectionRef = useRef(null);
  const stickyRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardRefs.current;
    const total = domains.length;

    function onScroll() {
      const rect = section.getBoundingClientRect();
      const sectionH = section.offsetHeight;
      const viewH = window.innerHeight;
      const scrolled = -rect.top;
      const scrollable = sectionH - viewH;
      const progress = Math.max(0, Math.min(1, scrolled / scrollable));
      const step = 1 / total;

      cards.forEach((card, i) => {
        if (!card) return;
        const cardStart = i * step;
        const cardEnd = cardStart + step;
        const cardProgress = Math.max(0, Math.min(1, (progress - cardStart) / step));

        if (progress < cardStart) {
          card.style.transform = `translateY(80px) rotate(${domains[i].rotate}) scale(0.95)`;
          card.style.opacity = '0';
        } else if (progress >= cardStart && progress < cardEnd) {
          const slideIn = Math.min(1, cardProgress * 4);
          const ty = 80 - slideIn * 80;
          const scale = 0.95 + slideIn * 0.05;
          card.style.transform = `translateY(${ty}px) rotate(${domains[i].rotate}) scale(${scale})`;
          card.style.opacity = `${slideIn}`;
        } else {
          const pushUp = (progress - cardEnd) / step;
          const ty = Math.min(pushUp * -18, -18);
          const scale = 1 - Math.min(pushUp * 0.03, 0.03);
          card.style.transform = `translateY(${ty}px) rotate(${domains[i].rotate}) scale(${scale})`;
          card.style.opacity = '1';
        }

        card.style.zIndex = i + 1;
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section id="domains" ref={sectionRef} style={{ height: '600vh', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <style>{`
        .domains-sticky {
          position: sticky;
          top: 0;
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 0 4rem;
          overflow: hidden;
          background: #0a0d0f;
        }
        .domains-header {
          text-align: center;
          margin-bottom: 3rem;
          position: relative;
          z-index: 10;
        }
        .domains-stack {
          position: relative;
          width: 100%;
          max-width: 720px;
          height: 360px;
        }
        .dom-card-wrap {
          position: absolute;
          inset: 0;
          background: #1e2530;
          border-radius: 18px;
          border: 1px solid rgba(184,204,138,0.18);
          display: grid;
          grid-template-columns: 200px 1fr;
          overflow: hidden;
          box-shadow: 0 24px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06);
          opacity: 0;
          will-change: transform, opacity;
          transition: border-color 0.3s ease;
        }
        .dom-card-wrap::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: var(--dom-color);
        }
        .dom-card-left {
          display: flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(circle, var(--dom-color-faint) 1.5px, transparent 1.5px);
          background-size: 16px 16px;
          background-color: var(--dom-color-bg);
          border-right: 1px solid rgba(184,204,138,0.12);
          position: relative;
        }
        .dom-card-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 5rem;
          font-weight: 300;
          color: var(--dom-color);
          opacity: 0.2;
          line-height: 1;
          user-select: none;
        }
        .dom-card-right {
          padding: 2rem 2rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 0.4rem;
        }
        .dom-card-tag {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--dom-color);
          margin-bottom: 0.2rem;
        }
        .dom-card-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem;
          font-weight: 400;
          color: #ffffff;
          line-height: 1;
        }
        .dom-card-team {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.7rem;
          font-weight: 500;
          color: rgba(255,255,255,0.35);
          letter-spacing: 0.06em;
          margin-bottom: 0.5rem;
        }
        .dom-card-divider {
          border: none;
          border-top: 1px solid rgba(255,255,255,0.07);
          margin: 0.2rem 0 0.6rem;
        }
        .dom-card-desc {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.8rem;
          font-weight: 500;
          line-height: 1.8;
          color: rgba(255,255,255,0.55);
        }
        @media (max-width: 900px) {
          .domains-sticky { padding: 0 1rem !important; }
          .domains-stack { max-width: 88%; height: auto; min-height: 300px; margin: 0 auto; }
          .dom-card-wrap { grid-template-columns: 1fr; }
          .dom-card-left { height: 100px; border-right: none; border-bottom: 2px dashed rgba(0,0,0,0.1); }
          #domains { height: 500vh !important; }
          .dom-card-tag  { font-size: 0.55rem !important; }
          .dom-card-name { font-size: 1.6rem !important; }
          .dom-card-team { font-size: 0.62rem !important; }
          .dom-card-desc { font-size: 0.75rem !important; }
          .dom-card-num  { font-size: 3.5rem !important; }
        }
        @media (max-width: 480px) {
          .domains-sticky { padding: 0 0.75rem !important; }
          .domains-stack { max-width: 82%; }
          .dom-card-wrap { border-radius: 14px !important; }
          .dom-card-right { padding: 1.5rem 1.2rem !important; }
          .dom-card-name { font-size: 1.4rem !important; }
          .dom-card-desc { font-size: 0.7rem !important; }
        }
      `}</style>

      <div className="domains-sticky" ref={stickyRef}>
        <div className="domains-header">
          <div className="section-label">Our Domains</div>
          <h2 className="section-heading">The <em>Teams</em> Behind It All</h2>
        </div>

        <div className="domains-stack">
          {domains.map((d, i) => (
            <div
              key={i}
              className="dom-card-wrap"
              ref={el => cardRefs.current[i] = el}
              style={{
                '--dom-color': d.color,
                '--dom-color-faint': d.color + '45',
                '--dom-color-bg': d.color + '15',
              }}
            >
              <div className="dom-card-left">
                <span className="dom-card-num">0{i + 1}</span>
              </div>
              <div className="dom-card-right">
                <div className="dom-card-tag">{d.tag}</div>
                <div className="dom-card-name">{d.name}</div>
                <div className="dom-card-team">{d.team}</div>
                <hr className="dom-card-divider" />
                <p className="dom-card-desc">{d.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
