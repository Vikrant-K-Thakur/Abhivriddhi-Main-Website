import { useEffect, useRef } from 'react';

const pillars = [
  {
    num: '01',
    title: 'Technical Prowess',
    desc: 'Bridging the gap between classroom knowledge and real-world application through hands-on exposure.',
  },
  {
    num: '02',
    title: 'Professional Presence',
    desc: "Developing the soft skills, communication, and executive presence that define tomorrow's leaders.",
  },
  {
    num: '03',
    title: 'Global Excellence',
    desc: 'Setting standards that transcend local benchmarks — preparing members for the global stage.',
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
        const pct = idx < 0 ? 0 : ((idx + 1) / pillars.length) * 100;
        bar.style.height = `${pct}%`;
      }
    };

    const observers = cards.map((card, i) => {
      if (!card) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(i);
        },
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
        const shift = (-rect.top / (rect.height - window.innerHeight) - (i / pillars.length)) * 18;
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
          <div className="section-label">Our Ethos</div>
          <h2 className="phil-heading">
            Where Discipline<br />Meets <em>Ambition</em>
          </h2>
          <p className="phil-sub">
            We engineer the conditions for genuine, lasting growth — bridging
            technical mastery with the presence that defines real leaders.
          </p>
          <div className="phil-progress-track">
            <div className="phil-progress-bar" ref={progressBarRef} />
            <div className="phil-dots">
              {pillars.map((p, i) => (
                <div
                  key={i}
                  className="phil-dot"
                  ref={el => dotsRef.current[i] = el}
                  title={p.title}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT scrolling cards */}
      <div className="phil-right">
        <div className="phil-cards-wrap">
          {pillars.map((p, i) => (
            <div
              className="phil-card"
              key={i}
              ref={el => cardsRef.current[i] = el}
            >
              <div className="phil-card-num">{p.num}</div>
              <div className="phil-card-body">
                <div className="phil-card-title">{p.title}</div>
                <div className="phil-card-desc">{p.desc}</div>
              </div>
              <div className="phil-card-glow" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
