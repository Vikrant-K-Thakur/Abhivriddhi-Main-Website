import { useState, useCallback } from 'react';
import './index.css';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import Numbers from './components/Numbers';
import Aftermovie from './components/Aftermovie';
import Footer from './components/Footer';

export default function App() {
  const [loaded, setLoaded] = useState(false);

  const handleLoaderDone = useCallback(() => {
    document.getElementById('loader').classList.add('hidden');
    document.body.classList.add('loaded');
    setLoaded(true);
  }, []);

  return (
    <>
      {!loaded && <Loader onDone={handleLoaderDone} />}
      <Navbar />
      <Hero />
      <Philosophy />
      <Numbers />
      <Aftermovie />
      <Footer />
    </>
  );
}
