import { useEffect, useRef } from 'react';

export default function Cursor({ theme }) {
  const dotRef    = useRef(null);
  const ringRef   = useRef(null);
  const posRef    = useRef({ x: -100, y: -100 });
  const ringPos   = useRef({ x: -100, y: -100 });
  const rafRef    = useRef(null);
  const hovering  = useRef(false);
  const isDirty   = useRef(false); // FIX #10: only animate when cursor actually moved

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // FIX #9 + #10: track listeners for cleanup
    const listeners = [];

    const onMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      isDirty.current = true;
      if (!rafRef.current) rafRef.current = requestAnimationFrame(animate);
    };

    const onEnter = () => { hovering.current = true;  isDirty.current = true; };
    const onLeave = () => { hovering.current = false; isDirty.current = true; };

    // FIX #9: use event delegation instead of attaching to every element
    const onDocEnter = (e) => {
      if (e.target.closest('a, button, [role="button"], input, textarea, label, [data-cursor]')) {
        hovering.current = true; isDirty.current = true;
      }
    };
    const onDocLeave = (e) => {
      if (e.target.closest('a, button, [role="button"], input, textarea, label, [data-cursor]')) {
        hovering.current = false; isDirty.current = true;
      }
    };

    const animate = () => {
      rafRef.current = null;
      if (!isDirty.current) return; // FIX #10: skip if nothing changed

      const { x, y } = posRef.current;
      dot.style.left = `${x}px`;
      dot.style.top  = `${y}px`;

      const lerpFactor = 0.13;
      const dx = x - ringPos.current.x;
      const dy = y - ringPos.current.y;
      ringPos.current.x += dx * lerpFactor;
      ringPos.current.y += dy * lerpFactor;

      ring.style.left = `${ringPos.current.x}px`;
      ring.style.top  = `${ringPos.current.y}px`;

      const scale = hovering.current ? 2.4 : 1;
      ring.style.transform = `translate(-50%, -50%) scale(${scale})`;
      ring.style.opacity   = hovering.current ? '0.5' : '1';

      // Keep animating only if ring hasn't caught up yet
      const dist = Math.abs(dx) + Math.abs(dy);
      if (dist > 0.5) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        isDirty.current = false; // FIX #10: mark clean, stop RAF
      }
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onDocEnter); // FIX #9: delegation
    document.addEventListener('mouseout',  onDocLeave); // FIX #9: delegation

    return () => {
      // FIX #9: clean up all listeners
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onDocEnter);
      document.removeEventListener('mouseout',  onDocLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const gold = theme === 'light' ? '#9A7230' : '#C9973A';

  return (
    <>
      <div ref={dotRef} style={{
        position:'fixed', width:'5px', height:'5px', borderRadius:'50%',
        background: gold, pointerEvents:'none', zIndex:99999,
        transform:'translate(-50%,-50%)',
      }} />
      <div ref={ringRef} style={{
        position:'fixed', width:'28px', height:'28px', borderRadius:'50%',
        border:`1px solid ${gold}`, pointerEvents:'none', zIndex:99998,
        transform:'translate(-50%,-50%)',
        // FIX #11 (cursor): Removed conflicting CSS transition — RAF handles transform
        transition:'opacity 0.2s ease',
      }} />
    </>
  );
}
