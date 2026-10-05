import { api } from '../services/api';
import { useAsync } from '../hooks/useAsync';
import { useFavorites } from '../hooks/useFavorites';
import ProductCard from '../components/ProductCard';
import Empty from '../components/Empty';
export default function Favorites() {
  const { ids } = useFavorites();
  const { data } = useAsync(() => api.getProducts(), []);
  const list = (data ?? []).filter(p => ids.includes(p.id));
  return (
    <div className="container section">
      <h1 className="h1">Избранное</h1>
      {list.length === 0 ? <Empty title="Здесь пока пусто" text="Отмечайте понравившиеся товары сердечком — они появятся здесь." /> : <div className="grid">{list.map(p => <ProductCard key={p.id} product={p} buyNow />)}</div>}
    </div>
  );
}
