import { useEffect, useRef } from 'react';

export default function Loader({ onDone }) {
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;

    const BRAND = 'ABHIVRIDDHI';
    const N = BRAND.length;

    const loader      = document.getElementById('ab-loader');
    const stripsRow   = document.getElementById('ab-strips-row');
    const sweepLine   = document.getElementById('ab-sweep-line');
    const brandCenter = document.getElementById('ab-brand-center');
    const brandName   = document.getElementById('ab-brand-name');
    const brandPresents = document.getElementById('ab-brand-presents');

    const stripEls  = [];
    const letterEls = [];

    for (let i = 0; i < N; i++) {
      const strip = document.createElement('div');
      strip.style.cssText = `flex:1;height:100%;background:#0a0d0f;position:relative;border-right:2px solid rgba(184,204,138,0.12);`;
      if (i === N - 1) strip.style.borderRight = 'none';

      const ltr = document.createElement('div');
      ltr.style.cssText = `position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:clamp(14px,3.5vw,46px);font-weight:900;color:#b8cc8a;opacity:0;user-select:none;`;
      ltr.textContent = BRAND[i];

      strip.appendChild(ltr);
      stripsRow.appendChild(strip);
      stripEls.push(strip);
      letterEls.push(ltr);
    }

    function wait(ms) { return new Promise(r => setTimeout(r, ms)); }

    function runSweep() {
      return new Promise(resolve => {
        const W = loader.offsetWidth;
        const sweepDuration = 1400;
        const stripWidth = W / N;
        let start = null;
        let lastRevealed = -1;

        function frame(ts) {
          if (!start) start = ts;
          const progress = Math.min((ts - start) / sweepDuration, 1);
          const lineX = -W + progress * (W * 2);
          sweepLine.style.transform = `translate(${lineX}px, -50%)`;

          const leadingEdge = lineX + W;
          for (let i = lastRevealed + 1; i < N; i++) {
            const stripCenter = stripWidth * i + stripWidth / 2;
            if (leadingEdge >= stripCenter) {
              letterEls[i].style.opacity = '1';
              lastRevealed = i;
            } else break;
          }

          if (progress < 1) requestAnimationFrame(frame);
          else resolve();
        }
        requestAnimationFrame(frame);
      });
    }

    async function run() {
      await runSweep();
      await wait(200);

      brandCenter.style.transition = 'opacity 0.25s ease';
      brandCenter.style.opacity = '1';

      brandName.style.transition = 'transform 0.9s cubic-bezier(0.16,1,0.3,1)';
      brandPresents.style.transition = 'transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s, opacity 0.5s ease 0.2s';
      brandName.style.transform = 'scale(1)';
      brandPresents.style.transform = 'scale(1)';
      brandPresents.style.opacity = '1';

      await wait(120);

      const center = Math.floor(N / 2);
      for (let i = 0; i < N; i++) {
        const delay = Math.abs(i - center) * 60;
        setTimeout(() => {
          stripEls[i].style.transition = `transform 0.45s cubic-bezier(0.55,0,1,0.45) ${delay}ms`;
          stripEls[i].style.transform = 'translateY(-105%)';
        }, 0);
      }

      await wait(700);
      await wait(300);

      // White flash
      const flash = document.createElement('div');
      flash.style.cssText = 'position:fixed;inset:0;background:#ffffff;z-index:99998;opacity:0;pointer-events:none;transition:opacity 0.18s ease;';
      document.body.appendChild(flash);
      await wait(20);
      flash.style.opacity = '1';
      await wait(180);

      loader.style.display = 'none';
      flash.style.transition = 'opacity 0.55s ease';
      flash.style.opacity = '0';
      await wait(300);
      loader.style.display = 'none';

      document.body.classList.add('loaded');
      onDone();
    }

    run();
  }, []);

  return (
    <>
      <style>{`
        @keyframes ab-pdot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.35;transform:scale(0.65)} }
      `}</style>
      <div id="ab-loader" style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: '#0a0d0f', overflow: 'hidden',
      }}>
        <div id="ab-strips-row" style={{ position: 'absolute', inset: 0, display: 'flex' }} />
        <div id="ab-sweep-line" style={{
          position: 'absolute', top: '50%', left: 0,
          transform: 'translate(-100%, -50%)',
          width: '100%', height: '2px',
          background: 'rgba(184,204,138,0.95)',
          boxShadow: '0 0 22px 8px rgba(184,204,138,0.35)',
          zIndex: 10,
        }} />
        <div id="ab-brand-center" style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          zIndex: 20, pointerEvents: 'none', opacity: 0,
        }}>
          <div id="ab-brand-name" style={{
            fontFamily: "'Saman', serif",
            fontSize: 'clamp(28px,5vw,72px)',
            fontWeight: 400,
            color: '#e8e4dc',
            letterSpacing: '0.04em',
            whiteSpace: 'nowrap',
            transform: 'scale(0.4)',
            background: '#0a0d0f',
            padding: '8px 32px',
          }}>Abhivriddhi</div>
          <div id="ab-brand-presents" style={{
            display: 'flex', alignItems: 'center', gap: 12,
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 'clamp(9px,1vw,13px)',
            fontWeight: 300,
            color: 'rgba(184,204,138,0.6)',
            letterSpacing: 'clamp(4px,1.2vw,10px)',
            textTransform: 'uppercase',
            marginTop: 8,
            whiteSpace: 'nowrap',
            transform: 'scale(0.4)',
            opacity: 0,
            background: '#0a0d0f',
            padding: '4px 24px',
          }}>
            <span style={{ display:'inline-block', width:'clamp(20px,3vw,48px)', height:1, background:'rgba(184,204,138,0.35)' }} />
            Presents
            <span style={{ display:'inline-block', width:'clamp(20px,3vw,48px)', height:1, background:'rgba(184,204,138,0.35)' }} />
          </div>
        </div>
      </div>
    </>
  );
}
