import { useEffect, useRef, useState } from 'react';
import { stores } from '../data/stores';
const mapCenter: [number, number] = [83.712, 53.345];
export default function MapEmbed({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => { const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setReady(true); observer.disconnect(); } }, { rootMargin: '240px' }); if (ref.current) observer.observe(ref.current); return () => observer.disconnect(); }, []);
  const points = stores.filter((store) => store.coordinates).map((store) => `${store.coordinates![1]},${store.coordinates![0]},pm2blm`).join('~');
  const src = `https://static-maps.yandex.ru/1.x/?ll=${mapCenter.join(',')}&z=12&size=650,450&l=map&pt=${points}`;
  return <div ref={ref} className={'map-loader ' + className}>{ready ? <iframe
    className="yandex-map"
    title="Карта филиалов"
    src={src}
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  /> : <span>Загружаем карту магазинов…</span>}</div>;
}
