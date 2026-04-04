import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

/* ─────────────────────────────────────────────
   DESIGN TOKENS
───────────────────────────────────────────── */
const T = {
  bg:         "#0a0d0f",
  bg2:        "#0f1316",
  surface:    "#131820",
  surface2:   "#1a2030",
  accent:     "#b8cc8a",
  accentDim:  "#8fa660",
  accentHov:  "#cde09e",
  text:       "#e8e4dc",
  textMuted:  "#7a8490",
  textDim:    "#4a5260",
  border:     "rgba(184,204,138,0.12)",
  borderSub:  "rgba(255,255,255,0.06)",
  // domain accents
  d1: "#b8cc8a",
  d2: "#8ab4cc",
  d3: "#cc9e8a",
  d4: "#ccb88a",
  d5: "#b08acc",
};

/* ─────────────────────────────────────────────
   INTERSECTION OBSERVER HOOK
───────────────────────────────────────────── */
function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, vis];
}

/* ─────────────────────────────────────────────
   REVEAL WRAPPER
───────────────────────────────────────────── */
function Reveal({ children, delay = 0, y = 28, className = "" }) {
  const [ref, vis] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : `translateY(${y}px)`,
        transition: `opacity 0.75s ease ${delay}ms, transform 0.75s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   SECTION LABEL
───────────────────────────────────────────── */
function SectionLabel({ children }) {
  return (
    <div className="inline-flex items-center gap-2 mb-5">
      <div style={{ width: 20, height: 1, background: T.accent }} />
      <span style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 11,
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        color: T.accent,
        fontWeight: 500,
      }}>
        {children}
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   TAG PILL
───────────────────────────────────────────── */
function Tag({ label, color }) {
  const c = color || T.accent;
  return (
    <span style={{
      display: "inline-block",
      padding: "3px 12px",
      borderRadius: 999,
      border: `1px solid ${c}28`,
      background: `${c}0d`,
      color: c,
      fontSize: 11,
      fontFamily: "'DM Sans', sans-serif",
      fontWeight: 500,
      letterSpacing: "0.06em",
    }}>
      {label}
    </span>
  );
}

/* ─────────────────────────────────────────────
   ANIMATED HERO TITLE (same as Contact page)
───────────────────────────────────────────── */
function AnimTitle() {
  // "Featured" normal, "Empowering" outline accent, "Events" normal
  const lines = [
    { text: 'Featured',   accent: false },
    { text: 'Empowering', accent: true  },
    { text: 'Events',     accent: false },
  ];
  let delay = 0.15;
  return (
    <h1 style={{
      fontFamily: "'Cormorant Garamond', serif",
      fontWeight: 300,
      lineHeight: 1.02,
      letterSpacing: '0.01em',
      marginBottom: 0,
    }} aria-label="Featured Empowering Events">
      {lines.map((line, li) => (
        <span key={li} style={{ display: 'block' }}>
          {line.text.split('').map((ch, ci) => {
            delay += 0.055;
            const d = delay;
            return (
              <span
                key={ci}
                className="ev-char"
                style={{
                  animationDelay: `${d}s`,
                  fontSize: 'clamp(52px,8vw,96px)',
                  color: line.accent ? 'transparent' : T.text,
                  WebkitTextStroke: line.accent ? `1px ${T.accent}` : 'none',
                }}
              >{ch}</span>
            );
          })}
        </span>
      ))}
    </h1>
  );
}

/* ─────────────────────────────────────────────
   FEATURED EVENT CARD
───────────────────────────────────────────── */
const eventVisuals = [
  // Engineering Unplugged — real video
  ({ hovered }) => (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <video
        src="/EU.mp4"
        autoPlay
        muted
        loop
        playsInline
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          filter: hovered ? 'brightness(0.75)' : 'brightness(0.55)',
          transition: 'filter 0.4s ease',
        }}
      />
      <div style={{
        position: 'absolute', inset: 0,
        background: `linear-gradient(135deg, ${T.accent}10 0%, transparent 60%)`,
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: 14, left: 16,
        background: T.surface2,
        border: `1px solid ${T.border}`,
        borderRadius: 11,
        padding: '4px 14px',
        fontSize: 9.5,
        fontFamily: 'DM Sans,sans-serif',
        letterSpacing: '0.12em',
        color: T.accent,
      }}>LIVE EVENT</div>
      <div style={{
        position: 'absolute', bottom: 14, right: 16,
        background: T.surface2,
        border: `1px solid ${T.border}`,
        borderRadius: 11,
        padding: '4px 14px',
        fontSize: 9.5,
        fontFamily: 'DM Sans,sans-serif',
        letterSpacing: '0.12em',
        color: T.textMuted,
      }}>FRESHERS 2024</div>
    </div>
  ),
  // EDGE — real image
  ({ hovered }) => (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <img
        src="/Edge.png"
        alt="E.D.G.E Student Development Summit"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          filter: hovered ? 'brightness(0.8)' : 'brightness(0.6)',
          transition: 'filter 0.4s ease, transform 0.6s ease',
          transform: hovered ? 'scale(1.04)' : 'scale(1)',
        }}
      />
      <div style={{
        position: 'absolute', inset: 0,
        background: `linear-gradient(135deg, ${T.d2}12 0%, transparent 60%)`,
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: 14, left: 16,
        background: T.surface2,
        border: `1px solid ${T.border}`,
        borderRadius: 11,
        padding: '4px 14px',
        fontSize: 9.5,
        fontFamily: 'DM Sans,sans-serif',
        letterSpacing: '0.12em',
        color: T.d2,
      }}>3-DAY SUMMIT</div>
    </div>
  ),
  // EATON — blank
  () => (
    <div style={{ position: 'absolute', inset: 0, background: T.bg2 }} />
  ),
];

function FeaturedEventCard({ event, index, reverse }) {
  const [hovered, setHovered] = useState(false);
  const [ref, vis] = useInView(0.1);
  const Visual = eventVisuals[index];

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(40px)",
        transition: "opacity 0.8s ease, transform 0.8s ease",
        borderRadius: 16,
        border: `1px solid ${hovered ? "rgba(184,204,138,0.22)" : T.border}`,
        background: T.surface,
        overflow: "hidden",
        boxShadow: hovered ? `0 8px 48px rgba(184,204,138,0.07)` : "none",
        transitionProperty: "opacity,transform,box-shadow,border-color",
      }}
    >
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        minHeight: 340,
      }} className="event-grid">
        {/* Text panel */}
        <div style={{
          padding: "52px 48px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 20,
          order: reverse ? 2 : 1,
        }} className="event-text">
          {/* Index + label row */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 13,
              color: T.textDim,
              letterSpacing: "0.18em",
              fontWeight: 300,
            }}>EVENT</span>
            <span style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 28,
              color: T.border.replace("0.12","0.35"),
              fontWeight: 300,
              lineHeight: 1,
            }}>{String(index+1).padStart(2,"0")}</span>
            <div style={{ flex:1, height:1, background:`linear-gradient(to right, ${T.border}, transparent)` }} />
          </div>

          {/* Title */}
          <div>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 34,
              fontWeight: 600,
              color: hovered ? T.accentHov : T.text,
              lineHeight: 1.18,
              letterSpacing: "0.01em",
              margin: 0,
              transition: "color 0.4s ease",
            }}>{event.title}</h2>
            <div style={{
              height: 2,
              borderRadius: 2,
              background: T.accent,
              marginTop: 12,
              width: hovered ? 56 : 28,
              transition: "width 0.5s ease",
            }} />
          </div>

          {/* Highlight quote */}
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 17,
            fontWeight: 400,
            color: T.accent,
            lineHeight: 1.65,
            fontStyle: "italic",
            borderLeft: `2px solid ${T.accent}40`,
            paddingLeft: 16,
            margin: 0,
          }}>
            "{event.highlight}"
          </p>

          {/* Description */}
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 14,
            color: T.textMuted,
            lineHeight: 1.75,
            fontWeight: 300,
            margin: 0,
          }}>
            {event.description}
          </p>

          {/* Tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {event.tags.map((t,i) => <Tag key={t} label={t} color={[T.d1,T.d2,T.d3,T.d4][i%4]} />)}
          </div>

          {/* CTA */}
          <div>
            <button
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
                fontWeight: 500,
                letterSpacing: "0.06em",
                color: T.bg,
                background: hovered ? T.accentHov : T.accent,
                border: "none",
                borderRadius: 8,
                padding: "11px 24px",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                transition: "background 0.3s ease",
              }}
            >
              {event.ctaText}
              <span style={{ transition: "transform 0.3s", transform: hovered ? "translateX(4px)" : "none" }}>→</span>
            </button>
          </div>
        </div>

        {/* Visual panel */}
        <div style={{
          position: "relative",
          background: T.bg2,
          borderLeft: reverse ? "none" : `1px solid ${T.borderSub}`,
          borderRight: reverse ? `1px solid ${T.borderSub}` : "none",
          order: reverse ? 1 : 2,
          minHeight: 300,
          overflow: "hidden",
        }} className="event-visual">
          <Visual hovered={hovered} />
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   COMPACT EVENT CARD
───────────────────────────────────────────── */
function CompactCard({ num, title, sub, tags, icon, color, delay }) {
  const [hovered, setHov] = useState(false);
  const [ref, vis] = useInView(0.1);
  return (
    <div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
        background: T.surface,
        border: `1px solid ${hovered ? color+"40" : T.border}`,
        borderRadius: 12,
        padding: "28px 28px 24px",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        boxShadow: hovered ? `0 4px 30px ${color}10` : "none",
        transitionProperty: "opacity,transform,border-color,box-shadow",
      }}
    >
      {/* Top line */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(to right, transparent, ${color}70, transparent)`,
        opacity: hovered ? 1 : 0, transition: "opacity 0.4s",
      }} />

      {/* Header */}
      <div style={{ marginBottom: 16 }}>
        <span style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 38,
          fontWeight: 300,
          color: `${color}25`,
          lineHeight: 1,
        }}>{String(num).padStart(2,"0")}</span>
      </div>

      <h3 style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 20,
        fontWeight: 600,
        color: hovered ? color : T.text,
        marginBottom: 8, lineHeight: 1.25,
        transition: "color 0.35s",
      }}>{title}</h3>

      <p style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 13, color: T.textMuted,
        lineHeight: 1.65, fontWeight: 300, marginBottom: 18,
      }}>{sub}</p>

      <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
        {tags.map(t => <Tag key={t} label={t} color={color} />)}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   STAT CARD — animated count-up
───────────────────────────────────────────── */
function StatCard({ num, label, delay }) {
  const [ref, vis] = useInView(0.2);
  const [displayed, setDisplayed] = useState("0");
  const hasRun = useRef(false);

  useEffect(() => {
    if (!vis || hasRun.current) return;
    hasRun.current = true;

    // parse suffix and numeric target from strings like "100+", "75%", "1,500+"
    const raw = num.replace(/,/g, "");
    const suffix = raw.replace(/[0-9]/g, "");
    const target = parseInt(raw);
    if (isNaN(target)) { setDisplayed(num); return; }

    const duration = 1800;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      // re-add comma formatting for large numbers
      setDisplayed(current.toLocaleString() + suffix);
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [vis]);

  return (
    <div ref={ref} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0)" : "translateY(20px)",
      transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      background: T.surface,
      border: `1px solid ${T.border}`,
      borderRadius: 16,
      padding: "32px 24px",
      textAlign: "center",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: `linear-gradient(to right, transparent, ${T.accent}40, transparent)`,
        opacity: vis ? 1 : 0,
        transition: `opacity 0.6s ease ${delay + 300}ms`,
      }} />
      <div style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "clamp(2.2rem, 3.5vw, 3rem)",
        fontWeight: 300,
        color: T.accent,
        lineHeight: 1,
        marginBottom: 10,
        letterSpacing: "-0.01em",
      }}>{displayed}</div>
      <div style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 12,
        color: T.textMuted,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        lineHeight: 1.6,
      }}>{label}</div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */
export default function Events() {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const h = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const featuredEvents = [
    {
      title: "Engineering Unplugged",
      highlight: "Step into an extraordinary journey – an electrifying event crafted to inspire and empower freshers.",
      description: "Engineering Unplugged empowers freshers to confidently step into their 4-year engineering journey and embrace limitless opportunities through immersive sessions, peer interactions, and mentorship.",
      tags: ["Confidence", "Opportunity", "Passion", "Engineering"],
      ctaText: "Explore Engineering Unplugged",
    },
    {
      title: "E.D.G.E Student Development Summit",
      highlight: "Join a transformative 3-day experience designed to equip students with career-defining skills.",
      description: "EDGE is a powerful 3-day summit focused on Resume Building, Personal Branding, Money Management, mock interviews, and study abroad counseling — all in one place.",
      tags: ["Essential Skills", "Resume Building", "Career Growth", "Practical Experience"],
      ctaText: "Explore E.D.G.E Summit",
    },
    {
      title: "EATON Changing Gears",
      highlight: "Discover engaging sessions that connect you directly with industry leaders.",
      description: "An impactful corporate collaboration with Eaton Corporation, featuring LinkedIn profile optimization, teamwork training, and communication skill development workshops.",
      tags: ["LinkedIn", "Teamwork", "Career Boost", "Real-World Experience"],
      ctaText: "Explore EATON Collab",
    },
  ];

  const moreEvents = [
    { num:4, title:"Leadership Bootcamp", sub:"Intensive leadership training designed for aspiring student changemakers.", tags:["Leadership","Teamwork"], color:T.d1 },
    { num:5, title:"Public Speaking Workshop", sub:"Transform your communication with expert-led presentations coaching.", tags:["Communication","Confidence"],  color:T.d2 },
    { num:6, title:"Startup Weekend", sub:"48-hour ideation sprint with mentors from the startup ecosystem.", tags:["Innovation","Startups"], color:T.d3 },
    { num:7, title:"Alumni Connect", sub:"Bridge the gap between current students and established alumni.", tags:["Networking","Mentorship"], color:T.d4 },
    { num:8, title:"Hackathon 2024", sub:"Code, build and ship — compete with the brightest engineering minds.", tags:["Coding","Problem Solving"], color:T.d5 },
    { num:9, title:"Personal Finance 101", sub:"Practical money management skills every engineering student needs.", tags:["Finance","Life Skills"], color:T.d1 },
  ];

  const [ctaRef, ctaVis] = useInView(0.2);

  return (
    <div style={{ background: T.bg, color: T.text, minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes heroFade { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        @keyframes scrollBob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)} }
        @keyframes grainMove { 0%{transform:translate(0,0)} 25%{transform:translate(-1%,1%)} 50%{transform:translate(1%,-1%)} 75%{transform:translate(-1%,-1%)} 100%{transform:translate(0,0)} }
        @keyframes ev-chin { to { opacity: 1; transform: translateY(0); } }
        @keyframes ev-fup { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes ev-pdot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.35;transform:scale(0.65)} }

        .h-anim-1 { animation: heroFade 1s ease 0.1s both; }
        .h-anim-2 { animation: heroFade 1s ease 0.3s both; }
        .h-anim-3 { animation: heroFade 1s ease 0.55s both; }
        .h-anim-4 { animation: heroFade 1s ease 0.75s both; }
        .h-anim-5 { animation: heroFade 1s ease 0.95s both; }
        .scroll-bob { animation: scrollBob 2.5s ease-in-out infinite; }

        .ev-char {
          display: inline-block;
          opacity: 0; transform: translateY(28px);
          animation: ev-chin 0.5s ease forwards;
        }
        .ev-char-space { display: inline-block; width: 0.28em; }
        .ev-badge {
          display: inline-flex; align-items: center; gap: 7px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.68rem; letter-spacing: 0.18em; text-transform: uppercase;
          color: ${T.accent}; border: 1px solid ${T.accent}38;
          padding: 5px 14px; border-radius: 20px; margin-bottom: 24px;
          background: ${T.accent}12;
          opacity: 0; animation: ev-fup 0.6s ease 0.1s forwards;
        }
        .ev-badge-dot {
          width: 6px; height: 6px; border-radius: 50%; background: ${T.accent};
          animation: ev-pdot 2s ease-in-out infinite;
        }
        .ev-hero-sub {
          margin-top: 16px; font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem; color: ${T.textDim}; letter-spacing: 0.05em;
          opacity: 0; animation: ev-fup 0.6s ease 1.1s forwards;
        }
        .ev-divider {
          width: 60px; height: 1px;
          background: linear-gradient(90deg, transparent, ${T.accent}, transparent);
          margin: 36px auto 0;
          opacity: 0; animation: ev-fup 0.6s ease 1.3s forwards;
        }

        /* Noise grain overlay */
        .grain::before {
          content:''; position:absolute; inset:0; pointer-events:none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
          background-repeat: repeat; background-size: 200px 200px;
          opacity: 0.025; z-index: 1; animation: grainMove 8s steps(1) infinite;
        }

        @media (max-width: 900px) {
          .event-grid { grid-template-columns: 1fr !important; }
          .event-visual { order: 1 !important; min-height: 260px !important; border-left: none !important; border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.06) !important; }
          .event-text { order: 2 !important; padding: 36px 28px !important; }
          .more-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .more-grid { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 641px) and (max-width: 900px) {
          .more-grid { grid-template-columns: 1fr 1fr !important; }
        }

        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: ${T.bg}; }
        ::-webkit-scrollbar-thumb { background: ${T.accent}30; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: ${T.accent}60; }
      `}</style>

      {/* ══════════════════════════════════
          HERO
      ══════════════════════════════════ */}
      <section className="grain" style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: T.bg,
      }}>
        {/* Subtle gradient mesh */}
        <div style={{
          position:"absolute",inset:0,pointerEvents:"none",zIndex:0,
          background:`radial-gradient(ellipse 70% 55% at 50% 40%, ${T.accent}08 0%, transparent 70%)`,
          transform: `translateY(${scrollY * 0.25}px)`,
        }} />
        {/* Grid lines */}
        <div style={{
          position:"absolute",inset:0,pointerEvents:"none",zIndex:0,
          backgroundImage:`linear-gradient(${T.borderSub} 1px, transparent 1px), linear-gradient(90deg, ${T.borderSub} 1px, transparent 1px)`,
          backgroundSize:"80px 80px",
          transform:`translateY(${scrollY * 0.08}px)`,
          maskImage:"radial-gradient(ellipse 80% 80% at center, black 30%, transparent 80%)",
        }} />
        {/* Horizontal dividers */}
        <div style={{ position:"absolute", top:"20%", left:0, right:0, height:1, background:`linear-gradient(to right, transparent, ${T.accent}12, transparent)`, zIndex:0 }} />
        <div style={{ position:"absolute", bottom:"20%", left:0, right:0, height:1, background:`linear-gradient(to right, transparent, ${T.accent}12, transparent)`, zIndex:0 }} />

        {/* Content */}
        <div style={{ position:"relative", zIndex:2, maxWidth:860, margin:"0 auto", padding:"0 32px", textAlign:"center" }}>

          {/* Badge — same as Contact */}
          <div className="ev-badge">
            <span className="ev-badge-dot" />
            Abhivriddhi · Student Training &amp; Development Club
          </div>

          {/* Animated title */}
          <AnimTitle />

          {/* Sub text */}
          <p className="ev-hero-sub">
            Our events encompass a wide range of social skills development, career preparation, and leadership experiences essential for student growth.
          </p>

          {/* Divider */}
          <div className="ev-divider" />

          {/* Buttons */}
          <div className="h-anim-5" style={{ display:"flex", gap:16, justifyContent:"center", flexWrap:"wrap", marginTop:40 }}>
            <button
              onClick={() => document.getElementById("events")?.scrollIntoView({ behavior:"smooth" })}
              style={{
                fontFamily:"'DM Sans',sans-serif",
                fontSize:13, fontWeight:500, letterSpacing:"0.08em",
                color:T.bg, background:T.accent,
                border:"none", borderRadius:8,
                padding:"13px 32px", cursor:"pointer",
                transition:"background 0.3s, transform 0.2s",
              }}
              onMouseEnter={e => { e.target.style.background=T.accentHov; e.target.style.transform="scale(1.03)"; }}
              onMouseLeave={e => { e.target.style.background=T.accent; e.target.style.transform="scale(1)"; }}
            >
              Explore Events
            </button>
            <button style={{
              fontFamily:"'DM Sans',sans-serif",
              fontSize:13, fontWeight:400,
              color:T.textMuted, background:"transparent",
              border:`1px solid ${T.borderSub}`,
              borderRadius:8, padding:"13px 32px", cursor:"pointer",
              transition:"border-color 0.3s, color 0.3s",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor=T.accent+"50"; e.currentTarget.style.color=T.accent; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor=T.borderSub; e.currentTarget.style.color=T.textMuted; }}
            onClick={() => navigate('/about')}
            >
              About the Club
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-bob" style={{
          position:"absolute", bottom:90, right:40,
          display:"flex", flexDirection:"column", alignItems:"center", gap:6,
          opacity:0.35,
        }}>
          <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:10, color:T.textDim, letterSpacing:"0.2em", textTransform:"uppercase", writingMode:"vertical-rl" }}>Scroll</span>
          <div style={{ width:1, height:40, background:`linear-gradient(to bottom, ${T.accent}, transparent)` }} />
        </div>
      </section>

      {/* ══════════════════════════════════
          FEATURED EVENTS
      ══════════════════════════════════ */}
      <section id="events" style={{ padding:"120px 32px", maxWidth:1200, margin:"0 auto" }}>
        {/* Section header */}
        <Reveal>
          <SectionLabel>Featured Events</SectionLabel>
          <div style={{ display:"flex", flexDirection:"column", gap:4, marginBottom:64 }}>
            <h2 style={{
              fontFamily:"'Cormorant Garamond',serif",
              fontSize:"clamp(36px,5vw,56px)",
              fontWeight:300,
              color:T.text,
              lineHeight:1.1,
            }}>
              Landmark Experiences<br />
              <em style={{ color:T.accent, fontStyle:"italic" }}>Built for You</em>
            </h2>
          </div>
        </Reveal>

        <div style={{ display:"flex", flexDirection:"column", gap:24 }}>
          {featuredEvents.map((ev, i) => (
            <FeaturedEventCard key={ev.title} event={ev} index={i} reverse={i%2===1} />
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════
          DIVIDER
      ══════════════════════════════════ */}
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 32px" }}>
        <div style={{ height:1, background:`linear-gradient(to right, transparent, ${T.accent}18, transparent)` }} />
      </div>

      {/* ══════════════════════════════════
          MORE EVENTS GRID
      ══════════════════════════════════ */}
      <section style={{ padding:"120px 32px", background:T.bg2 }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <Reveal>
            <div style={{ textAlign:"center", marginBottom:60 }}>
              <SectionLabel>All Events</SectionLabel>
              <h2 style={{
                fontFamily:"'Cormorant Garamond',serif",
                fontSize:"clamp(32px,4.5vw,50px)",
                fontWeight:300,
                color:T.text,
                lineHeight:1.15,
              }}>
                More From <em style={{ color:T.accent }}>Abhivriddhi</em>
              </h2>
              <p style={{
                fontFamily:"'DM Sans',sans-serif",
                fontSize:14, color:T.textMuted,
                fontWeight:300, lineHeight:1.75,
                maxWidth:480, margin:"16px auto 0",
              }}>
                Every event is a stepping stone — explore the full spectrum of growth opportunities.
              </p>
            </div>
          </Reveal>

          <div className="more-grid" style={{
            display:"grid",
            gridTemplateColumns:"repeat(3,1fr)",
            gap:20,
          }}>
            {moreEvents.map((ev,i) => (
              <CompactCard key={ev.title} {...ev} delay={i*80} />
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding:"80px 32px", background:T.bg }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <Reveal>
            <div style={{ textAlign:"center", marginBottom:48 }}>
              <SectionLabel>Impact in Numbers</SectionLabel>
              <h2 style={{
                fontFamily:"'Cormorant Garamond',serif",
                fontSize:"clamp(32px,4.5vw,50px)",
                fontWeight:300,
                color:T.text,
                lineHeight:1.15,
              }}>The <em style={{ color:T.accent, fontStyle:"italic" }}>Measure</em> of Growth</h2>
            </div>
          </Reveal>
          <div style={{
            display:"grid",
            gridTemplateColumns:"repeat(3,1fr)",
            gap:16,
          }}>
            {[
              ["100+","Industry Experts & Inspiring Speakers"],
              ["75%","Students Built Their LinkedIn Profiles with Us"],
              ["15+","Partnered Colleges"],
              ["1,500+","Students Engaged in EATON Changing Gears"],
              ["80%","Participants Satisfied with Main Events"],
              ["800+","Attendees Per Event"],
            ].map(([n,l],i) => (
              <StatCard key={l} num={n} label={l} delay={i*80} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          CTA
      ══════════════════════════════════ */}
      <section style={{ padding:"120px 32px", background:T.bg2, position:"relative", overflow:"hidden" }}>
        {/* Subtle radial glow */}
        <div style={{
          position:"absolute",inset:0,pointerEvents:"none",
          background:`radial-gradient(ellipse 60% 70% at 50% 50%, ${T.accent}07 0%, transparent 70%)`,
        }} />
        <div style={{
          position:"absolute",
          top:0, left:0, right:0, height:1,
          background:`linear-gradient(to right, transparent, ${T.accent}20, transparent)`,
        }} />

        <div
          ref={ctaRef}
          style={{
            position:"relative",zIndex:1,
            maxWidth:720, margin:"0 auto", textAlign:"center",
            opacity: ctaVis ? 1 : 0,
            transform: ctaVis ? "translateY(0)" : "translateY(32px)",
            transition:"opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          <SectionLabel>Get Involved</SectionLabel>
          <h2 style={{
            fontFamily:"'Cormorant Garamond',serif",
            fontSize:"clamp(40px,6vw,72px)",
            fontWeight:300,
            color:T.text,
            lineHeight:1.08,
            marginBottom:20,
          }}>
            Be Part of Our<br />
            <em style={{ color:T.accent }}>Next Event</em>
          </h2>

          <p style={{
            fontFamily:"'DM Sans',sans-serif",
            fontSize:15, fontWeight:300,
            color:T.textMuted,
            lineHeight:1.8,
            maxWidth:500,
            margin:"0 auto 48px",
          }}>
            Join hundreds of students building skills, forging connections, and shaping their futures with Abhivriddhi.
          </p>

          <div style={{ display:"flex", gap:16, justifyContent:"center", flexWrap:"wrap", marginBottom:32 }}>
            <button style={{
              fontFamily:"'DM Sans',sans-serif",
              fontSize:14, fontWeight:500, letterSpacing:"0.06em",
              color:T.bg, background:T.accent,
              border:"none", borderRadius:8,
              padding:"14px 40px", cursor:"pointer",
              transition:"background 0.3s, transform 0.2s",
            }}
            onMouseEnter={e => { e.target.style.background=T.accentHov; e.target.style.transform="scale(1.03)"; }}
            onMouseLeave={e => { e.target.style.background=T.accent; e.target.style.transform="scale(1)"; }}
            >
              Join Now
            </button>
            <button style={{
              fontFamily:"'DM Sans',sans-serif",
              fontSize:14, fontWeight:400,
              color:T.textMuted,
              background:"transparent",
              border:`1px solid ${T.border}`,
              borderRadius:8,
              padding:"14px 40px", cursor:"pointer",
              transition:"border-color 0.3s, color 0.3s",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor=T.accent+"50"; e.currentTarget.style.color=T.accent; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor=T.border; e.currentTarget.style.color=T.textMuted; }}
            >
              Contact Us
            </button>
          </div>

          <p style={{
            fontFamily:"'DM Sans',sans-serif",
            fontSize:12, color:T.textDim,
            letterSpacing:"0.1em",
          }}>
            500+ students already part of the journey · Pune, Maharashtra
          </p>
        </div>
      </section>

      {/* footer handled by App.jsx */}
    </div>
  );
}