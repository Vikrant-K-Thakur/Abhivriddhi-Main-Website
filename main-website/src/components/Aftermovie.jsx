import { useEffect, useRef, useState } from 'react';

export default function Aftermovie() {
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const [playing, setPlaying] = useState(false);

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
    <section id="aftermovie">
      <div className="aftermovie-left reveal" ref={leftRef}>
        <div className="section-label">EDGE Documentary</div>
        <h2 className="section-heading">Relive the <br /><em>EDGE</em> Experience</h2>
        <p className="aftermovie-body">Step back into the moments that defined EDGE — an experience built on growth, exposure, and transformation. The documentary captures the energy, learning, challenges, and memories that shaped the journey beyond classrooms. <br />
          From insightful interactions and real-world experiences to collaboration, confidence, and personal breakthroughs, every frame reflects the spirit of EDGE and the impact it leaves behind on every participant.</p>
        <div className="edition-tag">Legacy Edition 2026</div>
      </div>

      <div className="aftermovie-right reveal" ref={rightRef}>
        <div className="video-frame" onClick={() => setPlaying(true)}>
          {playing ? (
            <iframe
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 10, border: 'none' }}
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              allow="autoplay"
              allowFullScreen
            />
          ) : (
            <>
              <div className="video-scene">
                <svg viewBox="0 0 720 405" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', inset: 0 }}>
                  <defs>
                    <radialGradient id="roomLight" cx="50%" cy="40%" r="50%">
                      <stop offset="0%" stopColor="#2a3040" stopOpacity="1" />
                      <stop offset="100%" stopColor="#080c10" stopOpacity="1" />
                    </radialGradient>
                  </defs>
                  <rect width="720" height="405" fill="url(#roomLight)" />
                  <ellipse cx="360" cy="280" rx="280" ry="30" fill="#0d1018" opacity="0.8" />
                  <ellipse cx="180" cy="230" rx="28" ry="32" fill="#111820" />
                  <rect x="152" y="240" width="56" height="50" rx="4" fill="#111820" />
                  <ellipse cx="290" cy="225" rx="26" ry="30" fill="#131c26" />
                  <rect x="264" y="234" width="52" height="52" rx="4" fill="#131c26" />
                  <ellipse cx="430" cy="225" rx="26" ry="30" fill="#131c26" />
                  <rect x="404" y="234" width="52" height="52" rx="4" fill="#131c26" />
                  <ellipse cx="540" cy="230" rx="28" ry="32" fill="#111820" />
                  <rect x="512" y="240" width="56" height="50" rx="4" fill="#111820" />
                  <ellipse cx="360" cy="120" rx="60" ry="40" fill="rgba(200,180,120,0.06)" />
                  <rect width="720" height="405" fill="rgba(0,0,0,0.2)" />
                </svg>
              </div>
              <div className="play-btn">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#0a0d0f">
                  <polygon points="5,3 19,12 5,21" />
                </svg>
              </div>
            </>
          )}
        </div>
        <div className="video-caption">
          <span className="video-caption-left">Legacy Edition 2024</span>
          <span className="video-caption-right">04:12</span>
        </div>
      </div>
    </section>
  );
}
