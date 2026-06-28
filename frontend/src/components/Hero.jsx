import { useRef, useEffect, useState, useCallback } from 'react';

const FRAME_COUNT   = 240;
const SCROLL_HEIGHT = 5500;

/* ── 7 text phases synced to frame ranges ────────────────────────────────────
   Each phase has: frameStart, frameEnd, position, and content descriptor.
   Overlapping ranges allow crossfade between consecutive phases.
─────────────────────────────────────────────────────────────────────────── */
const PHASES = [
  {
    id: 0, frameStart: 0, frameEnd: 38,
    pos: { top: '50%', left: '50%', transform: 'translate(-50%,-50%)', textAlign: 'center', maxWidth: '560px' },
    render: () => (
      <div>
        <p style={{ fontFamily:'var(--font-mono)', fontSize:'9px', letterSpacing:'0.45em', color:'var(--hero-gold)', marginBottom:'14px', textTransform:'uppercase' }}>
          Horlogerie de Précision · Genève
        </p>
        <h1 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(60px,9vw,108px)', fontWeight:300, letterSpacing:'0.18em', color:'var(--hero-text)', lineHeight:1, textShadow:'0 4px 48px rgba(0,0,0,0.5)' }}>
          AURIENT
        </h1>
        <div style={{ width:'56px', height:'1px', background:'var(--hero-gold)', margin:'18px auto' }} />
        <p style={{ fontFamily:'var(--font-display)', fontStyle:'italic', fontSize:'clamp(16px,2vw,22px)', fontWeight:300, letterSpacing:'0.08em', color:'var(--hero-muted)' }}>
          Au-delà du Temps
        </p>
      </div>
    ),
  },
  {
    id: 1, frameStart: 32, frameEnd: 78,
    pos: { top: '50%', right: '5%', transform: 'translateY(-50%)', textAlign: 'left', maxWidth: '380px' },
    render: () => (
      <div>
        <div style={{ display:'flex', alignItems:'center', gap:'14px', marginBottom:'22px' }}>
          <div style={{ width:'28px', height:'1px', background:'var(--hero-gold)' }} />
          <span style={{ fontFamily:'var(--font-mono)', fontSize:'9px', letterSpacing:'0.35em', color:'var(--hero-gold)', textTransform:'uppercase' }}>The Architecture</span>
        </div>
        <p style={{ fontFamily:'var(--font-display)', fontSize:'clamp(36px,5vw,64px)', fontWeight:300, color:'var(--hero-text)', lineHeight:1.1, marginBottom:'6px' }}>
          346 Components.
        </p>
        <p style={{ fontFamily:'var(--font-display)', fontStyle:'italic', fontSize:'clamp(36px,5vw,64px)', fontWeight:300, color:'var(--hero-gold)', lineHeight:1.1, marginBottom:'24px' }}>
          One Movement.
        </p>
        <p style={{ fontFamily:'var(--font-body)', fontSize:'13px', lineHeight:1.8, color:'var(--hero-muted)', fontWeight:300 }}>
          The Imperion Chronographe begins not in a factory, but in silence — a single watchmaker's hands and six decades of inherited wisdom.
        </p>
      </div>
    ),
  },
  {
    id: 2, frameStart: 72, frameEnd: 118,
    pos: { top: '50%', left: '5%', transform: 'translateY(-50%)', textAlign: 'left', maxWidth: '360px' },
    render: () => (
      <div>
        <div style={{ display:'flex', alignItems:'center', gap:'14px', marginBottom:'22px' }}>
          <div style={{ width:'28px', height:'1px', background:'var(--hero-gold)' }} />
          <span style={{ fontFamily:'var(--font-mono)', fontSize:'9px', letterSpacing:'0.35em', color:'var(--hero-gold)', textTransform:'uppercase' }}>Precision</span>
        </div>
        <p style={{ fontFamily:'var(--font-display)', fontSize:'clamp(28px,4vw,52px)', fontWeight:300, color:'var(--hero-text)', lineHeight:1.15, marginBottom:'24px' }}>
          Every gear<br />
          <em style={{ color:'var(--hero-gold)', fontStyle:'italic' }}>set by hand.</em><br />
          Measured in<br />
          <em style={{ color:'var(--hero-gold)', fontStyle:'italic' }}>microns.</em>
        </p>
        {/* Jewel counter */}
        <div style={{ display:'flex', alignItems:'baseline', gap:'8px', borderTop:'1px solid var(--hero-border)', paddingTop:'18px' }}>
          <span style={{ fontFamily:'var(--font-display)', fontSize:'52px', fontWeight:300, color:'var(--hero-gold)', lineHeight:1 }}>31</span>
          <div>
            <p style={{ fontFamily:'var(--font-mono)', fontSize:'9px', letterSpacing:'0.3em', color:'var(--hero-gold)', textTransform:'uppercase' }}>Rubies</p>
            <p style={{ fontFamily:'var(--font-body)', fontSize:'11px', color:'var(--hero-muted)', letterSpacing:'0.06em', fontWeight:300 }}>individually hand-set</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 3, frameStart: 112, frameEnd: 152,
    pos: { top: '50%', left: '50%', transform: 'translate(-50%,-50%)', textAlign: 'center', maxWidth: '520px' },
    render: () => (
      <div style={{ background:'rgba(8,6,4,0.72)', border:'1px solid var(--hero-border)', padding:'32px 40px', backdropFilter:'blur(8px)' }}>
        <p style={{ fontFamily:'var(--font-mono)', fontSize:'9px', letterSpacing:'0.4em', color:'var(--hero-gold)', marginBottom:'20px', textTransform:'uppercase' }}>
          Calibre A-52 — At Full Expansion
        </p>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px 28px' }}>
          {[
            ['Movement','A-52 Self-Winding'],['Jewels','31 Rubies'],
            ['Frequency','28,800 bph'],['Power Reserve','72 Hours'],
            ['Diameter','40 mm'],['Chronometer','COSC Certified'],
          ].map(([l, v]) => (
            <div key={l} style={{ textAlign:'left', borderBottom:'1px solid rgba(201,151,58,0.12)', paddingBottom:'10px' }}>
              <p style={{ fontFamily:'var(--font-mono)', fontSize:'8px', letterSpacing:'0.25em', color:'var(--hero-muted)', textTransform:'uppercase', marginBottom:'4px' }}>{l}</p>
              <p style={{ fontFamily:'var(--font-display)', fontSize:'15px', color:'var(--hero-text)', letterSpacing:'0.04em' }}>{v}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 4, frameStart: 146, frameEnd: 188,
    pos: { top: '50%', right: '5%', transform: 'translateY(-50%)', textAlign: 'right', maxWidth: '400px' },
    render: () => (
      <div>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'flex-end', gap:'14px', marginBottom:'22px' }}>
          <span style={{ fontFamily:'var(--font-mono)', fontSize:'9px', letterSpacing:'0.35em', color:'var(--hero-gold)', textTransform:'uppercase' }}>Assembly</span>
          <div style={{ width:'28px', height:'1px', background:'var(--hero-gold)' }} />
        </div>
        <p style={{ fontFamily:'var(--font-display)', fontSize:'clamp(30px,4.2vw,56px)', fontWeight:300, color:'var(--hero-text)', lineHeight:1.15, marginBottom:'24px' }}>
          Brought together<br />
          in <em style={{ color:'var(--hero-gold)', fontStyle:'italic' }}>eleven weeks.</em>
        </p>
        <p style={{ fontFamily:'var(--font-body)', fontSize:'13px', lineHeight:1.8, color:'var(--hero-muted)', fontWeight:300 }}>
          Each Imperion requires 11 weeks of individual construction. The movement alone: seven. Inspected at 23 quality-control stations before leaving Geneva.
        </p>
        <div style={{ marginTop:'20px', display:'flex', justifyContent:'flex-end', gap:'28px' }}>
          {[['11','Weeks'],['23','Inspections'],['1','Watchmaker']].map(([n,l]) => (
            <div key={l} style={{ textAlign:'center' }}>
              <p style={{ fontFamily:'var(--font-display)', fontSize:'28px', fontWeight:300, color:'var(--hero-gold)', lineHeight:1 }}>{n}</p>
              <p style={{ fontFamily:'var(--font-mono)', fontSize:'8px', letterSpacing:'0.2em', color:'var(--hero-muted)', textTransform:'uppercase' }}>{l}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 5, frameStart: 182, frameEnd: 222,
    pos: { bottom: '12%', left: '5%', textAlign: 'left', maxWidth: '460px' },
    render: () => (
      <div>
        <div style={{ width:'40px', height:'1px', background:'var(--hero-gold)', marginBottom:'20px' }} />
        <p style={{ fontFamily:'var(--font-display)', fontStyle:'italic', fontSize:'clamp(22px,3.2vw,42px)', fontWeight:300, color:'var(--hero-text)', lineHeight:1.3, marginBottom:'16px' }}>
          "A single master watchmaker.<br />A single instrument."
        </p>
        <p style={{ fontFamily:'var(--font-mono)', fontSize:'9px', letterSpacing:'0.3em', color:'var(--hero-gold)', textTransform:'uppercase' }}>
          — Philippe Aurient, Founder · 1963
        </p>
      </div>
    ),
  },
  {
    id: 6, frameStart: 216, frameEnd: 239,
    pos: { bottom: '10%', left: '50%', transform: 'translateX(-50%)', textAlign: 'center', maxWidth: '480px' },
    render: (watch) => (
      <div>
        <p style={{ fontFamily:'var(--font-display)', fontStyle:'italic', fontSize:'clamp(36px,5vw,64px)', fontWeight:300, color:'var(--hero-text)', letterSpacing:'0.04em', marginBottom:'6px' }}>
          Imperion
        </p>
        <p style={{ fontFamily:'var(--font-mono)', fontSize:'9px', letterSpacing:'0.35em', color:'var(--hero-gold)', marginBottom:'24px', textTransform:'uppercase' }}>
          Réf. A-52/001 · AURIENT Genève
        </p>
        <p style={{ fontFamily:'var(--font-display)', fontSize:'38px', fontWeight:300, color:'var(--hero-text)', letterSpacing:'0.04em', marginBottom:'20px' }}>
          ${(watch?.price || 42500).toLocaleString()}
        </p>
        <button
          onClick={() => document.getElementById('enquiry')?.scrollIntoView({ behavior:'smooth' })}
          style={{
            fontFamily:'var(--font-mono)', fontSize:'10px', letterSpacing:'0.22em',
            textTransform:'uppercase', color:'#080604',
            background:'var(--hero-gold)', border:'none',
            padding:'14px 40px', cursor:'none',
          }}
          data-cursor
        >
          Reserve Yours
        </button>
      </div>
    ),
  },
];

/* ── Phase opacity + vertical offset from frame progress ─────────────────── */
function getPhaseStyle(phase, frame) {
  const { frameStart, frameEnd } = phase;
  if (frame < frameStart || frame > frameEnd) return { opacity: 0, y: 0 };
  const span    = frameEnd - frameStart;
  const fadeLen = Math.max(6, span * 0.22);
  const progress = frame - frameStart;

  let opacity = 1;
  if (progress < fadeLen)           opacity = progress / fadeLen;
  if (progress > span - fadeLen)    opacity = (span - progress) / fadeLen;

  /* slight upward drift as phase plays out */
  const mid = span / 2;
  const y   = ((frame - frameStart - mid) / span) * -18;

  return { opacity: Math.max(0, Math.min(1, opacity)), y };
}

export default function Hero({ watch }) {
  const canvasRef       = useRef(null);
  const heroRef         = useRef(null);
  const imagesRef       = useRef([]);
  const currentFrameRef = useRef(0);
  const phaseEls        = useRef([]);
  const rafRef          = useRef(null);

  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded,     setIsLoaded]     = useState(false);

  /* ── Draw frame ─────────────────────────────────────────────────────────── */
  const drawFrame = useCallback((index) => {
    const canvas = canvasRef.current;
    const img    = imagesRef.current[index];
    if (!canvas || !img) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    const cw = canvas.width, ch = canvas.height;
    const iw = img.naturalWidth || 1280, ih = img.naturalHeight || 720;
    const scale = Math.max(cw / iw, ch / ih);
    const dw = iw * scale, dh = ih * scale;
    ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
  }, []);

  /* ── Update text phase overlays directly (no React re-render) ─────────── */
  const updatePhases = useCallback((frame) => {
    PHASES.forEach((phase, i) => {
      const el = phaseEls.current[i];
      if (!el) return;
      const { opacity, y } = getPhaseStyle(phase, frame);
      el.style.opacity        = opacity;
      el.style.transform      = buildTransform(phase.pos.transform, y);
      el.style.pointerEvents  = opacity > 0.05 ? 'auto' : 'none';
    });
  }, []);

  function buildTransform(base = '', y) {
    if (base.includes('translate')) return `${base} translateY(${y}px)`;
    return `translateY(${y}px)`;
  }

  /* ── Canvas resize ──────────────────────────────────────────────────────── */
  useEffect(() => {
    const resize = () => {
      const c = canvasRef.current;
      if (!c) return;
      c.width  = window.innerWidth;
      c.height = window.innerHeight;
      drawFrame(currentFrameRef.current);
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [drawFrame]);

  /* ── Preload frames ─────────────────────────────────────────────────────── */
  useEffect(() => {
    let loaded = 0;
    const images = new Array(FRAME_COUNT).fill(null);
    imagesRef.current = images;

    const load = (i) => new Promise(resolve => {
      const img = new Image();
      img.decoding = 'async';
      img.onload = img.onerror = () => {
        images[i] = img;
        loaded++;
        setLoadProgress(Math.round((loaded / FRAME_COUNT) * 100));
        if (loaded === FRAME_COUNT) {
          imagesRef.current = images;
          setIsLoaded(true);
          drawFrame(0);
          updatePhases(0);
        }
        resolve();
      };
      img.src = `/frames/frame_${String(i).padStart(5, '0')}.jpg`;
    });

    /* Priority: first 30 frames first, then rest */
    const priority = Array.from({ length: 30 }, (_, i) => i);
    const rest     = Array.from({ length: FRAME_COUNT - 30 }, (_, i) => i + 30);
    Promise.all(priority.map(load)).then(() => Promise.all(rest.map(load)));
  }, [drawFrame, updatePhases]);

  /* ── Scroll driver ──────────────────────────────────────────────────────── */
  useEffect(() => {
    if (!isLoaded) return;
    const hero = heroRef.current;
    if (!hero) return;

    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const progress = Math.max(0, Math.min(1, (window.scrollY - hero.offsetTop) / SCROLL_HEIGHT));
        const frame    = Math.min(Math.floor(progress * (FRAME_COUNT - 1)), FRAME_COUNT - 1);
        if (frame !== currentFrameRef.current) {
          currentFrameRef.current = frame;
          drawFrame(frame);
          updatePhases(frame);
        }
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isLoaded, drawFrame, updatePhases]);

  return (
    <section ref={heroRef} id="hero"
      style={{ position:'relative', height:`calc(100vh + ${SCROLL_HEIGHT}px)` }}>

      {/* Sticky viewport */}
      <div style={{ position:'sticky', top:0, height:'100vh', width:'100%', overflow:'hidden', background:'var(--hero-bg)' }}>

        {/* Canvas */}
        <canvas ref={canvasRef} style={{
          position:'absolute', inset:0, width:'100%', height:'100%',
          opacity: isLoaded ? 1 : 0, transition:'opacity 0.8s ease',
        }} />

        {/* Vignette */}
        <div style={{
          position:'absolute', inset:0, pointerEvents:'none',
          background:`
            linear-gradient(to right,  rgba(8,6,4,0.55) 0%, transparent 35%),
            linear-gradient(to left,   rgba(8,6,4,0.55) 0%, transparent 35%),
            linear-gradient(to top,    rgba(8,6,4,0.65) 0%, transparent 30%),
            linear-gradient(to bottom, rgba(8,6,4,0.70) 0%, transparent 35%)
          `,
        }} />

        {/* ── Text Phase Overlays ── */}
        {PHASES.map((phase, i) => (
          <div
            key={phase.id}
            ref={el => phaseEls.current[i] = el}
            style={{
              position:'absolute',
              opacity: 0,
              pointerEvents: 'none',
              transition: 'none',
              zIndex: 5,
              padding: '0 40px',
              ...Object.fromEntries(
                Object.entries(phase.pos).filter(([k]) => k !== 'transform')
              ),
              transform: phase.pos.transform || 'none',
              maxWidth: phase.pos.maxWidth,
              textAlign: phase.pos.textAlign || 'left',
            }}
          >
            {phase.render(watch)}
          </div>
        ))}

        {/* Corner metadata — always visible once loaded */}
        {isLoaded && (
          <>
            <div style={{ position:'absolute', bottom:'36px', left:'44px' }}>
              <p style={{ fontFamily:'var(--font-mono)', fontSize:'8px', letterSpacing:'0.3em', color:'var(--hero-gold)', marginBottom:'4px' }}>
                RÉFERENCE A-52/001
              </p>
              <p style={{ fontFamily:'var(--font-body)', fontSize:'11px', letterSpacing:'0.1em', color:'var(--hero-muted)', fontWeight:300 }}>
                AURIENT Genève · Switzerland
              </p>
            </div>
            <div style={{ position:'absolute', bottom:'36px', right:'44px', display:'flex', flexDirection:'column', alignItems:'center', gap:'8px' }}>
              <p style={{ fontFamily:'var(--font-mono)', fontSize:'8px', letterSpacing:'0.3em', color:'var(--hero-muted)', writingMode:'vertical-lr', textTransform:'uppercase' }}>Scroll</p>
              <div style={{ width:'1px', height:'44px', background:'linear-gradient(to bottom,var(--hero-gold),transparent)', animation:'pulseGold 2s ease-in-out infinite' }} />
            </div>
          </>
        )}

        {/* Loading screen */}
        {!isLoaded && (
          <div style={{
            position:'absolute', inset:0, background:'var(--hero-bg)',
            display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
            gap:'32px', zIndex:10,
          }}>
            <div style={{ textAlign:'center' }}>
              <p style={{ fontFamily:'var(--font-display)', fontSize:'32px', fontWeight:400, letterSpacing:'0.3em', color:'var(--hero-gold)', marginBottom:'6px' }}>AURIENT</p>
              <p style={{ fontFamily:'var(--font-mono)', fontSize:'9px', letterSpacing:'0.35em', color:'var(--hero-muted)', textTransform:'uppercase' }}>Preparing your experience</p>
            </div>
            <div style={{ width:'220px' }}>
              <div style={{ height:'1px', background:'rgba(201,151,58,0.15)', overflow:'hidden' }}>
                <div style={{ height:'1px', width:`${loadProgress}%`, background:'var(--hero-gold)', transition:'width 0.15s ease' }} />
              </div>
              <div style={{ display:'flex', justifyContent:'space-between', marginTop:'10px' }}>
                <span style={{ fontFamily:'var(--font-mono)', fontSize:'9px', letterSpacing:'0.2em', color:'var(--hero-muted)' }}>Loading frames</span>
                <span style={{ fontFamily:'var(--font-mono)', fontSize:'9px', letterSpacing:'0.2em', color:'var(--hero-gold)' }}>{loadProgress}%</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
