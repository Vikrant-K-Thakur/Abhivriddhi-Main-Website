import { useEffect, useRef, useState } from 'react';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');

  :root {
    --accent: #b8cc8a;
    --accent-glow: rgba(184,204,138,0.08);
    --accent-bg: rgba(184,204,138,0.12);
    --accent-border: rgba(184,204,138,0.22);
    --bg: #0a0d0f;
    --surface: rgba(255,255,255,0.03);
    --surface-hover: rgba(255,255,255,0.055);
    --border: rgba(255,255,255,0.07);
    --text: #e8e4dc;
    --text-sub: #7a8490;
    --text-dim: #4a5260;
  }

  .s-root * { box-sizing: border-box; margin: 0; padding: 0; }
  .s-root { font-family: 'DM Sans', sans-serif; background: var(--bg); color: var(--text); min-height: 100vh; }

  /* ── HERO ── */
  .s-hero {
    position: relative; z-index: 1;
    min-height: 100vh;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    text-align: center; padding: clamp(80px,12vw,120px) clamp(16px,4vw,24px);
    background: #0a0d0f;
  }
  .s-hero::before {
    content: ''; position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 70% 55% at 50% 40%, rgba(184,204,138,0.08) 0%, transparent 70%);
    pointer-events: none;
  }
  .s-hero-grid {
    position: absolute; inset: 0; pointer-events: none;
    background-image:
      linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px);
    background-size: 80px 80px;
    -webkit-mask-image: radial-gradient(ellipse 80% 80% at center, black 30%, transparent 80%);
    mask-image: radial-gradient(ellipse 80% 80% at center, black 30%, transparent 80%);
  }

  .s-badge {
    display: inline-flex; align-items: center; gap: 7px;
    font-size: 0.68rem; letter-spacing: 0.18em; text-transform: uppercase;
    color: var(--accent); border: 1px solid var(--accent-border);
    padding: 5px 14px; border-radius: 20px; margin-bottom: 24px;
    background: var(--accent-glow);
  }
  .s-badge-dot {
    width: 6px; height: 6px; border-radius: 50%; background: var(--accent);
    animation: sdot 2s ease-in-out infinite;
  }
  @keyframes sdot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.35;transform:scale(0.65)} }

  .s-hero-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(64px,10vw,120px);
    font-weight: 300; line-height: 1.02; letter-spacing: 0.01em;
  }
  .s-hero-title em { color: transparent; font-style: normal; -webkit-text-stroke: 1px #b8cc8a; }
  .s-char { display: inline-block; opacity: 0; transform: translateY(28px); animation: schin 0.5s ease forwards; }
  .s-char-space { display: inline-block; width: 0.28em; }
  @keyframes schin { to { opacity: 1; transform: translateY(0); } }

  .s-hero-sub {
    margin-top: 16px; font-size: 0.9rem; color: var(--text-dim); letter-spacing: 0.05em;
    opacity: 0; animation: sfup 0.6s ease 1s forwards;
  }
  .s-hero-meta {
    display: inline-flex; align-items: center; gap: 8px; margin-top: 18px;
    font-size: 0.74rem; color: var(--text-sub); letter-spacing: 0.07em;
    opacity: 0; animation: sfup 0.6s ease 1.2s forwards;
  }
  .s-meta-dot {
    width: 7px; height: 7px; border-radius: 50%;
    background: var(--accent); box-shadow: 0 0 7px var(--accent);
    animation: sdot 2.5s ease-in-out infinite;
  }
  @keyframes sfup { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }

  .s-divider {
    width: 60px; height: 1px; position: relative; z-index: 1;
    background: linear-gradient(90deg, transparent, var(--accent), transparent);
    margin: 0 auto 60px;
  }

  /* ── SPONSORS GRID ── */
  .s-section {
    position: relative; z-index: 1;
    max-width: 1100px; margin: 0 auto;
    padding: 0 clamp(12px,3vw,24px);
  }

  .s-section-label {
    font-size: 0.68rem; letter-spacing: 0.28em; text-transform: uppercase;
    color: var(--accent); font-weight: 500; margin-bottom: 32px;
    display: flex; align-items: center; gap: 12px;
  }
  .s-section-label::after {
    content: ''; flex: 1; height: 1px;
    background: linear-gradient(to right, var(--border), transparent);
  }

  .s-logo-grid {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;
    margin-bottom: 80px;
  }
  @media (max-width: 700px) { .s-logo-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 400px) { .s-logo-grid { grid-template-columns: 1fr; } }

  .s-logo-cell {
    height: 100px; border-radius: 12px;
    border: 1px solid var(--border);
    background: rgba(255,255,255,0.02);
    display: flex; align-items: center; justify-content: center;
    position: relative; overflow: hidden; cursor: default;
    transition: border-color 0.3s, background 0.3s, transform 0.25s, box-shadow 0.25s;
  }
  .s-logo-cell::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, var(--accent), transparent);
    opacity: 0; transition: opacity 0.3s;
  }
  .s-logo-cell:hover {
    border-color: var(--accent-border);
    background: var(--accent-glow);
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.3);
  }
  .s-logo-cell:hover::before { opacity: 1; }
  .s-logo-cell:hover .s-logo-name { color: var(--accent); }

  .s-logo-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1rem; font-weight: 400;
    color: var(--text-dim); letter-spacing: 0.06em;
    transition: color 0.3s; text-align: center; padding: 0 16px;
    pointer-events: none;
  }

  /* ── CTA ── */
  .s-cta {
    position: relative; z-index: 1;
    max-width: 1100px; margin: 0 auto;
    padding: 0 clamp(12px,3vw,24px) clamp(60px,10vw,100px);
  }
  .s-cta-inner {
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 56px 60px;
    background: rgba(255,255,255,0.02);
    position: relative; overflow: hidden;
    display: grid; grid-template-columns: 1fr auto;
    gap: 48px; align-items: center;
  }
  .s-cta-inner::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, var(--accent), transparent);
  }
  .s-cta-inner::after {
    content: ''; position: absolute; inset: 0; pointer-events: none;
    background: radial-gradient(ellipse 60% 80% at 80% 50%, rgba(184,204,138,0.04) 0%, transparent 70%);
  }
  @media (max-width: 700px) {
    .s-cta-inner { grid-template-columns: 1fr; padding: 28px 20px; gap: 24px; }
  }
  @media (max-width: 480px) {
    .s-cta-inner { padding: 24px 16px; }
  }

  .s-cta-label {
    font-size: 0.68rem; letter-spacing: 0.22em; text-transform: uppercase;
    color: var(--accent); margin-bottom: 14px;
  }
  .s-cta-heading {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(1.8rem, 3vw, 2.6rem);
    font-weight: 300; line-height: 1.2;
    color: var(--text); margin-bottom: 14px;
  }
  .s-cta-heading em { font-style: italic; color: var(--accent); }
  .s-cta-body {
    font-size: 0.88rem; color: var(--text-sub);
    line-height: 1.85; font-weight: 300; max-width: 520px;
  }

  .s-btn {
    display: inline-flex; align-items: center; gap: 9px;
    padding: 14px 32px; border-radius: 8px;
    background: var(--accent); color: #0d0d0d;
    font-family: 'DM Sans', sans-serif; font-size: 0.87rem; font-weight: 500;
    border: none; cursor: pointer; letter-spacing: 0.04em; text-decoration: none;
    white-space: nowrap;
    transition: opacity 0.2s, transform 0.2s, background 0.2s;
  }
  .s-btn:hover { opacity: 0.85; transform: translateY(-2px); }

  .s-btn-ghost {
    display: inline-flex; align-items: center; gap: 9px;
    padding: 13px 28px; border-radius: 8px;
    background: transparent; border: 1px solid var(--border);
    color: var(--text-sub);
    font-family: 'DM Sans', sans-serif; font-size: 0.85rem; font-weight: 400;
    cursor: pointer; letter-spacing: 0.03em; text-decoration: none;
    white-space: nowrap;
    transition: border-color 0.25s, color 0.25s, background 0.25s, transform 0.2s;
  }
  .s-btn-ghost:hover { border-color: var(--accent-border); color: var(--accent); background: var(--accent-glow); transform: translateY(-2px); }

  /* ── REVEAL ── */
  .s-rev { opacity: 0; transform: translateY(20px); transition: opacity 0.6s ease, transform 0.6s ease; }
  .s-rev.visible { opacity: 1; transform: none; }

  /* ── FAB ── */
  .s-fab {
    position: fixed; bottom: 28px; right: 28px; z-index: 50;
    background: var(--accent); color: #0d0d0d;
    border: none; border-radius: 50px; padding: 10px 20px;
    font-family: 'DM Sans', sans-serif; font-size: 0.8rem; font-weight: 500;
    cursor: pointer; display: flex; align-items: center; gap: 7px;
    box-shadow: 0 4px 20px rgba(184,204,138,0.22);
    transition: opacity 0.3s, transform 0.3s;
    opacity: 0; pointer-events: none; transform: translateY(10px);
  }
  .s-fab.on { opacity: 1; pointer-events: auto; transform: translateY(0); }
  .s-fab:hover { opacity: 0.85; }
`;

function AnimTitle() {
  const parts = ['Our', ' ', 'Sponsors'];
  let delay = 0.1;
  return (
    <h1 className="s-hero-title" aria-label="Our Sponsors">
      {parts.map((w, wi) => {
        if (w === ' ') { delay += 0.04; return <span key={wi} className="s-char-space" />; }
        return w.split('').map((ch, ci) => {
          delay += 0.055;
          return wi === 2
            ? <em key={`${wi}-${ci}`} className="s-char" style={{ animationDelay: `${delay}s` }}>{ch}</em>
            : <span key={`${wi}-${ci}`} className="s-char" style={{ animationDelay: `${delay}s` }}>{ch}</span>;
        });
      })}
    </h1>
  );
}

const sponsors = [
  'Sponsor Name', 'Sponsor Name', 'Sponsor Name',
  'Sponsor Name', 'Sponsor Name', 'Sponsor Name',
  'Sponsor Name', 'Sponsor Name', 'Sponsor Name',
];

export default function Sponsors() {
  const logoRef = useRef(null);
  const ctaRef  = useRef(null);
  const [showFab, setShowFab] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
      }),
      { threshold: 0.08 }
    );
    [logoRef, ctaRef].forEach(r => r.current && obs.observe(r.current));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const fn = () => setShowFab(window.scrollY > 260);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <div className="s-root">
      <style>{styles}</style>

      {/* HERO */}
      <div className="s-hero">
        <div className="s-hero-grid" />
        <div style={{ position:'absolute', top:'20%', left:0, right:0, height:1, background:'linear-gradient(to right, transparent, rgba(184,204,138,0.12), transparent)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:'20%', left:0, right:0, height:1, background:'linear-gradient(to right, transparent, rgba(184,204,138,0.12), transparent)', pointerEvents:'none' }} />
        <div className="s-badge"><span className="s-badge-dot" />Our Partners</div>
        <AnimTitle />
        <p className="s-hero-sub">Organizations that believe in our mission and make it possible</p>
        <div className="s-hero-meta">
          <span className="s-meta-dot" />
          Actively seeking new partners for 2024–25
        </div>
      </div>

      <div className="s-divider" />

      {/* SPONSOR LOGOS */}
      <div className="s-section">
        <div className="s-section-label">Partner Brands</div>
        <div className="s-logo-grid s-rev" ref={logoRef}>
          {sponsors.map((name, i) => (
            <div key={i} className="s-logo-cell" style={{ transitionDelay: `${i * 50}ms` }}>
              <span className="s-logo-name">{name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="s-cta">
        <div className="s-cta-inner s-rev" ref={ctaRef}>
          <div>
            <div className="s-cta-label">Partner With Us</div>
            <h2 className="s-cta-heading">
              Become a <em>Sponsor</em>
            </h2>
            <p className="s-cta-body">
              Align your brand with the next generation of leaders. Our sponsorship packages offer genuine value — from brand exposure and recruitment access to community impact. Reach out and let's build something meaningful together.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, position: 'relative', zIndex: 1 }}>
            <a href="/contact" className="s-btn">Get in Touch →</a>
            <a href="mailto:abhivriddhi@vit.edu" className="s-btn-ghost">abhivriddhi@vit.edu</a>
          </div>
        </div>
      </div>

      <button
        className={`s-fab ${showFab ? 'on' : ''}`}
        onClick={() => ctaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
      >
        Become a Sponsor →
      </button>
    </div>
  );
}
