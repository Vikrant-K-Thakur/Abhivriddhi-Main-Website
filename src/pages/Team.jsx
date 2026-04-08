/* ============================================================
   TEAM PAGE — COMING SOON
   The full team page code is commented out below.
   Uncomment when team data is ready.
   ============================================================ */

export default function Team() {
  return (
    <div style={{
      background: '#0a0d0f',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'DM Sans', sans-serif",
      color: '#e8e4dc',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Same hero background as Events page */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 70% 55% at 50% 40%, rgba(184,204,138,0.08) 0%, transparent 70%)',
      }} />
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at center, black 30%, transparent 80%)',
        maskImage: 'radial-gradient(ellipse 80% 80% at center, black 30%, transparent 80%)',
      }} />
      <div style={{ position: 'absolute', top: '20%', left: 0, right: 0, height: 1, background: 'linear-gradient(to right, transparent, rgba(184,204,138,0.12), transparent)' }} />
      <div style={{ position: 'absolute', bottom: '20%', left: 0, right: 0, height: 1, background: 'linear-gradient(to right, transparent, rgba(184,204,138,0.12), transparent)' }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 32px' }}>

        {/* Badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 7,
          fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase',
          color: '#b8cc8a', border: '1px solid rgba(184,204,138,0.22)',
          padding: '5px 14px', borderRadius: 20, marginBottom: 32,
          background: 'rgba(184,204,138,0.08)',
        }}>
          <span style={{
            width: 6, height: 6, borderRadius: '50%', background: '#b8cc8a',
            animation: 'teamDot 2s ease-in-out infinite',
          }} />
          Abhivriddhi · The People
        </div>

        {/* Heading */}
        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 300,
          fontSize: 'clamp(64px,10vw,120px)',
          lineHeight: 1.02,
          letterSpacing: '0.01em',
          marginBottom: 32,
        }}>
          <span style={{ display: 'block', color: '#e8e4dc' }}>Coming</span>
          <span style={{ display: 'block', color: 'transparent', WebkitTextStroke: '1px #b8cc8a' }}>Soon</span>
        </h1>

        {/* Divider */}
        <div style={{
          width: 60, height: 1, margin: '0 auto 32px',
          background: 'linear-gradient(90deg, transparent, #b8cc8a, transparent)',
        }} />

        {/* Sub text */}
        <p style={{
          fontSize: '0.9rem', color: '#4a5260',
          letterSpacing: '0.05em', maxWidth: 420, margin: '0 auto',
          lineHeight: 1.75,
        }}>
          We're putting together our team page. Check back soon to meet the minds and hearts behind Abhivriddhi.
        </p>

      </div>

      <style>{`
        @keyframes teamDot {
          0%,100% { opacity:1; transform:scale(1); }
          50% { opacity:0.35; transform:scale(0.65); }
        }
      `}</style>
    </div>
  );
}

/* ============================================================
   ORIGINAL TEAM PAGE CODE — COMMENTED OUT
   Uncomment below and remove the export above when ready.
   ============================================================

import { useEffect, useRef, useState } from 'react';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');

  :root {
    --accent: #b8cc8a;
    --accent-glow: rgba(184,204,138,0.08);
    --accent-bg: rgba(184,204,138,0.12);
    --accent-border: rgba(184,204,138,0.22);
    --bg: #0a0d0f;
    --bg2: #0f1316;
    --surface: rgba(255,255,255,0.03);
    --surface2: rgba(255,255,255,0.055);
    --border: rgba(255,255,255,0.07);
    --text: #e8e4dc;
    --text-sub: #7a8490;
    --text-dim: #4a5260;
  }

  .t-root * { box-sizing: border-box; margin: 0; padding: 0; }
  .t-root { font-family: 'DM Sans', sans-serif; background: var(--bg); color: var(--text); min-height: 100vh; }

  .t-hero {
    position: relative; z-index: 1;
    text-align: center; padding: 110px 24px 64px;
    background: #0a0d0f;
  }
  .t-hero::before {
    content: ''; position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 70% 55% at 50% 40%, rgba(184,204,138,0.08) 0%, transparent 70%);
    pointer-events: none;
  }
  .t-hero-grid {
    position: absolute; inset: 0; pointer-events: none;
    background-image:
      linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px);
    background-size: 80px 80px;
    -webkit-mask-image: radial-gradient(ellipse 80% 80% at center, black 30%, transparent 80%);
    mask-image: radial-gradient(ellipse 80% 80% at center, black 30%, transparent 80%);
  }

  .t-badge {
    display: inline-flex; align-items: center; gap: 7px;
    font-size: 0.68rem; letter-spacing: 0.18em; text-transform: uppercase;
    color: var(--accent); border: 1px solid var(--accent-border);
    padding: 5px 14px; border-radius: 20px; margin-bottom: 24px;
    background: var(--accent-glow); font-family: 'DM Sans', sans-serif; font-weight: 500;
  }
  .t-badge-dot {
    width: 6px; height: 6px; border-radius: 50%; background: var(--accent);
    animation: tdot 2s ease-in-out infinite;
  }
  @keyframes tdot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.35;transform:scale(0.65)} }

  .t-hero-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(64px,10vw,120px);
    font-weight: 300; line-height: 1.02; letter-spacing: 0.01em;
  }
  .t-hero-title em { color: transparent; font-style: normal; -webkit-text-stroke: 1px #b8cc8a; }
  .t-char { display: inline-block; opacity: 0; transform: translateY(28px); animation: tchin 0.5s ease forwards; }
  .t-char-space { display: inline-block; width: 0.28em; }
  @keyframes tchin { to { opacity: 1; transform: translateY(0); } }

  .t-hero-sub {
    margin-top: 16px; font-size: 0.9rem; color: var(--text-dim); letter-spacing: 0.05em;
    opacity: 0; animation: tfup 0.6s ease 1s forwards;
  }
  .t-hero-meta {
    display: inline-flex; align-items: center; gap: 8px; margin-top: 18px;
    font-size: 0.74rem; color: var(--text-sub); letter-spacing: 0.07em;
    opacity: 0; animation: tfup 0.6s ease 1.2s forwards;
  }
  .t-meta-dot {
    width: 7px; height: 7px; border-radius: 50%;
    background: var(--accent); box-shadow: 0 0 7px var(--accent);
    animation: tdot 2.5s ease-in-out infinite;
  }
  @keyframes tfup { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }

  .t-divider {
    width: 60px; height: 1px; position: relative; z-index: 1;
    background: linear-gradient(90deg, transparent, var(--accent), transparent);
    margin: 0 auto 72px;
  }

  .t-section {
    position: relative; z-index: 1;
    max-width: 1100px; margin: 0 auto;
    padding: 0 24px 80px;
  }

  .t-section-label {
    font-size: 0.68rem; letter-spacing: 0.28em; text-transform: uppercase;
    color: var(--accent); font-weight: 500; margin-bottom: 40px;
    display: flex; align-items: center; gap: 12px;
  }
  .t-section-label::after {
    content: ''; flex: 1; height: 1px;
    background: linear-gradient(to right, var(--border), transparent);
  }

  .t-lead-grid {
    display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px;
    margin-bottom: 16px;
  }
  .t-lead-grid-2 {
    display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px;
  }
  @media (max-width: 900px) {
    .t-lead-grid, .t-lead-grid-2 { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 480px) {
    .t-lead-grid, .t-lead-grid-2 { grid-template-columns: 1fr; }
  }

  .t-member-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 28px 20px 24px;
    text-align: center;
    position: relative; overflow: hidden;
    transition: border-color 0.3s, background 0.3s, transform 0.3s, box-shadow 0.3s;
    cursor: default;
  }
  .t-member-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, var(--accent), transparent);
    opacity: 0; transition: opacity 0.3s;
  }
  .t-member-card:hover {
    border-color: var(--accent-border);
    background: var(--surface2);
    transform: translateY(-3px);
    box-shadow: 0 10px 32px rgba(0,0,0,0.3);
  }
  .t-member-card:hover::before { opacity: 1; }

  .t-avatar {
    width: 72px; height: 72px; border-radius: 50%;
    background: rgba(184,204,138,0.08);
    border: 1px solid var(--accent-border);
    margin: 0 auto 16px;
    display: flex; align-items: center; justify-content: center;
    overflow: hidden;
  }
  .t-avatar svg { opacity: 0.35; }

  .t-member-role {
    font-size: 0.62rem; letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--accent); margin-bottom: 6px; font-weight: 500;
  }
  .t-member-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.15rem; font-weight: 400; color: var(--text);
    margin-bottom: 4px; line-height: 1.2;
  }
  .t-member-dept {
    font-size: 0.75rem; color: var(--text-dim); letter-spacing: 0.04em;
  }

  .t-domains {
    position: relative; z-index: 1;
    max-width: 1100px; margin: 0 auto;
    padding: 0 24px 100px;
  }

  .t-domain-block { margin-bottom: 48px; }
  .t-domain-header {
    display: flex; align-items: center; gap: 14px;
    margin-bottom: 16px;
  }
  .t-domain-dot {
    width: 8px; height: 8px; border-radius: 50%;
    flex-shrink: 0;
  }
  .t-domain-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.1rem; font-weight: 400; color: var(--text);
    letter-spacing: 0.02em;
  }
  .t-domain-line {
    flex: 1; height: 1px;
    background: linear-gradient(to right, var(--border), transparent);
  }
  .t-domain-count {
    font-size: 0.68rem; color: var(--text-dim);
    letter-spacing: 0.1em;
  }

  .t-domain-grid {
    display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px;
  }
  @media (max-width: 900px) { .t-domain-grid { grid-template-columns: repeat(3, 1fr); } }
  @media (max-width: 480px) { .t-domain-grid { grid-template-columns: repeat(2, 1fr); } }

  .t-domain-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 18px 14px 16px;
    text-align: center;
    position: relative; overflow: hidden;
    transition: border-color 0.3s, background 0.3s, transform 0.25s;
    cursor: default;
  }
  .t-domain-card:hover {
    background: var(--surface2);
    transform: translateY(-2px);
  }

  .t-domain-avatar {
    width: 44px; height: 44px; border-radius: 50%;
    margin: 0 auto 10px;
    display: flex; align-items: center; justify-content: center;
    border: 1px solid;
  }
  .t-domain-avatar svg { opacity: 0.4; }
  .t-domain-member-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 0.95rem; font-weight: 400; color: var(--text);
    margin-bottom: 3px;
  }
  .t-domain-member-role {
    font-size: 0.65rem; color: var(--text-dim);
    letter-spacing: 0.06em; text-transform: uppercase;
  }

  .t-rev { opacity: 0; transform: translateY(20px); transition: opacity 0.6s ease, transform 0.6s ease; }
  .t-rev.visible { opacity: 1; transform: none; }
`;

const AvatarSVG = ({ size = 44 }) => (
  <svg viewBox="0 0 44 44" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
    <circle cx="22" cy="16" r="9" fill="currentColor" />
    <ellipse cx="22" cy="38" rx="14" ry="9" fill="currentColor" />
  </svg>
);

function AnimTitle() {
  const parts = ['Meet', ' ', 'the', ' ', 'Team'];
  let delay = 0.1;
  return (
    <h1 className="t-hero-title" aria-label="Meet the Team">
      {parts.map((w, wi) => {
        if (w === ' ') { delay += 0.04; return <span key={wi} className="t-char-space" />; }
        const isAccent = wi === 4;
        return w.split('').map((ch, ci) => {
          delay += 0.055;
          return isAccent
            ? <em key={`${wi}-${ci}`} className="t-char" style={{ animationDelay: `${delay}s` }}>{ch}</em>
            : <span key={`${wi}-${ci}`} className="t-char" style={{ animationDelay: `${delay}s` }}>{ch}</span>;
        });
      })}
    </h1>
  );
}

const coreTeam = [
  { role: 'President',      name: 'Name', dept: 'Department · Year' },
  { role: 'Vice President', name: 'Name', dept: 'Department · Year' },
  { role: 'Secretary',      name: 'Name', dept: 'Department · Year' },
  { role: 'Treasurer',      name: 'Name', dept: 'Department · Year' },
  { role: 'Technical Head', name: 'Name', dept: 'Department · Year' },
  { role: 'Events Head',    name: 'Name', dept: 'Department · Year' },
  { role: 'Marketing Head', name: 'Name', dept: 'Department · Year' },
  { role: 'Design Head',    name: 'Name', dept: 'Department · Year' },
];

const domains = [
  {
    name: 'Public Relations',
    color: '#b8cc8a',
    members: [
      { name: 'Name', role: 'Head' },
      { name: 'Name', role: 'Co-Head' },
      { name: 'Name', role: 'Member' },
      { name: 'Name', role: 'Member' },
      { name: 'Name', role: 'Member' },
    ],
  },
  {
    name: 'Technical',
    color: '#8ab4cc',
    members: [
      { name: 'Name', role: 'Head' },
      { name: 'Name', role: 'Co-Head' },
      { name: 'Name', role: 'Member' },
      { name: 'Name', role: 'Member' },
      { name: 'Name', role: 'Member' },
    ],
  },
  {
    name: 'Design',
    color: '#cc9e8a',
    members: [
      { name: 'Name', role: 'Head' },
      { name: 'Name', role: 'Co-Head' },
      { name: 'Name', role: 'Member' },
      { name: 'Name', role: 'Member' },
      { name: 'Name', role: 'Member' },
    ],
  },
  {
    name: 'Content',
    color: '#b08acc',
    members: [
      { name: 'Name', role: 'Head' },
      { name: 'Name', role: 'Co-Head' },
      { name: 'Name', role: 'Member' },
      { name: 'Name', role: 'Member' },
      { name: 'Name', role: 'Member' },
    ],
  },
  {
    name: 'Operations',
    color: '#ccb88a',
    members: [
      { name: 'Name', role: 'Head' },
      { name: 'Name', role: 'Co-Head' },
      { name: 'Name', role: 'Member' },
      { name: 'Name', role: 'Member' },
      { name: 'Name', role: 'Member' },
    ],
  },
];

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } },
      { threshold: 0.08 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function CoreSection() {
  const ref = useReveal();
  const ref2 = useReveal();
  return (
    <div className="t-section">
      <div className="t-section-label">Core Committee · 2025–26</div>
      <div className="t-lead-grid t-rev" ref={ref}>
        {coreTeam.slice(0, 4).map((m, i) => (
          <div className="t-member-card" key={i} style={{ transitionDelay: `${i * 60}ms` }}>
            <div className="t-avatar">
              <AvatarSVG size={40} />
            </div>
            <div className="t-member-role">{m.role}</div>
            <div className="t-member-name">{m.name}</div>
            <div className="t-member-dept">{m.dept}</div>
          </div>
        ))}
      </div>
      <div className="t-lead-grid-2 t-rev" ref={ref2}>
        {coreTeam.slice(4).map((m, i) => (
          <div className="t-member-card" key={i} style={{ transitionDelay: `${i * 60}ms` }}>
            <div className="t-avatar">
              <AvatarSVG size={40} />
            </div>
            <div className="t-member-role">{m.role}</div>
            <div className="t-member-name">{m.name}</div>
            <div className="t-member-dept">{m.dept}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DomainBlock({ domain }) {
  const ref = useReveal();
  return (
    <div className="t-domain-block t-rev" ref={ref}>
      <div className="t-domain-header">
        <div className="t-domain-dot" style={{ background: domain.color }} />
        <div className="t-domain-name">{domain.name}</div>
        <div className="t-domain-line" />
        <div className="t-domain-count">{domain.members.length} members</div>
      </div>
      <div className="t-domain-grid">
        {domain.members.map((m, i) => (
          <div className="t-domain-card" key={i} style={{ transitionDelay: `${i * 50}ms` }}>
            <div className="t-domain-avatar" style={{ borderColor: `${domain.color}40`, color: domain.color, background: `${domain.color}10` }}>
              <AvatarSVG size={24} />
            </div>
            <div className="t-domain-member-name">{m.name}</div>
            <div className="t-domain-member-role">{m.role}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Team() {
  return (
    <div className="t-root">
      <style>{styles}</style>

      <div className="t-hero">
        <div className="t-hero-grid" />
        <div style={{ position:'absolute', top:'20%', left:0, right:0, height:1, background:'linear-gradient(to right, transparent, rgba(184,204,138,0.12), transparent)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:'20%', left:0, right:0, height:1, background:'linear-gradient(to right, transparent, rgba(184,204,138,0.12), transparent)', pointerEvents:'none' }} />
        <div className="t-badge"><span className="t-badge-dot" />The People</div>
        <AnimTitle />
        <p className="t-hero-sub">The minds and hearts behind Abhivriddhi</p>
        <div className="t-hero-meta">
          <span className="t-meta-dot" />
          Core Committee & Domain Teams · 2025–26
        </div>
      </div>

      <div className="t-divider" />

      <CoreSection />

      <div className="t-domains">
        <div className="t-section-label">Domain Teams</div>
        {domains.map((d, i) => <DomainBlock key={i} domain={d} />)}
      </div>
    </div>
  );
}

============================================================ */
