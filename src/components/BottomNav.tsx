import { NavLink, useLocation } from 'react-router-dom';
import { useLayoutEffect, useRef, useState } from 'react';
import Icon from './Icon';
import { useCart } from '../hooks/useCart';
import { useFavorites } from '../hooks/useFavorites';
const items = [['/', 'Главная', 'home'], ['/catalog', 'Каталог', 'grid'], ['/cart', 'Корзина', 'cart'], ['/favorites', 'Избранное', 'heart']];
export default function BottomNav() {
  const { pathname } = useLocation();
  const barRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, ready: false });
  const activeIndex = Math.max(0, items.findIndex(([to]) => to !== '/' && pathname.startsWith(to)));
  const { count } = useCart();
  const { ids } = useFavorites();
  useLayoutEffect(() => {
    const update = () => {
      const bar = barRef.current;
      const item = itemRefs.current[activeIndex];
      if (!bar || !item) return;
      const outer = bar.getBoundingClientRect();
      const inner = item.getBoundingClientRect();
      setIndicator({ left: inner.left - outer.left + 5, width: inner.width - 10, ready: true });
    };
    update();
    addEventListener('resize', update);
    return () => removeEventListener('resize', update);
  }, [activeIndex]);
  return (
    <nav className="bottomnav" ref={barRef} aria-label="Мобильная навигация">
      <span className={'bottomnav__indicator' + (indicator.ready ? ' is-ready' : '')} style={{ transform: `translateX(${indicator.left}px)`, width: indicator.width }} aria-hidden="true" />
      {items.map(([to, l, i], index) => { const badge = to === '/cart' ? count : to === '/favorites' ? ids.length : 0; return <NavLink ref={node => { itemRefs.current[index] = node; }} key={to} to={to} end={to === '/'} className={index === activeIndex ? 'active' : ''}><i className="bottomnav__icon"><Icon name={i} />{badge > 0 && <b>{badge}</b>}</i><span>{l}</span></NavLink>; })}
    </nav>
  );
}
