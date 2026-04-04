import { useState, useCallback } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import Numbers from './components/Numbers';
import Aftermovie from './components/Aftermovie';
import About from './pages/About';
import Team from './pages/Team';
import Events from './pages/Events';
import Sponsors from './pages/Sponsors';
import Contact from './pages/Contact';

function Home() {
  return (
    <>
      <Hero />
      <Philosophy />
      <Numbers />
      <Aftermovie />
    </>
  );
}

export default function App() {
  const [loaded, setLoaded] = useState(false);

  const handleLoaderDone = useCallback(() => {
    document.body.classList.add('loaded');
    setLoaded(true);
  }, []);

  return (
    <BrowserRouter>
      <Loader hidden={loaded} onDone={handleLoaderDone} />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/team" element={<Team />} />
        <Route path="/events" element={<Events />} />
        <Route path="/sponsors" element={<Sponsors />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
