import { useEffect, useState } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav id="navbar" className={scrolled ? 'scrolled' : ''}>
      <a href="#" className="nav-logo">Abhivriddhi</a>
      <ul className="nav-links">
        <li><a href="#" className="active">Home</a></li>
        <li><a href="#">Resources</a></li>
        <li><a href="#">Team</a></li>
        <li><a href="#">Archives</a></li>
      </ul>
    </nav>
  );
}
