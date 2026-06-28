import { useRef, useEffect, useState } from 'react';

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

/* Animated number counter */
function Counter({ target, suffix = '', duration = 1600 }) {
  const [val, setVal] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting && !started) { setStarted(true); obs.disconnect(); } },
      { threshold: 0.5 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const startTime = performance.now();
    const tick = (now) => {
      const p = Math.min((now - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(ease * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [started, target, duration]);

  return (
    <span ref={ref} style={{
      fontFamily: 'var(--font-display)',
      fontSize: '52px',
      fontWeight: 300,
      color: 'var(--gold)',
      lineHeight: 1,
      display: 'inline-block',
      minWidth: '80px',
    }}>
      {val}{suffix}
    </span>
  );
}

const STATS = [
  { target: 60,  suffix: '',   unit: 'Years',   label: 'Of watchmaking excellence' },
  { target: 31,  suffix: '',   unit: 'Jewels',  label: 'Hand-set in the calibre' },
  { target: 72,  suffix: 'h', unit: '',         label: 'Guaranteed power reserve' },
  { target: 100, suffix: '',   unit: 'Metres',  label: 'Water resistance certified' },
];

export default function Introduction({ watch }) {
  const [sectionRef, visible] = useInView();

  return (
    <section id="craftsmanship" ref={sectionRef} style={{
      background: 'var(--bg-section)',
      padding: '140px 48px',
      borderTop: '1px solid var(--gold-border)',
      transition: 'var(--theme-transition)',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Eyebrow */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '64px',
          opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(20px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
        }}>
          <div style={{
            width: visible ? '40px' : '0px', height: '1px', background: 'var(--gold)',
            transition: 'width 1s ease 0.2s',
          }} />
          <span style={{ fontFamily:'var(--font-mono)', fontSize:'9px', letterSpacing:'0.35em', color:'var(--gold)', textTransform:'uppercase' }}>
            The Philosophy
          </span>
        </div>

        {/* Grid */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'80px', alignItems:'start' }}>

          {/* Left: headline */}
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(36px,4.5vw,60px)', fontWeight: 300,
            lineHeight: 1.15, letterSpacing: '0.02em', color: 'var(--ivory)',
            opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(30px)',
            transition: 'opacity 0.9s ease 0.1s, transform 0.9s ease 0.1s',
          }}>
            Precision is not<br />a compromise.<br />
            <em style={{ color:'var(--gold)', fontStyle:'italic' }}>It is a philosophy.</em>
          </h2>

          {/* Right: body */}
          <div style={{
            opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(30px)',
            transition: 'opacity 0.9s ease 0.25s, transform 0.9s ease 0.25s',
          }}>
            <p style={{ fontFamily:'var(--font-body)', fontSize:'15px', lineHeight:1.8, color:'var(--ivory-muted)', marginBottom:'28px', fontWeight:300 }}>
              {watch?.description || 'The AURIENT Imperion Chronographe represents six decades of unrelenting horological pursuit. Every component is crafted by hand, measured in microns, and certified by our master watchmakers in Geneva.'}
            </p>
            <p style={{ fontFamily:'var(--font-body)', fontSize:'15px', lineHeight:1.8, color:'var(--ivory-muted)', fontWeight:300 }}>
              The Calibre A-52 is entirely conceived, developed and produced in our workshops. Its construction demands eleven weeks of individual assembly — 346 components working in perfect concert, each a testament to human mastery over the mechanical world.
            </p>

            {/* Animated rule */}
            <div style={{
              width: visible ? '80px' : '0px', height:'1px', background:'var(--gold)',
              margin:'40px 0', transition:'width 1.2s ease 0.5s',
            }} />

            <p style={{ fontFamily:'var(--font-display)', fontStyle:'italic', fontSize:'17px', color:'var(--ivory)', letterSpacing:'0.04em' }}>
              {watch?.reference || 'Réf. A-52/001'}
            </p>
          </div>
        </div>

        {/* Animated stats */}
        <div style={{
          display:'grid', gridTemplateColumns:'repeat(4,1fr)',
          gap:'1px', marginTop:'100px', background:'var(--gold-border)',
        }}>
          {STATS.map((stat, i) => (
            <div key={stat.label} style={{
              background: 'var(--bg-section)',
              padding: '40px 32px',
              opacity: visible ? 1 : 0,
              transform: visible ? 'none' : 'translateY(24px)',
              transition: `opacity 0.8s ease ${0.35 + i * 0.1}s, transform 0.8s ease ${0.35 + i * 0.1}s`,
            }}>
              <div style={{ display:'flex', alignItems:'baseline', gap:'4px', marginBottom:'10px' }}>
                <Counter target={stat.target} suffix={stat.suffix} />
                {stat.unit && (
                  <span style={{ fontFamily:'var(--font-mono)', fontSize:'10px', letterSpacing:'0.2em', color:'var(--ivory-muted)', textTransform:'uppercase' }}>
                    {stat.unit}
                  </span>
                )}
              </div>
              <p style={{ fontFamily:'var(--font-body)', fontSize:'12px', color:'var(--ivory-muted)', letterSpacing:'0.06em', fontWeight:300 }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
