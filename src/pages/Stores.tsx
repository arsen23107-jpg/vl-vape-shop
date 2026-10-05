import { api } from '../services/api';
import { useAsync } from '../hooks/useAsync';
import Empty from '../components/Empty';
import MapEmbed from '../components/MapEmbed';
const yandexSearch = (city: string, address: string) => `https://yandex.ru/maps/?mode=search&text=${encodeURIComponent(`${city}, ${address}`)}`;
export default function Stores() {
  const { data, loading } = useAsync(() => api.getStores());
  return (
    <div className="container section">
      <h1 className="h1">Магазины</h1>
      <div className="stores">
        <div className="stores__list">
          {loading && <div className="skeleton" />}
          {data?.length === 0 && <Empty title="Адреса скоро появятся" text="Мы обновляем информацию о магазинах." />}
          {data?.map(s => (
            <article key={s.id} className="store">
              <p className="store__city">{s.city}</p><h3><a className="store__address" href={yandexSearch(s.city, s.address)} target="_blank" rel="noreferrer">{s.address}</a></h3><p className="muted">{s.openingHours}</p>
              {s.phone && <a href={`tel:${s.phone}`}>{s.phone}</a>}{s.email && <a href={`mailto:${s.email}`}>{s.email}</a>}
              <a className="store__map-link" href={yandexSearch(s.city, s.address)} target="_blank" rel="noreferrer">Построить маршрут</a>
            </article>
          ))}
        </div>
        <aside className="map" aria-label="Карта магазинов"><MapEmbed /></aside>
      </div>
    </div>
  );
}
