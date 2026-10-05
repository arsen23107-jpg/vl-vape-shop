import { type CSSProperties, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

export type MorphPhase = 'closed' | 'opening' | 'open' | 'closing';

const duration = () => {
  if (typeof window === 'undefined') return 240;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 0;
  return typeof navigator.hardwareConcurrency === 'number' && navigator.hardwareConcurrency <= 4 ? 180 : 260;
};

const setTriggerPoint = (x: number, y: number) => {
  document.documentElement.style.setProperty('--morph-trigger-x', `${x}px`);
  document.documentElement.style.setProperty('--morph-trigger-y', `${y}px`);
};

export function MotionCoordinator() {
  useEffect(() => {
    const pointer = (event: PointerEvent) => {
      if ((event.target as Element | null)?.closest('button, a, [data-motion-trigger]')) setTriggerPoint(event.clientX, event.clientY);
    };
    const keyboard = (event: KeyboardEvent) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      const trigger = document.activeElement?.closest?.('button, a, [data-motion-trigger]');
      if (!trigger) return;
      const rect = trigger.getBoundingClientRect();
      setTriggerPoint(rect.left + rect.width / 2, rect.top + rect.height / 2);
    };
    document.documentElement.classList.add('motion-ready');
    document.addEventListener('pointerdown', pointer, true);
    document.addEventListener('keydown', keyboard, true);
    return () => {
      document.documentElement.classList.remove('motion-ready');
      document.removeEventListener('pointerdown', pointer, true);
      document.removeEventListener('keydown', keyboard, true);
    };
  }, []);
  return null;
}

export function useSoftMorph(initiallyOpen = false) {
  const [phase, setPhase] = useState<MorphPhase>(initiallyOpen ? 'opening' : 'closed');
  const phaseRef = useRef(phase);
  const timer = useRef<number | null>(null);
  const surface = useRef<HTMLElement | null>(null);
  const [origin, setOrigin] = useState({ x: '50%', y: '50%', dx: '0px', dy: '0px' });

  const clear = useCallback(() => {
    if (timer.current !== null) window.clearTimeout(timer.current);
    timer.current = null;
  }, []);
  const captureOrigin = useCallback(() => {
    const x = Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--morph-trigger-x'));
    const y = Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--morph-trigger-y'));
    const rect = surface.current?.getBoundingClientRect();
    if (!rect || !Number.isFinite(x) || !Number.isFinite(y)) return;
    setOrigin({ x: `${x - rect.left}px`, y: `${y - rect.top}px`, dx: `${x - (rect.left + rect.width / 2)}px`, dy: `${y - (rect.top + rect.height / 2)}px` });
  }, []);
  useLayoutEffect(() => { if (phase !== 'closed') captureOrigin(); }, [phase, captureOrigin]);
  useEffect(() => () => clear(), [clear]);

  const open = useCallback(() => {
    clear();
    phaseRef.current = 'opening';
    setPhase('opening');
    timer.current = window.setTimeout(() => { phaseRef.current = 'open'; setPhase('open'); }, duration());
  }, [clear]);
  const close = useCallback(() => {
    clear();
    if (phaseRef.current === 'closed') return;
    phaseRef.current = 'closing';
    setPhase('closing');
    timer.current = window.setTimeout(() => { phaseRef.current = 'closed'; setPhase('closed'); }, duration());
  }, [clear]);
  const toggle = useCallback(() => (phaseRef.current === 'opening' || phaseRef.current === 'open' ? close() : open()), [close, open]);
  const ref = useCallback((node: HTMLElement | null) => { surface.current = node; }, []);
  const style = { '--morph-origin-x': origin.x, '--morph-origin-y': origin.y, '--morph-dx': origin.dx, '--morph-dy': origin.dy } as CSSProperties;
  return { phase, present: phase !== 'closed', open, close, toggle, ref, style };
}

export const morphClass = (phase: MorphPhase) => `soft-morph soft-morph--${phase}`;
