import { useEffect, useRef } from 'react';

const stats = [
  { target: 100, suffix: '+', label: 'Industry Experts & Inspiring Speakers' },
  { target: 75, suffix: '%', label: 'Students Built Their LinkedIn Profiles With Us' },
  { target: 15, suffix: '+', label: 'Partnered Colleges' },
  { target: 80, suffix: '%', label: 'Participants Satisfied with Main Events' },
  { target: 800, suffix: '+', label: 'Attendees Per Event' },
];

function animateCount(el, target, suffix) {
  const duration = 1800;
  const start = performance.now();
  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target).toLocaleString() + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

export default function Numbers() {
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const animated = useRef(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });

    const statObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const idx = e.target.dataset.idx;
          if (!animated.current.has(idx)) {
            animated.current.add(idx);
            const numEl = e.target.querySelector('.stat-number');
            const { target, suffix } = stats[idx];
            animateCount(numEl, target, suffix);
          }
          statObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.3 });

    if (headerRef.current) observer.observe(headerRef.current);
    if (gridRef.current) {
      observer.observe(gridRef.current);
      gridRef.current.querySelectorAll('.stat-card').forEach(c => statObs.observe(c));
    }

    return () => { observer.disconnect(); statObs.disconnect(); };
  }, []);

  return (
    <section id="numbers">
      <div className="numbers-header reveal" ref={headerRef}>
        <div className="section-label">Impact in Numbers</div>
        <h2 className="section-heading">The <em>Measure</em> of Growth</h2>
      </div>
      <div className="numbers-grid reveal-stagger" ref={gridRef}>
        {stats.map((s, i) => (
          <div className="stat-card" key={i} data-idx={i}>
            <div className="stat-number">0</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
