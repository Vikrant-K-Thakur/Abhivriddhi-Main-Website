import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const N = 6;
const STAGGER = 55;
const STRIP_DURATION = 420;

// Global interceptor — called by NavLinks before navigation
let _triggerTransition = null;
export function triggerPageTransition(to, navigate) {
  if (_triggerTransition) _triggerTransition(to, navigate);
  else navigate(to);
}

export default function PageLoader() {
  const location = useLocation();
  const containerRef = useRef(null);
  const stripRefs = useRef([]);
  const brandRef = useRef(null);
  const timers = useRef([]);
  const isAnimating = useRef(false);
  const pendingPath = useRef(null);

  function wait(ms) {
    return new Promise(r => { timers.current.push(setTimeout(r, ms)); });
  }
  function clearTimers() {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }

  async function closeStrips() {
    const container = containerRef.current;
    const strips = stripRefs.current;
    if (!container || !strips.length) return;

    // Reset strips above screen
    strips.forEach(s => {
      s.style.transition = 'none';
      s.style.transform = 'translateY(-100%)';
    });
    container.style.display = 'flex';
    container.offsetHeight; // force reflow

    // Slide down left to right
    strips.forEach((s, i) => {
      s.style.transition = `transform ${STRIP_DURATION}ms cubic-bezier(0.7,0,0.3,1) ${i * STAGGER}ms`;
      s.style.transform = 'translateY(0%)';
    });

    await wait((N - 1) * STAGGER + STRIP_DURATION + 30);
  }

  async function openStrips() {
    const container = containerRef.current;
    const strips = stripRefs.current;
    const brand = brandRef.current;
    if (!container || !strips.length) return;

    // Hide brand, open strips right to left
    if (brand) { brand.style.transition = 'opacity 0.15s ease'; brand.style.opacity = '0'; }

    strips.forEach((s, i) => {
      const openDelay = (N - 1 - i) * STAGGER;
      s.style.transition = `transform ${STRIP_DURATION}ms cubic-bezier(0.7,0,0.3,1) ${openDelay}ms`;
      s.style.transform = 'translateY(-100%)';
    });

    await wait((N - 1) * STAGGER + STRIP_DURATION + 80);
    container.style.display = 'none';
    isAnimating.current = false;
  }

  useEffect(() => {
    // Register global trigger
    _triggerTransition = async (to, navigate) => {
      if (isAnimating.current) return;
      isAnimating.current = true;
      clearTimers();

      // 1. Close strips FIRST
      await closeStrips();

      // 2. Show brand briefly
      const brand = brandRef.current;
      if (brand) {
        brand.style.transition = 'opacity 0.25s ease';
        brand.style.opacity = '1';
      }

      // 3. Navigate — new page renders behind closed strips
      navigate(to);

      await wait(500);

      // 4. Open strips to reveal new page
      await openStrips();
    };

    return () => { _triggerTransition = null; };
  }, []);

  // Also handle browser back/forward
  const prevPath = useRef(location.pathname);
  useEffect(() => {
    if (prevPath.current === location.pathname) return;
    prevPath.current = location.pathname;

    if (isAnimating.current) return; // already handled by triggerPageTransition
    // Browser back/forward — just open strips if they're closed
    openStrips();
  }, [location.pathname]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed', inset: 0, zIndex: 9998,
        display: 'none', alignItems: 'stretch',
        overflow: 'hidden',
      }}
    >
      {Array.from({ length: N }).map((_, i) => (
        <div
          key={i}
          ref={el => stripRefs.current[i] = el}
          style={{
            width: `${100 / N}%`,
            flexShrink: 0,
            height: '100%',
            background: '#0a0d0f',
            borderRight: i < N - 1 ? '1px solid rgba(184,204,138,0.2)' : 'none',
            boxSizing: 'border-box',
            transform: 'translateY(-100%)',
            willChange: 'transform',
          }}
        />
      ))}

      <div
        ref={brandRef}
        style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 2, pointerEvents: 'none', opacity: 0,
        }}
      >
        <span style={{
          fontFamily: "'Saman', serif",
          fontSize: 'clamp(28px,5vw,72px)',
          fontWeight: 400,
          color: '#e8e4dc',
          letterSpacing: '0.04em',
          whiteSpace: 'nowrap',
        }}>Abhivriddhi</span>
      </div>
    </div>
  );
}
