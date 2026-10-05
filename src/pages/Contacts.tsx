import { api } from '../services/api';
import { useAsync } from '../hooks/useAsync';
export default function Contacts() {
  const { data } = useAsync(() => api.getContacts());
  const rows = data ? [['Телефон', data.phone], ['Email', data.email], ['Режим работы', data.hours]].filter(r => r[1]) : [];
  return (
    <div className="container section">
      <h1 className="h1">Контакты</h1>
      {rows.length === 0 ? <p className="muted">Контактная информация скоро появится.</p> : <dl className="chars">{rows.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>}
      {data?.socials.map(s => <a key={s.url} className="btn btn--ghost" href={s.url} rel="noopener noreferrer">{s.name}</a>)}
    </div>
  );
}
