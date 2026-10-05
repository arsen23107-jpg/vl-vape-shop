import { useState } from 'react';
import { stores } from '../data/stores';
const mapCenter: [number, number] = [83.712, 53.345];
export default function MapEmbed({ className = '' }: { className?: string }) {
  const [loaded, setLoaded] = useState(false);
  const points = stores.filter((store) => store.coordinates).map((store) => `${store.coordinates![1]},${store.coordinates![0]},pm2blm`).join('~');
  const src = `https://static-maps.yandex.ru/1.x/?ll=${mapCenter.join(',')}&z=12&size=650,450&l=map&pt=${points}`;
  return <div className={'map-loader ' + className}>
    <div className="map-fallback" aria-hidden="true"><span className="map-fallback__label">Барнаул</span>{stores.map((store, index) => <i key={store.id} className={`map-fallback__pin map-fallback__pin--${index + 1}`} />)}</div>
    <img className={'yandex-map' + (loaded ? ' is-loaded' : '')} src={src} alt="Карта магазинов ПАР ЛАУНЖ" loading={className ? 'lazy' : 'eager'} decoding="async" onLoad={() => setLoaded(true)} />
  </div>;
}
