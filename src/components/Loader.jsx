import { useEffect, useRef } from 'react';

export default function Loader({ hidden, onDone }) {
  const wordRef = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    const word = 'Abhivriddhi';
    const container = wordRef.current;
    const cursor = document.createElement('span');
    cursor.className = 'loader-cursor';
    container.appendChild(cursor);

    let i = 0;
    setTimeout(function type() {
      if (i < word.length) {
        const span = document.createElement('span');
        span.textContent = word[i];
        span.style.animationDelay = '0s';
        container.insertBefore(span, cursor);
        i++;
        setTimeout(type, 90);
      } else {
        setTimeout(onDone, 700);
      }
    }, 200);
  }, []);

  return (
    <div id="loader" className={hidden ? 'hidden' : ''}>
      <div className="loader-word" ref={wordRef}></div>
    </div>
  );
}
