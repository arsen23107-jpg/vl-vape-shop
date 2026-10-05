import { useSearchParams } from 'react-router-dom';
import { api } from '../services/api';
import { useAsync } from '../hooks/useAsync';
import { categories } from '../data/categories';
import ProductCard from '../components/ProductCard';
import Empty from '../components/Empty';
export default function Catalog() {
  const [sp, setSp] = useSearchParams();
  const cat = sp.get('category') || '';
  const { data, loading } = useAsync(() => api.getProducts(cat || undefined), [cat]);
  return (
    <div className="container section">
      <h1 className="h1">Каталог</h1>
      <div className="chips" role="tablist" aria-label="Категории">
        <button className={'chip' + (!cat ? ' is-on' : '')} onClick={() => setSp({})}>Все</button>
        {categories.map(c => <button key={c.id} className={'chip' + (cat === c.slug ? ' is-on' : '')} onClick={() => setSp({ category: c.slug })}>{c.title}</button>)}
      </div>
      <div key={cat} className="soft-morph-content">
        {loading && <div className="grid">{[0, 1, 2, 3].map(i => <div key={i} className="skeleton" />)}</div>}
        {data && data.length === 0 && <Empty title="Каталог скоро будет доступен" text="Мы готовим ассортимент. Загляните позже." />}
        {data && data.length > 0 && <div className="grid">{data.map(p => <ProductCard key={p.id} product={p} />)}</div>}
      </div>
    </div>
  );
}
