import { useState, useEffect, useRef } from 'react';

const NAV_LINKS = ['Collection', 'Craftsmanship', 'Heritage', 'Boutiques'];

export default function Navbar({ watch, theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [hovered,  setHovered]  = useState(null);
  const [ctaHov,   setCtaHov]   = useState(false);
  const rafRef = useRef(null); // FIX #13: throttle scroll listener with RAF

  useEffect(() => {
    const fn = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        setScrolled(window.scrollY > 80);
      });
    };
    window.addEventListener('scroll', fn, { passive: true });
    return () => { window.removeEventListener('scroll', fn); if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  const scrollTo = (label) => {
    const idMap = { Collection:'collection', Craftsmanship:'craftsmanship', Heritage:'heritage', Boutiques:'boutiques' };
    document.getElementById(idMap[label])?.scrollIntoView({ behavior:'smooth' });
  };

  const navBg = scrolled
    ? theme === 'light' ? 'rgba(245,240,232,0.92)' : 'rgba(8,6,4,0.9)'
    : 'transparent';

  return (
    <nav style={{
      position:'fixed', top:0, left:0, right:0, zIndex:100,
      height:'72px', display:'flex', alignItems:'center', justifyContent:'space-between',
      padding:'0 48px',
      background: navBg,
      backdropFilter: scrolled ? 'blur(16px) saturate(1.4)' : 'none',
      borderBottom: `1px solid ${scrolled ? 'var(--hero-border)' : 'transparent'}`,
      transition: 'background 0.5s ease, border-color 0.5s ease',
    }}>

      {/* Logo */}
      <div style={{ display:'flex', flexDirection:'column', gap:'2px' }}>
        <span style={{ fontFamily:'var(--font-display)', fontSize:'20px', fontWeight:400, letterSpacing:'0.26em', color: scrolled ? 'var(--gold)' : 'var(--hero-gold)', lineHeight:1, transition:'color 0.4s ease' }}>
          AURIENT
        </span>
        <span style={{ fontFamily:'var(--font-mono)', fontSize:'8px', letterSpacing:'0.28em', color: scrolled ? 'var(--ivory-muted)' : 'var(--hero-muted)', textTransform:'uppercase', transition:'color 0.4s ease' }}>
          Genève · Est. 1963
        </span>
      </div>

      {/* Links */}
      <ul style={{ display:'flex', gap:'36px', listStyle:'none' }}>
        {NAV_LINKS.map(label => (
          <li key={label}>
            <span
              style={{
                fontFamily:'var(--font-body)', fontSize:'11px', letterSpacing:'0.18em',
                textTransform:'uppercase', fontWeight:300, cursor:'none',
                color: hovered === label
                  ? (scrolled ? 'var(--ivory)' : 'var(--hero-text)')
                  : (scrolled ? 'var(--ivory-muted)' : 'var(--hero-muted)'),
                transition:'color 0.25s ease',
              }}
              onMouseEnter={() => setHovered(label)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => scrollTo(label)}
              role="button" tabIndex={0}
            >{label}</span>
          </li>
        ))}
      </ul>

      {/* Right actions */}
      <div style={{ display:'flex', alignItems:'center', gap:'16px' }}>
        {/* Theme toggle */}
        <button onClick={toggleTheme} title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          style={{ width:'36px', height:'20px', borderRadius:'10px', background: theme === 'light' ? 'var(--gold)' : 'rgba(201,151,58,0.25)', border:'1px solid var(--hero-border)', position:'relative', transition:'background 0.4s ease', cursor:'none', flexShrink:0 }}
        >
          <div style={{ position:'absolute', top:'2px', left: theme === 'light' ? '18px' : '2px', width:'14px', height:'14px', borderRadius:'50%', background: theme === 'light' ? '#fff' : 'var(--hero-gold)', transition:'left 0.35s var(--ease-sharp)' }} />
        </button>
        {/* CTA */}
        <button
          onMouseEnter={() => setCtaHov(true)} onMouseLeave={() => setCtaHov(false)}
          onClick={() => document.getElementById('enquiry')?.scrollIntoView({ behavior:'smooth' })}
          style={{ fontFamily:'var(--font-mono)', fontSize:'10px', letterSpacing:'0.16em', textTransform:'uppercase', color: ctaHov ? '#080604' : 'var(--hero-gold)', background: ctaHov ? 'var(--hero-gold)' : 'transparent', border:'1px solid var(--hero-border)', padding:'8px 20px', transition:'background 0.3s ease, color 0.3s ease', cursor:'none' }}
        >
          Private Enquiry
        </button>
      </div>
    </nav>
  );
}
