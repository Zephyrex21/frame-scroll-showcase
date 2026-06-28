import { useState, useEffect } from 'react';

const SECTIONS = [
  { id: 'hero',            label: 'Animation'     },
  { id: 'craftsmanship',   label: 'Philosophy'    },
  { id: 'collection',      label: 'Specifications' },
  { id: 'heritage',        label: 'Heritage'      },
  { id: 'craftsmanship-movement', label: 'Movement' },
  { id: 'boutiques',       label: 'Materials'     },
  { id: 'enquiry',         label: 'Enquiry'       },
];

export default function SectionNav() {
  const [active, setActive] = useState('hero');
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { threshold: 0.4 }
    );
    SECTIONS.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });

    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.5);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { obs.disconnect(); window.removeEventListener('scroll', onScroll); };
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div style={{
      position: 'fixed',
      right: '28px',
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 50,
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      alignItems: 'center',
      opacity: visible ? 1 : 0,
      transition: 'opacity 0.5s ease',
      pointerEvents: visible ? 'auto' : 'none',
    }}>
      {SECTIONS.map(s => {
        const isActive = active === s.id;
        return (
          <div key={s.id}
            style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '8px' }}
            onMouseEnter={() => setHovered(s.id)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => scrollTo(s.id)}
          >
            {/* Label tooltip */}
            <span style={{
              position: 'absolute',
              right: '22px',
              fontFamily: 'var(--font-mono)',
              fontSize: '9px',
              letterSpacing: '0.2em',
              color: 'var(--hero-gold)',
              whiteSpace: 'nowrap',
              opacity: hovered === s.id ? 1 : 0,
              transform: hovered === s.id ? 'translateX(0)' : 'translateX(6px)',
              transition: 'opacity 0.2s ease, transform 0.2s ease',
              textTransform: 'uppercase',
            }}>
              {s.label}
            </span>
            {/* Dot */}
            <div style={{
              width: isActive ? '8px' : '4px',
              height: isActive ? '8px' : '4px',
              borderRadius: '50%',
              background: isActive ? 'var(--hero-gold)' : 'rgba(201,151,58,0.35)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
            }} />
          </div>
        );
      })}
    </div>
  );
}
