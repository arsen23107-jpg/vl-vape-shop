import { useEffect, type CSSProperties, type ReactNode, type RefCallback } from 'react';
import Icon from './Icon';
import { morphClass, type MorphPhase } from '../motion/softMorph';
export default function Modal({ title, onClose, children, full, phase, originStyle, surfaceRef }: { title: string; onClose: () => void; children: ReactNode; full?: boolean; phase: MorphPhase; originStyle: CSSProperties; surfaceRef: RefCallback<HTMLDivElement> }) {
  useEffect(() => { const f = (e: KeyboardEvent) => e.key === 'Escape' && onClose(); addEventListener('keydown', f); document.body.style.overflow = 'hidden'; return () => { removeEventListener('keydown', f); document.body.style.overflow = ''; }; }, [onClose]);
  return (
    <div ref={surfaceRef} className={'modal ' + morphClass(phase)} style={originStyle} onMouseDown={e => e.target === e.currentTarget && onClose()}>
      <div className={'modal__box' + (full ? ' modal__box--full' : '')} role="dialog" aria-modal="true" aria-label={title}>
        <button className="iconbtn modal__x" aria-label="Закрыть" onClick={onClose}><Icon name="x" /></button>
        {children}
      </div>
    </div>
  );
}
