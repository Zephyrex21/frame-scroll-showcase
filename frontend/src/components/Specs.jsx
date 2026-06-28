import { useRef, useEffect, useState } from 'react';

function useInView() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

const DEFAULT_SPECS = [
  { label:'Calibre',          value:'A-52 Self-Winding' },
  { label:'Power Reserve',    value:'72 Hours' },
  { label:'Frequency',        value:'28,800 bph · 4 Hz' },
  { label:'Jewels',           value:'31 Rubies' },
  { label:'Diameter',         value:'40 mm' },
  { label:'Thickness',        value:'12.4 mm' },
  { label:'Lug Width',        value:'20 mm' },
  { label:'Water Resistance', value:'100 m · 330 ft' },
  { label:'Crystal',          value:'Sapphire, AR Coated' },
  { label:'Chronometer',      value:'COSC Certified' },
];

export default function Specs({ specs = [], reference }) {
  const [sectionRef, visible] = useInView();
  const all  = specs.length ? specs : DEFAULT_SPECS;
  const half = Math.ceil(all.length / 2);
  const cols = [all.slice(0, half), all.slice(half)];

  return (
    <section id="collection" ref={sectionRef} style={{
      background: 'var(--bg-void)',
      padding: '140px 48px',
      borderTop: '1px solid var(--gold-border)',
      transition: 'var(--theme-transition)',
    }}>
      <div style={{ maxWidth:'1200px', margin:'0 auto' }}>

        {/* Header row */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:'80px' }}>
          <div>
            <div style={{
              display:'flex', alignItems:'center', gap:'20px', marginBottom:'24px',
              opacity: visible ? 1 : 0, transition:'opacity 0.8s ease',
            }}>
              <div style={{ width: visible ? '40px' : '0', height:'1px', background:'var(--gold)', transition:'width 1s ease 0.1s' }} />
              <span style={{ fontFamily:'var(--font-mono)', fontSize:'9px', letterSpacing:'0.35em', color:'var(--gold)', textTransform:'uppercase' }}>
                Technical Specifications
              </span>
            </div>
            <h2 style={{
              fontFamily:'var(--font-display)', fontSize:'clamp(32px,4vw,52px)', fontWeight:300,
              letterSpacing:'0.04em', color:'var(--ivory)',
              opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(20px)',
              transition:'opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s',
            }}>Calibre A-52</h2>
          </div>
          <p style={{
            fontFamily:'var(--font-mono)', fontSize:'10px', letterSpacing:'0.2em', color:'var(--ivory-muted)',
            opacity: visible ? 1 : 0, transition:'opacity 0.8s ease 0.2s',
          }}>
            {reference || 'Réf. A-52/001'}
          </p>
        </div>

        {/* Spec rows — two columns */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0 80px' }}>
          {cols.map((col, ci) =>
            col.map((spec, si) => {
              const delay = 0.2 + (ci * half + si) * 0.045;
              return (
                <div key={spec.label} style={{
                  display:'flex', justifyContent:'space-between', alignItems:'center',
                  padding:'20px 0', borderBottom:'1px solid var(--gold-border)',
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'none' : `translateX(${ci === 0 ? '-12px' : '12px'})`,
                  transition:`opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
                }}>
                  <span style={{ fontFamily:'var(--font-body)', fontSize:'12px', letterSpacing:'0.12em', color:'var(--ivory-muted)', textTransform:'uppercase', fontWeight:300 }}>
                    {spec.label}
                  </span>
                  <span style={{ fontFamily:'var(--font-mono)', fontSize:'13px', color:'var(--ivory)', letterSpacing:'0.06em' }}>
                    {spec.value}
                  </span>
                </div>
              );
            })
          )}
        </div>

        {/* COSC badge */}
        <div style={{
          marginTop:'64px', display:'flex', alignItems:'center', gap:'24px',
          opacity: visible ? 1 : 0, transition:'opacity 0.8s ease 0.7s',
        }}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
            <path d="M3 20L7 10L14 16L21 10L25 20H3Z" stroke="var(--gold)" strokeWidth="1" fill="none" />
            <circle cx="3"  cy="20" r="1.5" fill="var(--gold)" />
            <circle cx="14" cy="6"  r="1.5" fill="var(--gold)" />
            <circle cx="25" cy="20" r="1.5" fill="var(--gold)" />
          </svg>
          <div>
            <p style={{ fontFamily:'var(--font-mono)', fontSize:'10px', letterSpacing:'0.22em', color:'var(--gold)', marginBottom:'3px' }}>COSC CERTIFIED CHRONOMETER</p>
            <p style={{ fontFamily:'var(--font-body)', fontSize:'12px', color:'var(--ivory-muted)', letterSpacing:'0.06em' }}>
              Accuracy certified to −4/+6 sec/day by the Official Swiss Chronometer Testing Institute
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
