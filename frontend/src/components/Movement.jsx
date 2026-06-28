import { useRef, useEffect, useState } from 'react';

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

const DETAILS = [
  { num:'01', label:'Integrated Architecture', body:'Every component of the A-52 calibre is manufactured in-house, from the mainspring to the oscillating rotor. Nothing is outsourced. Nothing is compromised.' },
  { num:'02', label:'346 Components',           body:'Each individually finished part is measured to micron tolerances before assembly by a single master watchmaker — a process that takes over seven weeks alone.' },
  { num:'03', label:'11 Weeks Assembly',         body:'A single Imperion Chronographe requires eleven weeks of individual construction. The movement alone accounts for seven of those weeks.' },
];

export default function Movement({ movement }) {
  const [sectionRef, visible] = useInView();

  return (
    <section id="craftsmanship-movement" ref={sectionRef} style={{
      position:'relative', background:'var(--bg-dark)',
      borderTop:'1px solid var(--gold-border)', overflow:'hidden',
      transition:'var(--theme-transition)',
    }}>
      {/* Full-bleed exploded view — frame 120 is the peak explode */}
      <div style={{ position:'relative', height:'75vh', minHeight:'520px', overflow:'hidden' }}>
        <img
          src="/frames/frame_00120.jpg"
          alt="Exploded view of the AURIENT Calibre A-52 movement"
          style={{
            width:'100%', height:'100%', objectFit:'cover', objectPosition:'center', display:'block',
            opacity: visible ? 1 : 0,
            transform: visible ? 'scale(1)' : 'scale(1.04)',
            transition:'opacity 1.2s ease, transform 1.4s ease',
          }}
        />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom, rgba(8,6,4,0.15) 0%, rgba(8,6,4,0.82) 100%)' }} />

        {/* Label overlay */}
        <div style={{
          position:'absolute', bottom:'48px', left:'48px',
          opacity: visible ? 1 : 0,
          transform: visible ? 'none' : 'translateY(20px)',
          transition:'opacity 1s ease 0.4s, transform 1s ease 0.4s',
        }}>
          <p style={{ fontFamily:'var(--font-mono)', fontSize:'9px', letterSpacing:'0.35em', color:'var(--hero-gold)', marginBottom:'10px', textTransform:'uppercase' }}>
            Exploded View · Calibre A-52
          </p>
          <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(32px,4.5vw,56px)', fontWeight:300, color:'var(--hero-text)', letterSpacing:'0.06em', lineHeight:1.1 }}>
            The Movement
          </h2>
        </div>

        {/* Right side stat */}
        <div style={{
          position:'absolute', bottom:'48px', right:'48px', textAlign:'right',
          opacity: visible ? 1 : 0,
          transition:'opacity 1s ease 0.6s',
        }}>
          <p style={{ fontFamily:'var(--font-display)', fontSize:'72px', fontWeight:300, color:'var(--hero-gold)', lineHeight:1, opacity:0.85 }}>346</p>
          <p style={{ fontFamily:'var(--font-mono)', fontSize:'9px', letterSpacing:'0.3em', color:'var(--hero-muted)', textTransform:'uppercase' }}>Components</p>
        </div>
      </div>

      {/* Details */}
      <div style={{ maxWidth:'1200px', margin:'0 auto', padding:'80px 48px 120px' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'20px', marginBottom:'64px' }}>
          <div style={{ width: visible ? '40px':'0', height:'1px', background:'var(--gold)', transition:'width 1s ease' }} />
          <span style={{ fontFamily:'var(--font-mono)', fontSize:'9px', letterSpacing:'0.35em', color:'var(--gold)', textTransform:'uppercase' }}>Master Horology</span>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'48px' }}>
          {DETAILS.map((d, i) => (
            <div key={d.num} style={{
              borderLeft:'1px solid var(--gold-border)', paddingLeft:'28px',
              opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(24px)',
              transition:`opacity 0.8s ease ${0.3 + i*0.15}s, transform 0.8s ease ${0.3 + i*0.15}s`,
            }}>
              <p style={{ fontFamily:'var(--font-mono)', fontSize:'9px', letterSpacing:'0.3em', color:'var(--gold)', marginBottom:'16px' }}>{d.num}</p>
              <h3 style={{ fontFamily:'var(--font-display)', fontSize:'22px', fontWeight:400, color:'var(--ivory)', letterSpacing:'0.04em', marginBottom:'14px', lineHeight:1.2 }}>{d.label}</h3>
              <p style={{ fontFamily:'var(--font-body)', fontSize:'13px', lineHeight:1.75, color:'var(--ivory-muted)', fontWeight:300 }}>{d.body}</p>
            </div>
          ))}
        </div>

        {/* Calibre summary strip */}
        {movement && (
          <div style={{
            marginTop:'72px', padding:'32px',
            border:'1px solid var(--gold-border)',
            display:'flex', gap:'0',
            opacity: visible ? 1 : 0, transition:'opacity 0.8s ease 0.65s',
          }}>
            {[
              ['Calibre',       movement.caliber],
              ['Type',          movement.type],
              ['Frequency',     movement.frequency],
              ['Power Reserve', movement.powerReserve],
              ['Jewels',        `${movement.jewels} Rubies`],
            ].map((item, i, arr) => (
              <div key={item[0]} style={{
                flex:1, padding:'0 28px',
                borderRight: i < arr.length-1 ? '1px solid var(--gold-border)' : 'none',
              }}>
                <p style={{ fontFamily:'var(--font-mono)', fontSize:'8px', letterSpacing:'0.3em', color:'var(--gold)', marginBottom:'8px', textTransform:'uppercase' }}>{item[0]}</p>
                <p style={{ fontFamily:'var(--font-display)', fontSize:'15px', color:'var(--ivory)', letterSpacing:'0.04em' }}>{item[1]}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
