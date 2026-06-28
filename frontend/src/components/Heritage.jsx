import { useRef, useEffect, useState } from 'react';

const TIMELINE = [
  { year:'1963', title:'The Founding', body:'Philippe Aurient, a former Jaeger-LeCoultre master watchmaker, establishes AURIENT Genève with twelve apprentices in a single atelier on the Rue du Rhône.' },
  { year:'1971', title:'Calibre A-12', body:'The first entirely in-house chronograph movement. Awarded the Geneva Watchmaking Prize. Sets the foundation for six decades of complication mastery.' },
  { year:'1984', title:'The Imperion', body:'Introduction of the Imperion collection in 18ct gold — immediately coveted by collectors across three continents. A six-month waiting list forms within weeks.' },
  { year:'1997', title:'Calibre A-34', body:'A breakthrough: 50-hour power reserve in a 38mm case. Debuts at Baselworld to a standing ovation. The movement is exhibited at the Musée d\'Horlogerie du Locle.' },
  { year:'2008', title:'Calibre A-47', body:'31 jewels, 72-hour reserve, and the introduction of the oscillating micro-rotor. The A-47 is listed by Revolution Magazine as one of the twenty greatest movements ever made.' },
  { year:'2016', title:'COSC Certification', body:'Every Imperion leaves Geneva with Official Chronometer certification — a standard applied across the entire collection, not merely selected references.' },
  { year:'2024', title:'Calibre A-52', body:'346 components. 11 weeks of assembly. One master watchmaker per movement. The Imperion Chronographe — the complete expression of six decades of accumulated wisdom.' },
];

function useInView() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

export default function Heritage() {
  const [headRef, visible] = useInView();
  const trackRef = useRef(null);
  const [canLeft,  setCanLeft]  = useState(false);
  const [canRight, setCanRight] = useState(true);

  const checkScroll = () => {
    const t = trackRef.current;
    if (!t) return;
    setCanLeft(t.scrollLeft > 10);
    setCanRight(t.scrollLeft < t.scrollWidth - t.clientWidth - 10);
  };

  const scroll = (dir) => {
    const t = trackRef.current;
    if (!t) return;
    t.scrollBy({ left: dir * 360, behavior: 'smooth' });
  };

  return (
    <section id="heritage" style={{
      background: 'var(--bg-dark)',
      borderTop: '1px solid var(--gold-border)',
      padding: '120px 0 100px',
      overflow: 'hidden',
      transition: 'var(--theme-transition)',
    }}>
      {/* Header */}
      <div ref={headRef} style={{ maxWidth:'1200px', margin:'0 auto', padding:'0 48px', marginBottom:'64px' }}>
        <div style={{
          display:'flex', justifyContent:'space-between', alignItems:'flex-end',
          opacity: visible ? 1 : 0, transition:'opacity 0.8s ease',
        }}>
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:'20px', marginBottom:'20px' }}>
              <div style={{ width: visible ? '40px':'0', height:'1px', background:'var(--gold)', transition:'width 1s ease 0.2s' }} />
              <span style={{ fontFamily:'var(--font-mono)', fontSize:'9px', letterSpacing:'0.35em', color:'var(--gold)', textTransform:'uppercase' }}>Since 1963</span>
            </div>
            <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(28px,3.8vw,48px)', fontWeight:300, color:'var(--ivory)', letterSpacing:'0.04em' }}>
              Six Decades of<br /><em style={{ color:'var(--gold)', fontStyle:'italic' }}>Horological Legacy</em>
            </h2>
          </div>
          {/* Arrow controls */}
          <div style={{ display:'flex', gap:'12px' }}>
            {[['←', -1], ['→', 1]].map(([arrow, dir]) => (
              <button key={arrow} onClick={() => scroll(dir)}
                style={{
                  width:'44px', height:'44px', border:'1px solid var(--gold-border)',
                  background:'transparent', color: (dir === -1 ? canLeft : canRight) ? 'var(--gold)' : 'var(--ivory-muted)',
                  fontFamily:'var(--font-body)', fontSize:'18px', lineHeight:1,
                  cursor:'none', transition:'color 0.3s ease, border-color 0.3s ease',
                  display:'flex', alignItems:'center', justifyContent:'center',
                }}
              >{arrow}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Horizontal scroll track */}
      <div
        ref={trackRef} id="heritage-track" className="heritage-track"
        onScroll={checkScroll}
        style={{
          display:'flex', gap:'0',
          overflowX:'auto', overflowY:'hidden',
          scrollbarWidth:'none', msOverflowStyle:'none',
          paddingLeft:'48px',
          cursor:'grab',
        }}
      >
        <style>{`#heritage-track::-webkit-scrollbar { display:none; }`}</style>
        {TIMELINE.map((entry, i) => (
          <div key={entry.year} style={{
            flexShrink: 0,
            width: '320px',
            borderLeft: '1px solid var(--gold-border)',
            paddingLeft: '32px',
            paddingRight: '32px',
            paddingBottom: '8px',
            opacity: visible ? 1 : 0,
            transform: visible ? 'none' : 'translateY(20px)',
            transition: `opacity 0.7s ease ${i * 0.08}s, transform 0.7s ease ${i * 0.08}s`,
          }}>
            {/* Year */}
            <p style={{ fontFamily:'var(--font-display)', fontSize:'56px', fontWeight:300, color:'var(--gold)', lineHeight:1, marginBottom:'12px', opacity:0.7 }}>
              {entry.year}
            </p>
            {/* Gold dot on timeline */}
            <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'20px' }}>
              <div style={{ width:'8px', height:'8px', borderRadius:'50%', background:'var(--gold)', flexShrink:0 }} />
              <div style={{ flex:1, height:'1px', background:'var(--gold-border)' }} />
            </div>
            <h3 style={{ fontFamily:'var(--font-display)', fontSize:'22px', fontWeight:400, color:'var(--ivory)', letterSpacing:'0.04em', marginBottom:'14px', lineHeight:1.2 }}>
              {entry.title}
            </h3>
            <p style={{ fontFamily:'var(--font-body)', fontSize:'13px', lineHeight:1.75, color:'var(--ivory-muted)', fontWeight:300 }}>
              {entry.body}
            </p>
          </div>
        ))}
        {/* End spacer */}
        <div style={{ flexShrink:0, width:'48px' }} />
      </div>
    </section>
  );
}
