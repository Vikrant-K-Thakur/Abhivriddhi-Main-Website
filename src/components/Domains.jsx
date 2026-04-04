import { useEffect, useRef } from 'react';

const domains = [
  {
    name: 'Public Relations',
    team: 'Team Public Relations',
    tag: 'PR & Communications',
    desc: 'Our PR team connects with communities, builds partnerships, and manages communication channels to strengthen the organization\'s presence.',
    color: '#b8cc8a',
    rotate: '-2.5deg',
  },
  {
    name: 'Technical',
    team: 'Team Technical',
    tag: 'Tech & Innovation',
    desc: 'Driving innovation through hands-on projects, workshops, and technical challenges that bridge academic learning with industry demands.',
    color: '#8ab4cc',
    rotate: '1.8deg',
  },
  {
    name: 'Design',
    team: 'Team Design',
    tag: 'Creative & Visual',
    desc: 'Crafting the visual identity of Abhivriddhi — from event branding to digital assets, our designers shape how the world sees us.',
    color: '#cc9e8a',
    rotate: '-1.2deg',
  },
  {
    name: 'Content',
    team: 'Team Content',
    tag: 'Writing & Strategy',
    desc: 'Telling our story through compelling narratives, social media strategy, and editorial content that resonates with our audience.',
    color: '#b08acc',
    rotate: '2.2deg',
  },
  {
    name: 'Operations',
    team: 'Team Operations',
    tag: 'Logistics & Management',
    desc: 'The backbone of every event — coordinating logistics, managing timelines, and ensuring every detail is executed with precision.',
    color: '#ccb88a',
    rotate: '-1.8deg',
  },
];

export default function Domains() {
  const sectionRef = useRef(null);
  const stickyRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    const sticky = stickyRef.current;
    const cards = cardRefs.current;
    const total = domains.length;

    function onScroll() {
      const rect = section.getBoundingClientRect();
      const sectionH = section.offsetHeight;
      const viewH = window.innerHeight;

      // progress: 0 at section top entering viewport, 1 at section bottom leaving
      const scrolled = -rect.top;
      const scrollable = sectionH - viewH;
      const progress = Math.max(0, Math.min(1, scrolled / scrollable));

      // each card occupies 1/total of the scroll range
      const step = 1 / total;

      cards.forEach((card, i) => {
        if (!card) return;
        const cardStart = i * step;
        const cardEnd = cardStart + step;
        const cardProgress = Math.max(0, Math.min(1, (progress - cardStart) / step));

        if (progress < cardStart) {
          // not yet reached
          card.style.transform = `translateY(60px) rotate(${domains[i].rotate}) scale(0.96)`;
          card.style.opacity = '0';
        } else if (progress >= cardStart && progress < cardEnd) {
          // active — slide in
          const slideIn = Math.min(1, cardProgress * 4); // fast entry
          const ty = 60 - slideIn * 60;
          const scale = 0.96 + slideIn * 0.04;
          card.style.transform = `translateY(${ty}px) rotate(${domains[i].rotate}) scale(${scale})`;
          card.style.opacity = `${slideIn}`;
        } else {
          // passed — stay stacked, slightly pushed up by next card
          const pushUp = (progress - cardEnd) / step;
          const ty = Math.min(pushUp * -18, -18);
          const scale = 1 - Math.min(pushUp * 0.03, 0.03);
          card.style.transform = `translateY(${ty}px) rotate(${domains[i].rotate}) scale(${scale})`;
          card.style.opacity = '1';
        }

        // z-index: later cards on top
        card.style.zIndex = i + 1;
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section id="domains" ref={sectionRef}>
      <div className="domains-sticky" ref={stickyRef}>
        <div className="domains-header">
          <div className="section-label">Our Domains</div>
          <h2 className="section-heading">The <em>Teams</em> Behind It All</h2>
        </div>
        <div className="domains-stack">
          {domains.map((d, i) => (
            <div
              className="domain-card"
              key={i}
              ref={el => cardRefs.current[i] = el}
              style={{ '--card-accent': d.color }}
            >
              <div className="domain-card-photo">
                <div className="domain-photo-placeholder">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <circle cx="24" cy="18" r="9" stroke="currentColor" strokeWidth="1.5" opacity="0.3"/>
                    <path d="M6 42c0-9.94 8.06-18 18-18s18 8.06 18 18" stroke="currentColor" strokeWidth="1.5" opacity="0.3" strokeLinecap="round"/>
                  </svg>
                  <span>Team Photo</span>
                </div>
              </div>
              <div className="domain-card-body">
                <div className="domain-card-tag">{d.tag}</div>
                <div className="domain-card-name">{d.name}</div>
                <div className="domain-card-team">{d.team}</div>
                <p className="domain-card-desc">{d.desc}</p>
              </div>
              <div className="domain-card-num">0{i + 1}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
