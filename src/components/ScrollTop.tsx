import { useEffect, useState } from 'react';
import Icon from './Icon';

export default function ScrollTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const update = () => setVisible(window.scrollY > 420);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  if (!visible) return null;
  return <button className="scroll-top" aria-label="Наверх" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><Icon name="arrow" size={20} /></button>;
}
