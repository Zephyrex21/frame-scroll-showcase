import { useState, useEffect } from 'react';
import axios from 'axios';

import Cursor      from './components/Cursor';
import SectionNav  from './components/SectionNav';
import Navbar      from './components/Navbar';
import Hero        from './components/Hero';
import Awards      from './components/Awards';
import Introduction from './components/Introduction';
import Specs       from './components/Specs';
import Movement    from './components/Movement';
import Heritage    from './components/Heritage';
import Materials   from './components/Materials';
import CTA         from './components/CTA';
import Footer      from './components/Footer';

const FALLBACK = {
  name: 'Imperion Chronographe',
  collection: 'Perpétuel',
  reference: 'Réf. A-52/001',
  tagline: 'Au-delà du Temps',
  description: 'The AURIENT Imperion Chronographe is the product of six decades of unrelenting horological pursuit. Every component — from the 18ct Everose gold bezel to the 31-jewel calibre — is crafted by hand, measured in microns, and certified by our master watchmakers in Geneva.',
  price: 42500,
  currency: 'USD',
  specs: [
    { label: 'Calibre',          value: 'A-52 Self-Winding' },
    { label: 'Power Reserve',    value: '72 Hours' },
    { label: 'Frequency',        value: '28,800 bph · 4 Hz' },
    { label: 'Jewels',           value: '31 Rubies' },
    { label: 'Diameter',         value: '40 mm' },
    { label: 'Thickness',        value: '12.4 mm' },
    { label: 'Lug Width',        value: '20 mm' },
    { label: 'Water Resistance', value: '100 m · 330 ft' },
    { label: 'Crystal',          value: 'Sapphire, AR Coated' },
    { label: 'Chronometer',      value: 'COSC Certified' },
  ],
  movement: { caliber:'A-52', type:'Automatic, Perpétuel Rotor', frequency:'28,800 bph', powerReserve:'72 hours', jewels:31 },
  materials: {
    case:     '904L Oystersteel™ & 18ct Everose Gold',
    dial:     'Black Lacquer — Sunray Finish',
    bracelet: 'Integrated Oyster Bracelet — Folding Clasp',
    crystal:  'Sapphire Crystal, Scratch-Resistant, AR Coating',
    caseback: 'Solid Screwback',
  },
};

export default function App() {
  const [watch, setWatch] = useState(null);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('aurient-theme') || 'dark';
  });

  /* Apply theme to <html> element */
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('aurient-theme', theme);
  }, [theme]);

  useEffect(() => {
    axios.get("https://aurient-backend.onrender.com/api/watch").then(r => setWatch(r.data)).catch(() => setWatch(FALLBACK));
  }, []);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');
  const data = watch || FALLBACK;

  return (
    <>
      <Cursor theme={theme} />
      <SectionNav />
      <Navbar watch={data} theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero theme={theme} watch={data} />
        <Awards />
        <Introduction watch={data} />
        <Specs specs={data.specs} reference={data.reference} />
        <Heritage />
        <Movement movement={data.movement} />
        <Materials materials={data.materials} />
        <CTA watch={data} />
      </main>
      <Footer />
    </>
  );
}
