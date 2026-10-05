import { Link } from 'react-router-dom';
import Icon from './Icon';
import MapEmbed from './MapEmbed';
import { stores } from '../data/stores';
export default function StorePreview() { return <section className="container home-section stores-preview" data-reveal><div className="section-heading"><div><p className="section-label">ПАР ЛАУНЖ рядом</p><h2>Наши магазины</h2></div><Link to="/stores" className="text-action">Все магазины <Icon name="arrow" size={17} /></Link></div><div className="stores-preview__layout"><div className="stores-preview__list">{stores.map(store => <a key={store.id} href={`https://yandex.ru/maps/?mode=search&text=${encodeURIComponent(`${store.city}, ${store.address}`)}`} target="_blank" rel="noreferrer"><small>{store.city}</small><b>{store.address}</b><span>{store.openingHours}</span></a>)}</div><MapEmbed className="map-preview" /></div></section>; }
