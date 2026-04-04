import { useEffect, useRef } from 'react';

export default function Philosophy() {
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });

    if (leftRef.current) observer.observe(leftRef.current);
    if (rightRef.current) observer.observe(rightRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="philosophy">
      <div className="philosophy-left reveal" ref={leftRef}>
        <div className="section-label">Our Ethos</div>
        <h2 className="section-heading">Where Discipline<br />Meets <em>Ambition</em></h2>
        <div className="philosophy-body">
          <p>Abhivriddhi was born from a simple conviction: technical skill alone does not define a leader. The modern world demands something rarer — individuals who can navigate complexity with composure, communicate with precision, and lead with integrity.</p>
          <p>We exist to cultivate that rare quality. Through curated programming, expert mentorship, and a community of driven peers, we engineer the conditions for genuine, lasting growth.</p>
        </div>
      </div>
      <div className="philosophy-right reveal-stagger" ref={rightRef}>
        <div className="pillar">
          <div className="pillar-num">01</div>
          <div className="pillar-title">Technical Prowess</div>
          <div className="pillar-desc">Bridging the gap between classroom knowledge and real-world application through hands-on exposure.</div>
        </div>
        <div className="pillar">
          <div className="pillar-num">02</div>
          <div className="pillar-title">Professional Presence</div>
          <div className="pillar-desc">Developing the soft skills, communication, and executive presence that define tomorrow's leaders.</div>
        </div>
        <div className="pillar">
          <div className="pillar-num">03</div>
          <div className="pillar-title">Global Excellence</div>
          <div className="pillar-desc">Setting standards that transcend local benchmarks — preparing members for the global stage.</div>
        </div>
      </div>
    </section>
  );
}
