import { useEffect, useRef, useState } from 'react';

const T = {
  bg:          '#0a0d0f',
  bg2:         '#0f1316',
  surface:     '#131820',
  accent:      '#b8cc8a',
  accentHov:   '#cde09e',
  text:        '#ffffff',
  textMuted:   'rgba(255,255,255,0.75)',
  textDim:     'rgba(255,255,255,0.45)',
  border:      'rgba(184,204,138,0.12)',
  borderSub:   'rgba(255,255,255,0.06)',
  fontSerif:   "'Cormorant Garamond', serif",
  fontSans:    "'Montserrat', sans-serif",
};

function useReveal(threshold = 0.1) {
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { e.target.classList.add('ab-on'); obs.unobserve(e.target); }
    }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function AnimHeading() {
  const lines = [
    { text: 'Who We', accent: false },
    { text: 'Are.',   accent: true  },
  ];
  let delay = 0.12;
  return (
    <h1 style={{
      fontFamily: T.fontSerif, fontWeight: 300,
      fontSize: 'clamp(64px,10vw,120px)',
      lineHeight: 1.02, letterSpacing: '0.01em',
      marginBottom: 0,
    }} aria-label="Who We Are">
      {lines.map((line, li) => (
        <span key={li} style={{ display: 'block' }}>
          {line.text.split('').map((ch, ci) => {
            delay += 0.055;
            const d = delay;
            if (ch === ' ') return <span key={ci} style={{ display: 'inline-block', width: '0.28em' }} />;
            return line.accent
              ? <span key={ci} className="ab-char" style={{ animationDelay: `${d}s`, color: 'transparent', WebkitTextStroke: `1px ${T.accent}` }}>{ch}</span>
              : <span key={ci} className="ab-char" style={{ animationDelay: `${d}s` }}>{ch}</span>;
          })}
        </span>
      ))}
    </h1>
  );
}

/* ── HERO ── */
function Hero() {
  return (
    <section style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      textAlign: 'center', padding: 'clamp(80px,12vw,120px) clamp(16px,4vw,32px)',
      position: 'relative', overflow: 'hidden', background: T.bg,
    }}>
      <div style={{ position:'absolute', inset:0, pointerEvents:'none',
        background:'radial-gradient(ellipse 70% 55% at 50% 40%, rgba(184,204,138,0.08) 0%, transparent 70%)' }} />
      <div style={{ position:'absolute', inset:0, pointerEvents:'none',
        backgroundImage:'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
        backgroundSize:'80px 80px',
        WebkitMaskImage:'radial-gradient(ellipse 80% 80% at center, black 30%, transparent 80%)',
        maskImage:'radial-gradient(ellipse 80% 80% at center, black 30%, transparent 80%)' }} />
      <div style={{ position:'absolute', top:'20%', left:0, right:0, height:1, background:'linear-gradient(to right, transparent, rgba(184,204,138,0.12), transparent)' }} />
      <div style={{ position:'absolute', bottom:'20%', left:0, right:0, height:1, background:'linear-gradient(to right, transparent, rgba(184,204,138,0.12), transparent)' }} />

      <div style={{ position:'relative', zIndex:2, display:'flex', flexDirection:'column', alignItems:'center', gap:'1.5rem' }}>
        {/* Badge */}
        <div style={{
          display:'inline-flex', alignItems:'center', gap:7,
          fontSize:'0.68rem', letterSpacing:'0.18em', textTransform:'uppercase',
          color: T.accent, border:`1px solid ${T.accent}38`,
          padding:'5px 14px', borderRadius:20, background:`${T.accent}12`,
          fontFamily: T.fontSans, fontWeight:500,
        }} className="ab-hero-badge">
          <span style={{ width:6, height:6, borderRadius:'50%', background:T.accent, animation:'ab-dot 2s ease-in-out infinite' }} />
          Student Training &amp; Development Committee
        </div>

        <AnimHeading />

        <p style={{
          fontFamily: T.fontSans, fontSize:'0.95rem', lineHeight:1.9,
          color: T.textMuted, maxWidth:500, margin:'0 auto',
        }} className="ab-hero-sub">
          Abhivriddhi — meaning growth and prosperity in Sanskrit — is a student-driven community built on the belief that every student has the potential to evolve, lead, and create impact when given the right opportunities and environment.
        </p>

        <div style={{ display:'flex', gap:16, flexWrap:'wrap', justifyContent:'center', marginTop:8 }} className="ab-hero-btns">
          <a href="#about-s" style={{
            fontFamily: T.fontSans, fontSize:'0.8rem', fontWeight:500,
            letterSpacing:'0.08em', color: T.bg, background: T.accent,
            border:'none', borderRadius:8, padding:'12px 32px',
            cursor:'pointer', textDecoration:'none',
            transition:'background 0.3s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = T.accentHov}
          onMouseLeave={e => e.currentTarget.style.background = T.accent}
          >Explore More</a>
          <a href="#vmo" style={{
            fontFamily: T.fontSans, fontSize:'0.8rem', fontWeight:400,
            color: T.textMuted, background:'transparent',
            border:`1px solid ${T.borderSub}`, borderRadius:8,
            padding:'12px 32px', cursor:'pointer', textDecoration:'none',
            transition:'border-color 0.3s, color 0.3s',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor=`${T.accent}50`; e.currentTarget.style.color=T.accent; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor=T.borderSub; e.currentTarget.style.color=T.textMuted; }}
          >Our Mission</a>
        </div>

        <div style={{ display:'flex', alignItems:'center', gap:'0.8rem', marginTop:8 }}>
          <div style={{ width:32, height:1, background:T.accent, opacity:0.4 }} />
          <span style={{ fontFamily:T.fontSans, fontSize:'0.72rem', color:T.textDim, letterSpacing:'0.15em', textTransform:'uppercase' }}>Scroll to explore</span>
          <div style={{ width:32, height:1, background:T.accent, opacity:0.4 }} />
        </div>
      </div>
    </section>
  );
}

/* ── STATS ── */
function Stats() {
  const ref = useRef(null);
  const hasRun = useRef(false);
  const stats = [
    { target: 500, suffix: '+', label: 'Active Members' },
    { target: 60,  suffix: '+', label: 'Events Hosted' },
    { target: 3,   suffix: '+', label: 'Years of Impact' },
    { target: 95,  suffix: '%', label: 'Satisfaction Rate' },
  ];
  const [counts, setCounts] = useState(stats.map(() => '0'));

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || hasRun.current) return;
      hasRun.current = true;
      stats.forEach(({ target, suffix }, i) => {
        const dur = 1800, start = performance.now();
        const tick = (now) => {
          const p = Math.min((now - start) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setCounts(prev => { const n = [...prev]; n[i] = Math.floor(eased * target) + suffix; return n; });
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} style={{
      padding:'clamp(2.5rem, 6vw, 4rem) clamp(1rem, 4vw, 4rem)', background:`rgba(184,204,138,0.02)`,
      borderTop:`1px solid ${T.border}`, borderBottom:`1px solid ${T.border}`,
    }}>
      <div style={{ maxWidth:1100, margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1.5rem' }}
        className="ab-stat-grid">
        {stats.map((s, i) => (
          <div key={s.label} className="ab-reveal ab-stat-card" style={{ transitionDelay:`${i*80}ms` }}>
            <div style={{
              fontFamily: T.fontSerif, fontWeight:300,
              fontSize:'clamp(2.2rem,4vw,3.2rem)', color: T.accent,
              lineHeight:1, marginBottom:'0.5rem', letterSpacing:'-0.02em',
            }} className="ab-stat-num">{counts[i]}</div>
            <div style={{
              fontFamily: T.fontSans, fontSize:'0.66rem',
              letterSpacing:'0.2em', textTransform:'uppercase',
              color: T.textDim,
            }} className="ab-stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── ABOUT SPLIT ── */
function AboutSplit() {
  const ref = useReveal();
  const ref2 = useReveal();
  return (
    <section id="about-s" style={{
      padding:'clamp(3rem, 8vw, 7rem) clamp(1rem, 4vw, 4rem)', borderBottom:`1px solid ${T.borderSub}`,
    }}>
      <div style={{ maxWidth:1100, margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'5rem', alignItems:'center' }}
        className="ab-split-grid">
        {/* Visual left */}
        <div ref={ref} className="ab-reveal ab-rl" style={{
          borderRadius:22, overflow:'hidden', position:'relative',
          aspectRatio:'4/3',
          background:`linear-gradient(135deg, rgba(184,204,138,0.07) 0%, rgba(184,204,138,0.02) 100%)`,
          border:`1px solid ${T.border}`,
          display:'flex', alignItems:'center', justifyContent:'center',
        }}>
          <div style={{ position:'absolute', inset:0,
            backgroundImage:`linear-gradient(rgba(184,204,138,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(184,204,138,0.04) 1px, transparent 1px)`,
            backgroundSize:'32px 32px' }} />
          {[200,130,70].map((s,i) => (
            <div key={s} style={{
              position:'absolute', top:'50%', left:'50%',
              transform:'translate(-50%,-50%)',
              width:s, height:s, borderRadius:'50%',
              border:`1px solid rgba(184,204,138,${0.14 - i*0.03})`,
              background: i===2 ? 'rgba(184,204,138,0.08)' : 'transparent',
            }} />
          ))}
          <div style={{ position:'relative', zIndex:2, textAlign:'center' }}>
            <div style={{ fontFamily:T.fontSerif, fontSize:'4rem', fontWeight:300, color:'rgba(184,204,138,0.55)' }}>A</div>
            <div style={{ fontFamily:T.fontSans, fontSize:'0.6rem', letterSpacing:'0.3em', textTransform:'uppercase', color:'rgba(184,204,138,0.4)', marginTop:'0.4rem' }}>Abhivriddhi</div>
          </div>
        </div>

        {/* Text right */}
        <div ref={ref2} className="ab-reveal ab-rr">
          <span style={{ fontFamily:T.fontSans, fontSize:'0.63rem', letterSpacing:'0.28em', textTransform:'uppercase', color:T.accent, display:'block', marginBottom:'1rem' }} className="ab-split-label">Student Training &amp; Development Committee</span>
          <h2 style={{ fontFamily:T.fontSerif, fontWeight:300, fontSize:'clamp(1.9rem,3.8vw,2.8rem)', lineHeight:1.18, color:T.text, marginBottom:'1.5rem' }} className="ab-split-h2">
            Where Potential Evolves Into <em style={{ color:T.accent, fontStyle:'italic' }}>Growth.</em>
          </h2>
          <p style={{ fontFamily:T.fontSans, fontWeight:300, fontSize:'0.92rem', lineHeight:1.9, color:T.textMuted, marginBottom:'1.4rem' }} className="ab-split-p">
            Abhivriddhi — meaning growth and prosperity in Sanskrit — is a student-driven community built on the belief that every student has the potential to evolve, lead, and create impact when given the right opportunities and environment.
            We aim to bridge the gap between academics and real-world readiness through mentorship, collaborative initiatives, skill development, and meaningful experiences that encourage both personal and professional growth.
            At Abhivriddhi, growth is not limited to achievements alone — it is reflected in leadership, creativity, teamwork, confidence, and the journey of becoming a better version of oneself alongside a community that grows together.
          </p>
          
          <div style={{ borderLeft:`2px solid ${T.accent}`, padding:'1rem 1.3rem', background:`rgba(184,204,138,0.05)`, borderRadius:'0 10px 10px 0' }}>
            <p style={{ fontFamily:T.fontSerif, fontStyle:'italic', fontWeight:300, fontSize:'1rem', color:'rgba(232,228,220,0.65)', lineHeight:1.6 }} className="ab-split-quote">
              "Growth is not a destination; it is the continuous process of becoming" ✨
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── VMO CARDS ── */
function VMO() {
  const hRef = useReveal();
  const cards = [
    { num:'01', title:'Vision', body:'To be a leading student development community that inspires growth, nurtures leadership, and empowers every student to realize their fullest potential.' },
    { num:'02', title:'Mission', body:'To create transformative learning experiences through training, mentorship, industry interaction, and skill-building initiatives that prepare students for success beyond the classroom.' },
    { num:'03', title:'Objectives', body:'Abhivriddhi aims to foster personal and professional growth among students by bridging the gap between academics and industry expectations. Through practical learning experiences, the committee focuses on developing leadership, confidence, teamwork, and continuous self-growth within a community driven by innovation and excellence.' },
  ];
  return (
    <section id="vmo" style={{ padding:'clamp(3rem, 8vw, 7rem) clamp(1rem, 4vw, 4rem)', borderBottom:`1px solid ${T.borderSub}`, background: T.bg2 }}>
      <div ref={hRef} className="ab-reveal" style={{ textAlign:'center', marginBottom:'4rem' }}>
        <span style={{ fontFamily:T.fontSans, fontSize:'0.63rem', letterSpacing:'0.28em', textTransform:'uppercase', color:T.accent, display:'block', marginBottom:'0.8rem' }} className="ab-vmo-label">What Drives Us</span>
        <h2 style={{ fontFamily:T.fontSerif, fontWeight:300, fontSize:'clamp(2rem,4vw,3rem)', color:T.text, letterSpacing:'-0.02em' }} className="ab-vmo-h2">
          Our Vision, Mission &amp; <em style={{ color:T.accent, fontStyle:'italic' }}>Objectives</em>
        </h2>
      </div>
      <div style={{ maxWidth:1100, margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1.5rem' }}
        className="ab-vmo-grid">
        {cards.map((c, i) => {
          const r = useReveal();
          return (
            <div key={c.num} ref={r} className="ab-reveal ab-vmo-card" style={{ transitionDelay:`${i*100}ms` }}>
              <div style={{
                width:44, height:44, background:`rgba(184,204,138,0.1)`,
                border:`1px solid rgba(184,204,138,0.2)`, borderRadius:12,
                display:'flex', alignItems:'center', justifyContent:'center',
                fontFamily:T.fontSerif, fontSize:'0.95rem', color:T.accent,
                marginBottom:'1.5rem',
              }} className="ab-vmo-num">{c.num}</div>
              <div style={{ fontFamily:T.fontSerif, fontWeight:400, fontSize:'1.4rem', color:T.text, marginBottom:'0.8rem' }} className="ab-vmo-title">{c.title}</div>
              <p style={{ fontFamily:T.fontSans, fontWeight:300, fontSize:'0.83rem', lineHeight:1.88, color:T.textMuted }} className="ab-vmo-body">{c.body}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ── MARQUEE ── */
function Marquee() {
  const words = ['Training','Mentorship','Leadership','Innovation','Excellence','Community','Growth','Purpose'];
  return (
    <div style={{ borderTop:`1px solid ${T.border}`, borderBottom:`1px solid ${T.border}`, padding:'1rem 0', overflow:'hidden', background:`rgba(184,204,138,0.02)` }}>
      <div style={{ display:'flex', gap:'2.5rem', width:'max-content', animation:'ab-ticker 30s linear infinite' }}>
        {[...words,...words].map((w, i) => (
          <span key={i} style={{ fontFamily:T.fontSerif, fontSize:'0.95rem', letterSpacing:'0.1em', color:`rgba(232,228,220,${i%2===0?0.4:0.2})`, whiteSpace:'nowrap' }}>
            {w}<span style={{ marginLeft:'2.5rem', color:'rgba(184,204,138,0.22)' }}>·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

const aboutStyles = `
  @keyframes ab-charIn { to { opacity:1; transform:translateY(0); } }
  @keyframes ab-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.35;transform:scale(0.65)} }
  @keyframes ab-ticker { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }

  .ab-char {
    display:inline-block; opacity:0; transform:translateY(60%);
    animation: ab-charIn 0.7s cubic-bezier(0.16,1,0.3,1) forwards;
  }

  .ab-reveal {
    opacity:0; transform:translateY(28px);
    transition: opacity 0.85s cubic-bezier(0.16,1,0.3,1), transform 0.85s cubic-bezier(0.16,1,0.3,1);
  }
  .ab-rl { transform: translateX(-26px); }
  .ab-rr { transform: translateX(26px); }
  .ab-reveal.ab-on { opacity:1; transform:none; }

  .ab-stat-card {
    background: rgba(184,204,138,0.04);
    border: 1px solid rgba(184,204,138,0.1);
    border-radius: 16px; padding: 2.2rem 1.8rem; text-align:center;
    transition: border-color .35s, background .35s, transform .35s;
    cursor:default;
  }
  .ab-stat-card:hover { border-color:rgba(184,204,138,0.28); background:rgba(184,204,138,0.07); transform:translateY(-4px); }

  .ab-vmo-card {
    background: rgba(184,204,138,0.04);
    border: 1px solid rgba(184,204,138,0.1);
    border-radius: 20px; padding: 2.4rem 2rem;
    transition: border-color .35s, background .35s, transform .35s;
    cursor:default;
  }
  .ab-vmo-card:hover { border-color:rgba(184,204,138,0.3); background:rgba(184,204,138,0.07); transform:translateY(-5px); }

  @media (max-width:900px) {
    .ab-split-grid { grid-template-columns:1fr !important; gap:2.5rem !important; }
    .ab-vmo-grid   { grid-template-columns:1fr !important; }
    .ab-stat-grid  { grid-template-columns:1fr 1fr !important; }
    .ab-rl, .ab-rr { transform: translateY(28px) !important; }
    .ab-stat-card  { padding: 1.6rem 1.2rem; }
    .ab-vmo-card   { padding: 2rem 1.5rem; }

    /* Hero title */
    .ab-char { font-size: clamp(2.6rem, 8vw, 4rem) !important; }

    /* Hero badge & sub text */
    .ab-hero-badge { font-size: 0.6rem !important; }
    .ab-hero-sub   { font-size: 0.82rem !important; }
    .ab-hero-btns a { font-size: 0.78rem !important; padding: 10px 22px !important; }

    /* About split section */
    .ab-split-label { font-size: 0.6rem !important; }
    .ab-split-h2    { font-size: clamp(1.5rem, 4vw, 2rem) !important; }
    .ab-split-p     { font-size: 0.82rem !important; }
    .ab-split-quote { font-size: 0.88rem !important; }

    /* VMO section */
    .ab-vmo-label   { font-size: 0.6rem !important; }
    .ab-vmo-h2      { font-size: clamp(1.5rem, 4vw, 2rem) !important; }
    .ab-vmo-num     { font-size: 0.82rem !important; }
    .ab-vmo-title   { font-size: 1.15rem !important; }
    .ab-vmo-body    { font-size: 0.8rem !important; }

    /* Stat cards */
    .ab-stat-num   { font-size: clamp(1.8rem, 5vw, 2.4rem) !important; }
    .ab-stat-label { font-size: 0.6rem !important; }
  }
  @media (max-width:480px) {
    .ab-stat-grid  { grid-template-columns:1fr 1fr !important; }
    .ab-vmo-card   { padding: 1.8rem 1.4rem !important; }
    .ab-char       { font-size: clamp(2rem, 10vw, 3rem) !important; }
    .ab-split-h2   { font-size: clamp(1.3rem, 5vw, 1.7rem) !important; }
    .ab-vmo-h2     { font-size: clamp(1.3rem, 5vw, 1.7rem) !important; }
  }
`;

export default function About() {
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('ab-on'); obs.unobserve(e.target); } });
    }, { threshold: 0.1 });
    document.querySelectorAll('.ab-reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div style={{ background: T.bg, minHeight:'100vh', color: T.text }}>
      <style>{aboutStyles}</style>
      <Hero />
      <AboutSplit />
      <VMO />
    </div>
  );
}
