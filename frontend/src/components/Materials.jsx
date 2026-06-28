import { useRef, useEffect, useState } from 'react';

function useInView() {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, vis];
}

const ROWS = [
  {
    frame:'frame_00010.jpg', eyebrow:'The Case', reverse:false, tag:'Alloy Ref. 904L',
    title:'904L Oystersteel™', subtitle:'& 18ct Everose Gold',
    body:'AURIENT developed its own proprietary steel alloy — 904L Oystersteel™ — a grade used in high-performance aerospace. More resistant to corrosion and more lustrous than conventional steel, it develops a richer polish maintained for decades. Alternating 18ct Everose gold links are cast in-house and hand-finished in our Geneva atelier.',
  },
  {
    frame:'frame_00035.jpg', eyebrow:'The Dial', reverse:true, tag:'Sunray Grade I',
    title:'Black Lacquer', subtitle:'Sunray Finish',
    body:'The black lacquer dial undergoes fourteen separate finishing passes. Its sunray brushing radiates from the centre axis with absolute precision — any deviation beyond 0.03° is rejected. Applied indices are solid 18ct gold, each individually placed under 40× magnification by a single craftsperson.',
  },
  {
    frame:'frame_00200.jpg', eyebrow:'The Crystal', reverse:false, tag:'Hardness: 9 Mohs',
    title:'Sapphire Crystal', subtitle:'AR Coated, Scratch-Resistant',
    body:'Grown over 72 hours and ground to ±0.002mm flatness. Both surfaces carry our proprietary anti-reflective coating — applied in a vacuum chamber at 300°C — reducing surface reflection below 0.3%. The result is a crystal that appears invisible, offering an uninterrupted view of the dial at any angle.',
  },
];

function MaterialRow({ row }) {
  const [ref, vis] = useInView();
  return (
    <div ref={ref} style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:0, borderTop:'1px solid var(--gold-border)', minHeight:'520px' }}>

      {/* Image */}
      <div style={{ order: row.reverse ? 1 : 0, overflow:'hidden', position:'relative' }}>
        <img src={`/frames/${row.frame}`} alt={row.title} style={{
          width:'100%', height:'100%', objectFit:'cover', objectPosition:'center', display:'block',
          opacity: vis ? 1 : 0,
          transform: vis ? 'scale(1)' : `scale(1.05) translateX(${row.reverse ? '20px' : '-20px'})`,
          transition:'opacity 1s ease 0.1s, transform 1.2s ease 0.1s',
        }} />
        <div style={{
          position:'absolute', inset:0,
          background: row.reverse
            ? 'linear-gradient(to left, rgba(8,6,4,0.35), transparent)'
            : 'linear-gradient(to right, rgba(8,6,4,0.35), transparent)',
          pointerEvents:'none',
        }} />
      </div>

      {/* Text */}
      <div style={{
        order: row.reverse ? 0 : 1,
        background:'var(--bg-dark)',
        display:'flex', flexDirection:'column', justifyContent:'center',
        padding:'64px',
        opacity: vis ? 1 : 0,
        transform: vis ? 'none' : `translateX(${row.reverse ? '-30px' : '30px'})`,
        transition:'opacity 0.9s ease 0.2s, transform 0.9s ease 0.2s',
      }}>
        <div style={{ display:'flex', alignItems:'center', gap:'16px', marginBottom:'28px' }}>
          <div style={{ width:'28px', height:'1px', background:'var(--gold)' }} />
          <span style={{ fontFamily:'var(--font-mono)', fontSize:'9px', letterSpacing:'0.35em', color:'var(--gold)', textTransform:'uppercase' }}>{row.eyebrow}</span>
        </div>
        <h3 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(28px,3.2vw,42px)', fontWeight:300, color:'var(--ivory)', letterSpacing:'0.04em', lineHeight:1.15, marginBottom:'6px' }}>{row.title}</h3>
        <p style={{ fontFamily:'var(--font-display)', fontStyle:'italic', fontSize:'clamp(16px,1.8vw,22px)', color:'var(--gold)', fontWeight:300, letterSpacing:'0.06em', marginBottom:'28px' }}>{row.subtitle}</p>
        <p style={{ fontFamily:'var(--font-body)', fontSize:'13px', lineHeight:1.8, color:'var(--ivory-muted)', fontWeight:300, maxWidth:'420px', marginBottom:'36px' }}>{row.body}</p>
        <div style={{ display:'inline-flex', alignItems:'center', gap:'10px', alignSelf:'flex-start' }}>
          <div style={{ width:'6px', height:'1px', background:'var(--gold)' }} />
          <span style={{ fontFamily:'var(--font-mono)', fontSize:'9px', letterSpacing:'0.25em', color:'var(--ivory-muted)' }}>{row.tag}</span>
        </div>
      </div>
    </div>
  );
}

export default function Materials() {
  const [hRef, hVis] = useInView();
  return (
    <section id="boutiques" style={{ background:'var(--bg-dark)', transition:'var(--theme-transition)' }}>
      <div ref={hRef} style={{ maxWidth:'1200px', margin:'0 auto', padding:'120px 48px 64px' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'20px', marginBottom:'24px', opacity: hVis ? 1 : 0, transition:'opacity 0.8s ease' }}>
          <div style={{ width: hVis ? '40px':'0', height:'1px', background:'var(--gold)', transition:'width 1s ease 0.1s' }} />
          <span style={{ fontFamily:'var(--font-mono)', fontSize:'9px', letterSpacing:'0.35em', color:'var(--gold)', textTransform:'uppercase' }}>Materials</span>
        </div>
        <h2 style={{
          fontFamily:'var(--font-display)', fontSize:'clamp(32px,4vw,52px)', fontWeight:300,
          color:'var(--ivory)', letterSpacing:'0.04em',
          opacity: hVis ? 1 : 0, transform: hVis ? 'none' : 'translateY(20px)',
          transition:'opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s',
        }}>
          Uncompromising<br /><em style={{ color:'var(--gold)', fontStyle:'italic' }}>by Design</em>
        </h2>
      </div>
      {ROWS.map(row => <MaterialRow key={row.eyebrow} row={row} />)}
    </section>
  );
}
