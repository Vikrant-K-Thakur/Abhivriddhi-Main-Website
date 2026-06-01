import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { triggerPageTransition } from './PageLoader';

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/events', label: 'Events' },
  { to: '/sponsors', label: 'Sponsors' },
  { to: '/contact', label: 'Contact Us' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  function handleClick(e, to) {
    e.preventDefault();
    setOpen(false);
    triggerPageTransition(to, navigate);
  }

  return (
    <nav id="navbar" className={scrolled ? 'scrolled' : ''}>
      <NavLink to="/" className="nav-logo" onClick={e => handleClick(e, '/')}>Abhivriddhi</NavLink>

      <ul className={`nav-links ${open ? 'nav-open' : ''}`}>
        {links.map(l => (
          <li key={l.to}>
            <NavLink
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) => isActive ? 'active' : ''}
              onClick={e => handleClick(e, l.to)}
            >
              {l.label}
            </NavLink>
          </li>
        ))}
      </ul>

      <button className="nav-hamburger" onClick={() => setOpen(o => !o)} aria-label="Toggle menu">
        <span className={open ? 'bar bar-top open' : 'bar bar-top'} />
        <span className={open ? 'bar bar-mid open' : 'bar bar-mid'} />
        <span className={open ? 'bar bar-bot open' : 'bar bar-bot'} />
      </button>
    </nav>
  );
}
