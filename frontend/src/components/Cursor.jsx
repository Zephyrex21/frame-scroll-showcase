import { useEffect, useRef } from 'react';

export default function Cursor({ theme }) {
  const dotRef   = useRef(null);
  const ringRef  = useRef(null);
  const posRef   = useRef({ x: -100, y: -100 });
  const ringPos  = useRef({ x: -100, y: -100 });
  const rafRef   = useRef(null);
  const hovering = useRef(false);

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const onMove = (e) => { posRef.current = { x: e.clientX, y: e.clientY }; };

    const onEnter = () => { hovering.current = true; };
    const onLeave = () => { hovering.current = false; };

    const interactables = 'a, button, [role="button"], input, textarea, label, [data-cursor]';

    const addHover = () => {
      document.querySelectorAll(interactables).forEach(el => {
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
    };

    const animate = () => {
      const { x, y } = posRef.current;
      dot.style.left   = `${x}px`;
      dot.style.top    = `${y}px`;

      /* Ring lags behind for elastic feel */
      ringPos.current.x += (x - ringPos.current.x) * 0.12;
      ringPos.current.y += (y - ringPos.current.y) * 0.12;
      ring.style.left = `${ringPos.current.x}px`;
      ring.style.top  = `${ringPos.current.y}px`;

      const scale = hovering.current ? 2.4 : 1;
      ring.style.transform = `translate(-50%, -50%) scale(${scale})`;
      ring.style.opacity   = hovering.current ? '0.5' : '1';

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove);
    addHover();
    animate();

    return () => {
      window.removeEventListener('mousemove', onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const gold = theme === 'light' ? '#9A7230' : '#C9973A';

  return (
    <>
      {/* Dot — snaps instantly */}
      <div ref={dotRef} style={{
        position: 'fixed',
        width: '5px', height: '5px',
        borderRadius: '50%',
        background: gold,
        pointerEvents: 'none',
        zIndex: 99999,
        transform: 'translate(-50%, -50%)',
        transition: 'background 0.4s ease',
      }} />
      {/* Ring — lags */}
      <div ref={ringRef} style={{
        position: 'fixed',
        width: '28px', height: '28px',
        borderRadius: '50%',
        border: `1px solid ${gold}`,
        pointerEvents: 'none',
        zIndex: 99998,
        transform: 'translate(-50%, -50%)',
        transition: 'transform 0.25s var(--ease-sharp), opacity 0.25s ease, border-color 0.4s ease',
      }} />
    </>
  );
}
