import { Link, useNavigate } from 'react-router-dom';
import Icon from './Icon';
import { useFavorites } from '../hooks/useFavorites';
import { useCart } from '../hooks/useCart';
import { categories } from '../data/categories';
import type { Product } from '../types';
const AV = { in_stock: 'В наличии', low: 'Заканчивается', out: 'Нет в наличии' };
const fmt = (n: number) => new Intl.NumberFormat('ru-RU').format(n) + ' ₽';
export default function ProductCard({ product: p, buyNow = false }: { product: Product; buyNow?: boolean }) {
  const { has, toggle } = useFavorites();
  const { add } = useCart();
  const navigate = useNavigate();
  const category = categories.find(item => item.slug === p.category)?.title ?? p.category;
  return (
    <article className="pcard">
      <Link to={`/product/${p.id}`} className="pcard__img">
        {p.image ? <img src={p.image} alt={p.title} loading="lazy" width={400} height={400} /> : <span className="logo">VL</span>}
        {p.badges?.map(b => <span key={b} className="badge">{b}</span>)}
      </Link>
      <button className={'pcard__fav' + (has(p.id) ? ' is-on' : '')} aria-pressed={has(p.id)} aria-label="В избранное" onClick={() => toggle(p.id)}><Icon name="heart" fill={has(p.id)} /></button>
      <div className="pcard__body">
        <span className="muted">{category}</span>
        <h3>{p.title}</h3>
        {p.price !== undefined ? <div className="pcard__row"><b>{fmt(p.price)}</b>{p.oldPrice && <s className="muted">{fmt(p.oldPrice)}</s>}</div> : <span className="muted">Цена уточняется</span>}
        <span className={'av av--' + p.availability}>{AV[p.availability]}</span>
        <button className="btn btn--accent pcard__add" onClick={() => { add(p.id); if (buyNow) navigate('/cart'); }}>{buyNow ? 'Купить' : 'Добавить в корзину'}</button>
      </div>
    </article>
  );
}
