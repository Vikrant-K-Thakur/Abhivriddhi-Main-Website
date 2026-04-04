import { useEffect, useRef } from 'react';

export default function Hero() {
  const parallaxRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (!parallaxRef.current) return;
      const xRatio = (e.clientX / window.innerWidth - 0.5) * 12;
      const yRatio = (e.clientY / window.innerHeight - 0.5) * 8;
      parallaxRef.current.style.transform = `translate(${xRatio}px, ${yRatio}px)`;
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  return (
    <section id="hero">
      <div className="hero-left">
        <div className="hero-eyebrow">Academic Excellence · Est. 2022</div>
        <h1 className="hero-h1">
          Elevate
          <span className="accent-word">Potential</span>
        </h1>
        <p className="hero-tagline">Crafting Excellence</p>
        <p className="hero-desc">A prestigious sanctuary for the modern academic. We bridge the gap between technical prowess and professional presence through curated soft-skill mastery.</p>
        <a href="#philosophy" className="btn-primary">
          Explore More <span className="btn-arrow">→</span>
        </a>
      </div>

      <div className="hero-right">
        <div className="hero-img-wrap">
          <div className="parallax-layer" ref={parallaxRef}>
            <svg viewBox="0 0 600 420" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
              <defs>
                <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1a2030"/>
                  <stop offset="100%" stopColor="#0a0d14"/>
                </linearGradient>
                <linearGradient id="towerGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#1c2535"/>
                  <stop offset="50%" stopColor="#263040"/>
                  <stop offset="100%" stopColor="#1c2535"/>
                </linearGradient>
                <linearGradient id="towerHighlight" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#2a3a50"/>
                  <stop offset="40%" stopColor="#354a65"/>
                  <stop offset="100%" stopColor="#2a3a50"/>
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
              </defs>
              <rect width="600" height="420" fill="url(#skyGrad)"/>
              <ellipse cx="300" cy="280" rx="350" ry="120" fill="rgba(184,204,138,0.02)"/>
              <rect x="20" y="180" width="30" height="240" fill="#111820" opacity="0.6"/>
              <rect x="55" y="200" width="22" height="220" fill="#111820" opacity="0.5"/>
              <rect x="540" y="170" width="35" height="250" fill="#111820" opacity="0.6"/>
              <rect x="510" y="195" width="24" height="225" fill="#111820" opacity="0.5"/>
              <polygon points="220,60 240,60 300,420 180,420" fill="url(#towerGrad)"/>
              <polygon points="240,60 260,60 315,420 195,420" fill="url(#towerHighlight)" opacity="0.5"/>
              <polygon points="340,80 360,80 410,420 290,420" fill="url(#towerGrad)"/>
              <polygon points="360,80 375,80 422,420 306,420" fill="url(#towerHighlight)" opacity="0.45"/>
              <polygon points="265,20 285,20 345,420 215,420" fill="#1e2d42"/>
              <polygon points="285,20 305,20 360,420 238,420" fill="#2a3d58" opacity="0.7"/>
              <polygon points="295,30 310,30 365,420 248,420" fill="#354d6e" opacity="0.4"/>
              <line x1="275" y1="20" x2="295" y2="20" stroke="rgba(184,204,138,0.4)" strokeWidth="1" filter="url(#glow)"/>
              <line x1="350" y1="80" x2="365" y2="80" stroke="rgba(184,204,138,0.25)" strokeWidth="1"/>
              <rect x="272" y="80" width="2" height="2" fill="rgba(184,204,138,0.5)" filter="url(#glow)"/>
              <rect x="280" y="120" width="2" height="2" fill="rgba(184,204,138,0.4)"/>
              <rect x="268" y="150" width="2" height="2" fill="rgba(184,204,138,0.3)"/>
              <rect x="355" y="110" width="2" height="2" fill="rgba(184,204,138,0.4)" filter="url(#glow)"/>
              <rect x="0" y="300" width="600" height="120" fill="url(#skyGrad)" opacity="0.5"/>
            </svg>
          </div>
        </div>
        <div className="hero-card">
          <div className="hero-card-label">The Philosophy of Growth</div>
          <div className="hero-card-text">Building foundations that withstand the test of global excellence.</div>
        </div>
      </div>
    </section>
  );
}
