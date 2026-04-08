import { useEffect, useRef } from 'react';

/* ─── theme tokens matching main site ─── */
const T = {
  bg:          '#0a0d0f',
  bg2:         '#0f1316',
  surface:     '#131820',
  surface2:    '#1a2030',
  accent:      '#b8cc8a',
  text:        '#e8e4dc',
  textMuted:   'rgba(232,228,220,0.55)',
  textDim:     'rgba(232,228,220,0.28)',
  border:      'rgba(184,204,138,0.12)',
  borderSubtle:'rgba(255,255,255,0.06)',
  fontSerif:   "'Cormorant Garamond', serif",
  fontSans:    "'DM Sans', sans-serif",
};

/* ─── Reveal wrapper ─── */
function Reveal({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => el.classList.add('ab-visible'), delay);
          obs.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return (
    <div ref={ref} className="ab-reveal" style={style}>
      {children}
    </div>
  );
}

function Rule() {
  return <div style={{ height: '1px', background: T.borderSubtle }} />;
}

function Label({ children }) {
  return (
    <span style={{
      fontFamily: T.fontSans,
      fontWeight: 400,
      fontSize: '0.68rem',
      letterSpacing: '0.3em',
      textTransform: 'uppercase',
      color: T.accent,
    }}>
      {children}
    </span>
  );
}

function SectionLabel({ children }) {
  return (
    <span style={{
      fontFamily: T.fontSerif,
      fontWeight: 400,
      fontSize: '2rem',
      letterSpacing: '0.05em',
      color: T.accent,
      display: 'block',
    }}>
      {children}
    </span>
  );
}

/* ─── Animated headline ─── */
function AnimHeading({ lines, tag: Tag = 'h1', style = {}, baseDelay = 0.1 }) {
  let delay = baseDelay;
  return (
    <Tag style={style} aria-label={lines.map(l => l.text).join(' ')}>
      {lines.map((line, li) => (
        <span key={li} style={{ display: 'block' }}>
          {line.text.split('').map((ch, ci) => {
            delay += 0.05;
            const d = delay;
            if (ch === ' ') return <span key={ci} className="ab-char-space" />;
            return line.accent
              ? <em key={ci} className="ab-char" style={{ animationDelay: `${d}s`, fontStyle: 'normal', color: 'transparent', WebkitTextStroke: `1px ${T.accent}` }}>{ch}</em>
              : <span key={ci} className="ab-char" style={{ animationDelay: `${d}s` }}>{ch}</span>;
          })}
        </span>
      ))}
    </Tag>
  );
}

/* ─── HERO ─── */
function Hero() {
  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '0 4rem',
      position: 'relative',
      overflow: 'hidden',
      background: '#0a0d0f',
    }}>
      {/* Radial accent glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        background: 'radial-gradient(ellipse 70% 55% at 50% 40%, rgba(184,204,138,0.08) 0%, transparent 70%)',
      }} />
      {/* Grid lines */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
        maskImage: 'radial-gradient(ellipse 80% 80% at center, black 30%, transparent 80%)',
      }} />
      {/* Horizontal accent lines */}
      <div style={{ position: 'absolute', top: '20%', left: 0, right: 0, height: 1, background: 'linear-gradient(to right, transparent, rgba(184,204,138,0.12), transparent)', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: '20%', left: 0, right: 0, height: 1, background: 'linear-gradient(to right, transparent, rgba(184,204,138,0.12), transparent)', zIndex: 0 }} />

      {/* CENTER — About Abhivriddhi headline */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 2,
        textAlign: 'center',
        gap: '1.2rem',
      }}>
        <Reveal>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '7px',
            fontSize: '0.68rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: T.accent,
            border: `1px solid ${T.accent}38`,
            padding: '5px 14px',
            borderRadius: '20px',
            background: `${T.accent}12`,
            fontFamily: T.fontSans,
            fontWeight: 500,
          }}>
            <span style={{
              width: '6px', height: '6px', borderRadius: '50%',
              background: T.accent,
              animation: 'ab-dot 2s ease-in-out infinite',
              flexShrink: 0,
            }} />
            About Abhivriddhi
          </div>
        </Reveal>
        <Reveal delay={150}>
          <AnimHeading
            lines={[{ text: 'Who We' }, { text: 'Are.', accent: true }]}
            style={{
              fontFamily: T.fontSerif,
              fontWeight: 300,
              fontSize: 'clamp(64px,10vw,120px)',
              lineHeight: 1.02,
              letterSpacing: '0.01em',
              color: T.text,
            }}
          />
        </Reveal>
        <Reveal delay={250}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginTop: '0.5rem' }}>
            <div style={{ width: '32px', height: '1px', background: T.accent, opacity: 0.5 }} />
            <span style={{ fontFamily: T.fontSans, fontSize: '0.75rem', color: T.textDim, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Scroll to explore</span>
            <div style={{ width: '32px', height: '1px', background: T.accent, opacity: 0.5 }} />
          </div>
        </Reveal>
      </div>

    </section>
  );
}

/* ─── ABOUT SECTION ─── */
function AboutSection() {
  return (
    <section style={{
      padding: '6rem 4rem',
      borderTop: `1px solid ${T.borderSubtle}`,
      position: 'relative',
    }}>
      <div style={{
        display: 'grid', gridTemplateColumns: '240px 1fr',
        gap: '6rem', maxWidth: '1200px', margin: '0 auto', alignItems: 'start',
      }}>
        <Reveal>
          <div style={{ position: 'sticky', top: '7rem' }}>
            <SectionLabel>About</SectionLabel>
            <div style={{ width: '32px', height: '1px', background: T.accent, marginTop: '1rem' }} />
          </div>
        </Reveal>

        <div>
          <Reveal>
            <h2 style={{
              fontFamily: T.fontSerif, fontWeight: 300,
              fontSize: 'clamp(2rem, 4vw, 3.2rem)', lineHeight: 1.2,
              color: T.text, marginBottom: '1.5rem', letterSpacing: '-0.01em',
            }}>
              A space where potential<br />
              finds its <em style={{ color: T.accent, fontStyle: 'italic' }}>direction.</em>
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p style={{
              fontFamily: T.fontSans, fontWeight: 300,
              fontSize: '0.95rem', lineHeight: 1.9,
              color: T.textMuted, maxWidth: '600px', marginBottom: '3rem',
            }}>
              Abhivriddhi — meaning growth and prosperity — is a student-led club bridging the gap between academic learning and industry readiness through workshops, mentorship, and real-world experiences.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <Rule />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', marginTop: '2rem' }}>
              {[
                { title: 'Technical Training', desc: 'Workshops aligned with industry standards.' },
                { title: 'Leadership', desc: 'Programs that build communication and team skills.' },
                { title: 'Career Mentorship', desc: 'Connecting students with professionals and alumni.' },
              ].map((p, i) => (
                <div key={p.title} style={{
                  padding: '1.5rem',
                  borderLeft: `1px solid ${T.borderSubtle}`,
                  borderRight: i === 2 ? `1px solid ${T.borderSubtle}` : 'none',
                  paddingLeft: i === 0 ? '0' : '1.5rem',
                  borderLeftWidth: i === 0 ? '0' : '1px',
                }}>
                  <div style={{ fontFamily: T.fontSerif, fontWeight: 400, fontSize: '1rem', color: T.text, marginBottom: '0.4rem' }}>{p.title}</div>
                  <p style={{ fontFamily: T.fontSans, fontWeight: 300, fontSize: '0.82rem', lineHeight: 1.7, color: T.textDim }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─── VISION ─── */
function Vision() {
  return (
    <section id="vision" style={{
      padding: '6rem 4rem',
      borderTop: `1px solid ${T.borderSubtle}`,
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', right: '-2rem', top: '50%',
        transform: 'translateY(-50%)',
        fontFamily: T.fontSerif,
        fontSize: 'clamp(16rem, 28vw, 30rem)', fontWeight: 300,
        color: 'transparent', WebkitTextStroke: `1px rgba(184,204,138,0.04)`,
        lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
      }}>01</div>

      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '6rem', maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        <Reveal>
          <div style={{ position: 'sticky', top: '7rem' }}>
            <SectionLabel>Vision</SectionLabel>
            <div style={{ width: '32px', height: '1px', background: T.accent, marginTop: '1rem' }} />
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p style={{
              fontFamily: T.fontSerif, fontWeight: 300, fontStyle: 'italic',
              fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', lineHeight: 1.5,
              color: T.textDim, marginBottom: '2rem',
              letterSpacing: '0.01em', maxWidth: '720px',
            }}>
              "To be the most impactful student development community in India."
            </p>
          </Reveal>
          <Reveal delay={120}>
            <p style={{
              fontFamily: T.fontSans, fontWeight: 300, fontSize: '0.95rem',
              lineHeight: 1.9, color: T.textMuted, maxWidth: '600px', marginBottom: '3rem',
            }}>
              We envision a future where every student has access to the tools, mentors, and community needed to bridge the gap between academic preparation and professional readiness.
            </p>
          </Reveal>

          <Reveal delay={240}>
            {[
              { num: '01', heading: 'Inclusive Excellence', body: 'Every student can compete, contribute, and excel on equal footing.' },
              { num: '02', heading: 'Industry Alignment', body: 'Programs that stay current, rigorous, and reflective of real-world demands.' },
              { num: '03', heading: 'Lasting Community', body: 'Bonds and networks that extend far beyond graduation.' },
            ].map((v) => (
              <div key={v.num} style={{
                display: 'grid', gridTemplateColumns: '60px 1fr',
                gap: '2rem', padding: '1.5rem 0',
                borderTop: `1px solid ${T.borderSubtle}`, alignItems: 'start',
              }}>
                <span style={{ fontFamily: T.fontSerif, fontWeight: 300, fontSize: '1rem', color: T.accent, paddingTop: '0.15rem' }}>{v.num}</span>
                <div>
                  <div style={{ fontFamily: T.fontSerif, fontWeight: 400, fontSize: '1.1rem', color: T.text, marginBottom: '0.3rem' }}>{v.heading}</div>
                  <p style={{ fontFamily: T.fontSans, fontWeight: 300, fontSize: '0.85rem', lineHeight: 1.8, color: T.textMuted }}>{v.body}</p>
                </div>
              </div>
            ))}
            <div style={{ height: '1px', background: T.borderSubtle }} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─── MISSION ─── */
function Mission() {
  return (
    <section id="mission" style={{
      padding: '6rem 4rem',
      borderTop: `1px solid ${T.borderSubtle}`,
      background: T.bg2,
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', right: '-2rem', top: '50%',
        transform: 'translateY(-50%)',
        fontFamily: T.fontSerif,
        fontSize: 'clamp(16rem, 28vw, 30rem)', fontWeight: 300,
        color: 'transparent', WebkitTextStroke: `1px rgba(184,204,138,0.04)`,
        lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
      }}>02</div>

      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '6rem', maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        <Reveal>
          <div style={{ position: 'sticky', top: '7rem' }}>
            <SectionLabel>Mission</SectionLabel>
            <div style={{ width: '32px', height: '1px', background: T.accent, marginTop: '1rem' }} />
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p style={{
              fontFamily: T.fontSerif, fontWeight: 300, fontStyle: 'italic',
              fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', lineHeight: 1.5,
              color: T.textDim, marginBottom: '2rem', maxWidth: '720px',
            }}>
              "To cultivate a learning ecosystem that equips students with excellence, acumen, and purpose."
            </p>
          </Reveal>
          <Reveal delay={120}>
            <p style={{
              fontFamily: T.fontSans, fontWeight: 300, fontSize: '0.95rem',
              lineHeight: 1.9, color: T.textMuted, maxWidth: '600px', marginBottom: '3rem',
            }}>
              Every program we run is crafted with intention — producing measurable growth in our members' skills, confidence, and career prospects.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
              {[
                { title: 'Hands-On Training', body: 'Workshops and project-based learning that builds real competence.' },
                { title: 'Mentorship', body: 'One-on-one guidance from industry professionals and alumni.' },
                { title: 'Competitions', body: 'Hackathons and challenges that sharpen problem-solving skills.' },
                { title: 'Community', body: 'A culture of shared ambition and mutual growth.' },
              ].map((m, i) => (
                <div key={m.title} style={{
                  padding: '1.8rem',
                  borderTop: `1px solid ${T.borderSubtle}`,
                  borderLeft: i % 2 !== 0 ? `1px solid ${T.borderSubtle}` : 'none',
                  borderBottom: i < 2 ? `1px solid ${T.borderSubtle}` : 'none',
                  paddingLeft: i % 2 === 0 ? '0' : '1.8rem',
                }}>
                  <div style={{ fontFamily: T.fontSerif, fontWeight: 400, fontSize: '1.1rem', color: T.text, marginBottom: '0.4rem' }}>{m.title}</div>
                  <p style={{ fontFamily: T.fontSans, fontWeight: 300, fontSize: '0.82rem', lineHeight: 1.75, color: T.textMuted }}>{m.body}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─── SCOPED STYLES ─── */
const aboutStyles = `
  .ab-reveal {
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1);
  }
  .ab-reveal.ab-visible { opacity: 1; transform: none; }

  .ab-char {
    display: inline-block;
    opacity: 0;
    transform: translateY(28px);
    animation: ab-chin 0.5s ease forwards;
  }
  .ab-char-space { display: inline-block; width: 0.28em; }
  @keyframes ab-chin { to { opacity: 1; transform: translateY(0); } }

  @keyframes ab-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.35;transform:scale(0.65)} }

  .ab-btn-primary {    font-family: 'DM Sans', sans-serif;
    font-weight: 500;
    font-size: 0.85rem;
    letter-spacing: 0.06em;
    color: #0a0d0f;
    background: #b8cc8a;
    padding: 0.9rem 2rem;
    text-decoration: none;
    transition: background 0.3s ease;
    display: inline-block;
  }
  .ab-btn-primary:hover { background: #cde09e; }

  .ab-btn-secondary {
    font-family: 'DM Sans', sans-serif;
    font-weight: 400;
    font-size: 0.85rem;
    letter-spacing: 0.06em;
    color: rgba(232,228,220,0.6);
    background: transparent;
    border: 1px solid rgba(255,255,255,0.06);
    padding: 0.9rem 2rem;
    text-decoration: none;
    transition: border-color 0.3s ease, color 0.3s ease;
    display: inline-block;
  }
  .ab-btn-secondary:hover { border-color: rgba(184,204,138,0.4); color: #b8cc8a; }

  @media (max-width: 900px) {
    #about-page section { padding: 5rem 2rem !important; }
    #about-page .ab-two-col { grid-template-columns: 1fr !important; }
    #about-page h1 { font-size: clamp(3rem, 12vw, 5rem) !important; }
  }
`;

export default function About() {
  return (
    <div id="about-page" style={{ background: T.bg, minHeight: '100vh', color: T.text }}>
      <style>{aboutStyles}</style>
      <Hero />
      <AboutSection />
      <Vision />
      <Mission />
    </div>
  );
}
