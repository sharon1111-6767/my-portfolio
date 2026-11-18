import { useEffect, useRef, useState } from 'react';

export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [hoveringInteractive, setHoveringInteractive] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!finePointer || reducedMotion) {
      return;
    }

    setEnabled(true);

    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    let frameId = 0;

    const onPointerMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      const target = e.target as HTMLElement | null;
      const interactive = Boolean(
        target?.closest('a, button, input, textarea, [role="button"]')
      );
      setHoveringInteractive(interactive);
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.22;
      currentY += (targetY - currentY) * 0.22;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      }
      frameId = requestAnimationFrame(animate);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    frameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      cancelAnimationFrame(frameId);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={ringRef}
      aria-hidden="true"
      className="fixed top-0 left-0 z-[60] pointer-events-none -ml-3 -mt-3 transition-opacity duration-150"
    >
      <div
        className={`w-6 h-6 rounded-full border transition-transform duration-150 ${
          hoveringInteractive
            ? 'scale-150 border-[#C6F36B] bg-[#C6F36B]/10'
            : 'scale-100 border-[#F2F0E8]/35'
        }`}
      />
    </div>
  );
}
