import { type CSSProperties, type RefCallback, useState } from 'react';
import Modal from './Modal';
import Icon from './Icon';
import { api } from '../services/api';
import { useAsync } from '../hooks/useAsync';
import { Link } from 'react-router-dom';
import { type MorphPhase } from '../motion/softMorph';
export default function SearchOverlay({ onClose, phase, originStyle, surfaceRef }: { onClose: () => void; phase: MorphPhase; originStyle: CSSProperties; surfaceRef: RefCallback<HTMLDivElement> }) {
  const [q, setQ] = useState('');
  const { data } = useAsync(() => (q.trim() ? api.getProducts(undefined, q) : Promise.resolve([])), [q]);
  return (
    <Modal title="Поиск" onClose={onClose} phase={phase} originStyle={originStyle} surfaceRef={surfaceRef} full>
      <label className="search"><Icon name="search" /><input autoFocus value={q} onChange={e => setQ(e.target.value)} placeholder="Поиск по каталогу" aria-label="Поиск по каталогу" /></label>
      <div className="search__res">
        {!q.trim() && <p className="muted">Начните вводить название товара</p>}
        {q.trim() && data && data.length === 0 && <p className="muted">Ничего не найдено по запросу «{q}»</p>}
        <div className="search__results">{data?.map(p => <Link key={p.id} to={`/product/${p.id}`} onClick={onClose} className="search-result"><img src={p.image} alt="" width={96} height={96} /><span><b>{p.title}</b><small>{p.price === undefined ? 'Цена уточняется' : `${new Intl.NumberFormat('ru-RU').format(p.price)} ₽`}</small><em>В наличии</em></span></Link>)}</div>
      </div>
    </Modal>
  );
}
