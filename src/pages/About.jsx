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
              ? <em key={ci} className="ab-char" style={{ animationDelay: `${d}s`, fontStyle: 'italic', color: T.accent }}>{ch}</em>
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
      justifyContent: 'space-between',
      padding: '0 4rem 5rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Stars background — same as Events page */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
        background: `
          radial-gradient(1px 1px at 12% 18%, rgba(255,255,255,0.6) 0%, transparent 100%),
          radial-gradient(1px 1px at 72% 8%,  rgba(255,255,255,0.4) 0%, transparent 100%),
          radial-gradient(1px 1px at 40% 55%, rgba(255,255,255,0.3) 0%, transparent 100%),
          radial-gradient(1px 1px at 88% 43%, rgba(255,255,255,0.5) 0%, transparent 100%),
          radial-gradient(1px 1px at  5% 78%, rgba(255,255,255,0.3) 0%, transparent 100%),
          radial-gradient(1px 1px at 60% 90%, rgba(255,255,255,0.45) 0%, transparent 100%),
          radial-gradient(1px 1px at 30% 35%, rgba(255,255,255,0.25) 0%, transparent 100%),
          radial-gradient(1px 1px at 95% 70%, rgba(255,255,255,0.4)  0%, transparent 100%),
          radial-gradient(1px 1px at 55% 28%, rgba(255,255,255,0.35) 0%, transparent 100%),
          radial-gradient(1px 1px at 18% 62%, rgba(255,255,255,0.3)  0%, transparent 100%),
          radial-gradient(1.5px 1.5px at 50% 15%, rgba(184,204,138,0.4) 0%, transparent 100%),
          radial-gradient(1.5px 1.5px at 80% 85%, rgba(184,204,138,0.3) 0%, transparent 100%),
          radial-gradient(1.5px 1.5px at 22% 90%, rgba(184,204,138,0.2) 0%, transparent 100%)
        `,
      }} />
      {/* Hero radial glow */}
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: '700px', height: '350px', pointerEvents: 'none',
        background: 'radial-gradient(ellipse at center, rgba(184,204,138,0.07) 0%, transparent 65%)',
      }} />
      {/* Grid overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `
          linear-gradient(rgba(184,204,138,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(184,204,138,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }} />

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
              fontSize: 'clamp(3rem, 6vw, 6rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
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

      {/* BOTTOM — metadata + rule + heading + description */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        {/* Top metadata row */}
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', marginBottom: '2rem',
        }}>
          <Reveal><Label>Student Training &amp; Development Club</Label></Reveal>
          <Reveal delay={100}>
            <span style={{ fontFamily: T.fontSans, fontSize: '0.75rem', color: T.textDim, letterSpacing: '0.05em' }}>
              Est. 2021 · India
            </span>
          </Reveal>
        </div>

        <Reveal delay={150}><Rule /></Reveal>

        {/* Heading left, description right */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          alignItems: 'flex-end',
          marginTop: '3rem',
        }}>
          <Reveal delay={200}>
            <AnimHeading
              tag="h2"
              lines={[{ text: 'Growing' }, { text: 'Together.', accent: true }]}
              baseDelay={0.2}
              style={{
                fontFamily: T.fontSerif,
                fontWeight: 300,
                fontSize: 'clamp(3.5rem, 7vw, 7rem)',
                lineHeight: 0.92,
                letterSpacing: '-0.02em',
                color: T.text,
              }}
            />
          </Reveal>
          <Reveal delay={300}>
            <p style={{
              fontFamily: T.fontSans,
              fontWeight: 300,
              fontSize: '1rem',
              lineHeight: 1.9,
              color: T.textMuted,
            }}>
              Abhivriddhi is a student-led club dedicated to transforming academic learners into industry-ready professionals through structured training, mentorship, and experiential development.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─── ABOUT SECTION ─── */
function AboutSection() {
  return (
    <section style={{
      padding: '8rem 4rem',
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
              color: T.text, marginBottom: '2.5rem', letterSpacing: '-0.01em',
            }}>
              A space where potential<br />
              finds its <em style={{ color: T.accent, fontStyle: 'italic' }}>direction.</em>
            </h2>
          </Reveal>

          {[
            { delay: 100, text: 'Abhivriddhi — derived from the Sanskrit word meaning growth and prosperity — was founded on a simple but powerful belief: that every student is capable of extraordinary things when given the right environment to flourish.' },
            { delay: 200, text: 'We are a student-run organization that operates at the intersection of technical skill-building, professional development, and personal growth. Through carefully designed programs — workshops, bootcamps, competitions, and mentorship initiatives — we create pathways for students to bridge the gap between classroom knowledge and industry expectation.' },
            { delay: 300, text: 'What distinguishes us is our culture — one built on peer learning, honest mentorship, and the belief that growth is not individual. When one member rises, the entire community rises with them.' },
          ].map(({ delay, text }, i) => (
            <Reveal key={i} delay={delay}>
              <p style={{
                fontFamily: T.fontSans, fontWeight: 300,
                fontSize: '0.95rem', lineHeight: 1.9,
                color: T.textMuted, maxWidth: '680px',
                marginBottom: i < 2 ? '1.8rem' : '3.5rem',
              }}>{text}</p>
            </Reveal>
          ))}

          <Reveal delay={400}>
            <Rule />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', marginTop: '2.5rem' }}>
              {[
                { title: 'Technical Training', desc: 'Workshops and bootcamps aligned with industry standards and emerging technologies.' },
                { title: 'Leadership Development', desc: 'Programs that cultivate decision-making, communication, and team management.' },
                { title: 'Career Mentorship', desc: 'Guided pathways connecting students with professionals and alumni networks.' },
              ].map((p, i) => (
                <div key={p.title} style={{
                  padding: '2rem',
                  borderLeft: `1px solid ${T.borderSubtle}`,
                  borderRight: i === 2 ? `1px solid ${T.borderSubtle}` : 'none',
                  paddingLeft: i === 0 ? '0' : '2rem',
                  borderLeftWidth: i === 0 ? '0' : '1px',
                }}>
                  <div style={{ fontFamily: T.fontSerif, fontWeight: 400, fontSize: '1rem', color: T.text, marginBottom: '0.6rem' }}>{p.title}</div>
                  <p style={{ fontFamily: T.fontSans, fontWeight: 300, fontSize: '0.82rem', lineHeight: 1.8, color: T.textDim }}>{p.desc}</p>
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
      padding: '8rem 4rem',
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
              color: T.textDim, marginBottom: '3.5rem',
              letterSpacing: '0.01em', maxWidth: '720px',
            }}>
              "To be the most impactful student development community in India."
            </p>
          </Reveal>

          {[
            { delay: 120, text: 'We envision a future where every student — regardless of background or circumstance — has access to the tools, mentors, and communities needed to realize their full potential. A future where the gap between academic preparation and professional readiness no longer exists.' },
            { delay: 240, text: 'Abhivriddhi aspires to be the launchpad from which students emerge not merely as skilled professionals, but as thoughtful leaders and responsible contributors to society. We are building a generation that is technically excellent, emotionally intelligent, and socially aware.' },
          ].map(({ delay, text }, i) => (
            <Reveal key={i} delay={delay}>
              <p style={{
                fontFamily: T.fontSans, fontWeight: 300, fontSize: '0.95rem',
                lineHeight: 1.9, color: T.textMuted, maxWidth: '680px',
                marginBottom: i === 0 ? '1.8rem' : '4rem',
              }}>{text}</p>
            </Reveal>
          ))}

          <Reveal delay={360}>
            {[
              { num: '01', heading: 'Inclusive Excellence', body: 'Creating an environment where every student can compete, contribute, and excel on equal footing.' },
              { num: '02', heading: 'Industry Alignment', body: 'Ensuring our programs remain current, rigorous, and reflective of real-world demands.' },
              { num: '03', heading: 'Lasting Community', body: 'Forging bonds and networks that extend far beyond graduation and shape careers for decades.' },
            ].map((v) => (
              <div key={v.num} style={{
                display: 'grid', gridTemplateColumns: '60px 1fr',
                gap: '2rem', padding: '2rem 0',
                borderTop: `1px solid ${T.borderSubtle}`, alignItems: 'start',
              }}>
                <span style={{ fontFamily: T.fontSerif, fontWeight: 300, fontSize: '1rem', color: T.accent, paddingTop: '0.15rem' }}>{v.num}</span>
                <div>
                  <div style={{ fontFamily: T.fontSerif, fontWeight: 400, fontSize: '1.1rem', color: T.text, marginBottom: '0.4rem' }}>{v.heading}</div>
                  <p style={{ fontFamily: T.fontSans, fontWeight: 300, fontSize: '0.85rem', lineHeight: 1.9, color: T.textMuted }}>{v.body}</p>
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
      padding: '8rem 4rem',
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
              color: T.textDim, marginBottom: '3.5rem', maxWidth: '720px',
            }}>
              "To cultivate a vibrant learning ecosystem that equips students with excellence, acumen, and purpose."
            </p>
          </Reveal>

          {[
            { delay: 120, text: "Our mission is to design and deliver transformative learning experiences that go beyond theoretical knowledge. Every program, event, and initiative we run is crafted with intentionality — aimed at producing measurable growth in our members' capabilities, confidence, and career prospects." },
            { delay: 240, text: 'We believe that student development is a holistic endeavor. Technical competence alone is insufficient. We invest in soft skills, critical thinking, ethical reasoning, and the interpersonal dynamics that determine success in complex professional environments.' },
          ].map(({ delay, text }, i) => (
            <Reveal key={i} delay={delay}>
              <p style={{
                fontFamily: T.fontSans, fontWeight: 300, fontSize: '0.95rem',
                lineHeight: 1.9, color: T.textMuted, maxWidth: '680px',
                marginBottom: i === 0 ? '1.8rem' : '4rem',
              }}>{text}</p>
            </Reveal>
          ))}

          <Reveal delay={360}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
              {[
                { title: 'Hands-On Training', body: 'Intensive workshops, coding bootcamps, and project-based learning that builds real competence through practice, not passive instruction.' },
                { title: 'Mentorship Programs', body: 'Structured one-on-one and cohort-based mentorship with industry professionals and high-achieving alumni who invest in the next generation.' },
                { title: 'Competitive Exposure', body: 'Hackathons, case competitions, and inter-college challenges that sharpen problem-solving under pressure and build a competitive edge.' },
                { title: 'Community Culture', body: 'Fostering an environment of psychological safety, mutual accountability, and shared ambition where students dare to aim higher.' },
              ].map((m, i) => (
                <div key={m.title} style={{
                  padding: '2.5rem',
                  borderTop: `1px solid ${T.borderSubtle}`,
                  borderLeft: i % 2 !== 0 ? `1px solid ${T.borderSubtle}` : 'none',
                  borderBottom: i < 2 ? `1px solid ${T.borderSubtle}` : 'none',
                  paddingLeft: i % 2 === 0 ? '0' : '2.5rem',
                }}>
                  <div style={{ fontFamily: T.fontSerif, fontWeight: 400, fontSize: '1.1rem', color: T.text, marginBottom: '0.7rem' }}>{m.title}</div>
                  <p style={{ fontFamily: T.fontSans, fontWeight: 300, fontSize: '0.82rem', lineHeight: 1.85, color: T.textMuted }}>{m.body}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─── CLOSING ─── */
function Closing() {
  return (
    <section style={{
      padding: '10rem 4rem',
      borderTop: `1px solid ${T.borderSubtle}`,
      textAlign: 'center', position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px', height: '600px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(184,204,138,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
        <Reveal><Label>Join the Movement</Label></Reveal>
        <Reveal delay={100}>
          <h2 style={{
            fontFamily: T.fontSerif, fontWeight: 300,
            fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', lineHeight: 1.1,
            letterSpacing: '-0.02em', color: T.text, margin: '2rem 0 2.5rem',
          }}>
            Your growth<br />
            <em style={{ fontStyle: 'italic', color: T.accent }}>starts here.</em>
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <p style={{
            fontFamily: T.fontSans, fontWeight: 300, fontSize: '0.95rem',
            lineHeight: 1.9, color: T.textMuted, marginBottom: '3.5rem',
          }}>
            Become part of a community that takes student development seriously. We are looking for individuals who are driven, curious, and committed to growing beyond what they believe is possible.
          </p>
        </Reveal>
        <Reveal delay={300}>
          <div style={{ display: 'flex', gap: '1.25rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#apply" className="ab-btn-primary">Apply Now →</a>
            <a href="#contact" className="ab-btn-secondary">Get in Touch</a>
          </div>
        </Reveal>
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
      <Closing />
    </div>
  );
}
