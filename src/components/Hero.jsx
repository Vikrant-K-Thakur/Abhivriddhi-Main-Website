import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import videoMp4 from '../assets/logo-anim-1.mp4';
import videoWebm from '../assets/logo-anim-2.webm';

const ORBS = [
  { cx: '75%', cy: '20%', r: '320px', color: 'rgba(184,204,138,0.07)', delay: '0s' },
  { cx: '85%', cy: '65%', r: '240px', color: 'rgba(138,180,204,0.05)', delay: '2s' },
  { cx: '60%', cy: '80%', r: '180px', color: 'rgba(184,204,138,0.04)', delay: '4s' },
];

export default function Hero() {
  const orbRef = useRef(null);
  const canvasRef = useRef(null);
  const committeeRef = useRef(null);

  const handleCommitteeMove = (e) => {
    const el = committeeRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty('--cx', `${x}%`);
    el.style.setProperty('--cy', `${y}%`);
    el.style.setProperty('--glow', '1');
  };

  const handleCommitteeLeave = () => {
    const el = committeeRef.current;
    if (!el) return;
    el.style.setProperty('--glow', '0');
  };

  // Subtle mouse parallax on orbs
  useEffect(() => {
    const handler = (e) => {
      if (!orbRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 18;
      const y = (e.clientY / window.innerHeight - 0.5) * 12;
      orbRef.current.style.transform = `translate(${x}px, ${y}px)`;
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.4 + 0.3,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      o: Math.random() * 0.45 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(184,204,138,${p.o})`;
        ctx.fill();
      });
      // draw faint connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 90) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(184,204,138,${0.06 * (1 - dist / 90)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <section id="hero">
      {/* Particle canvas background */}
      <canvas ref={canvasRef} className="hero-canvas" />

      {/* Animated gradient orbs */}
      <div className="hero-orbs" ref={orbRef}>
        {ORBS.map((o, i) => (
          <div key={i} className="hero-orb" style={{
            left: o.cx, top: o.cy,
            width: o.r, height: o.r,
            background: `radial-gradient(circle, ${o.color} 0%, transparent 70%)`,
            animationDelay: o.delay,
          }} />
        ))}
      </div>

      <div className="hero-left">
        <div className="hero-eyebrow">
          <span className="hero-eyebrow-dot" />
          Academic Excellence · Est. 2022
        </div>
        <h1 className="hero-h1">
          Abhivriddhi
          <span
            className="accent-word committee-word"
            ref={committeeRef}
            onMouseMove={handleCommitteeMove}
            onMouseLeave={handleCommitteeLeave}
          >
            Student Training and Development Committee
          </span>
        </h1>
        <p className="hero-tagline">Fostering change and impacting lives.</p>
        <p className="hero-desc">The official Student Training and Development Committee of VIT Pune, committed to fostering growth, leadership, and excellence. Through impactful events, skill-building workshops, and mentorship initiatives, we empower students to unlock their potential and shape a brighter future.
</p>
        <div className="hero-cta-row">
          <Link to="/about" className="btn-primary">
            Explore More <span className="btn-arrow">→</span>
          </Link>
          <Link to="/events" className="btn-ghost">
            View Events
          </Link>
        </div>

        {/* Marquee strip */}
        <div className="hero-marquee-wrap">
          <div className="hero-marquee">
            {['Leadership', 'Innovation', 'Excellence', 'Growth', 'Community', 'Impact', 'Vision', 'Mastery'].map((w, i) => (
              <span key={i} className="hero-marquee-item">
                <span className="hero-marquee-dot">✦</span> {w}
              </span>
            ))}
            {['Leadership', 'Innovation', 'Excellence', 'Growth', 'Community', 'Impact', 'Vision', 'Mastery'].map((w, i) => (
              <span key={`b${i}`} className="hero-marquee-item" aria-hidden>
                <span className="hero-marquee-dot">✦</span> {w}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="hero-right">
        <div className="hero-video-wrap">
          <video
            className="hero-video"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={videoWebm} type="video/webm" />
            <source src={videoMp4} type="video/mp4" />
          </video>
          <div className="hero-video-glow" />
        </div>
                                                                                                                  </div>
    </section>
  );
}
