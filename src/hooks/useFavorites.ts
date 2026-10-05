import { useCallback, useEffect, useState } from 'react';
const KEY = 'vl:favorites';
const EVENT = 'vl:favorites-change';
const read = (): string[] => { try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch { return []; } };
export function useFavorites() {
  const [ids, setIds] = useState<string[]>(read);
  useEffect(() => { const sync = () => setIds(read()); addEventListener(EVENT, sync); addEventListener('storage', sync); return () => { removeEventListener(EVENT, sync); removeEventListener('storage', sync); }; }, []);
  const toggle = useCallback((id: string) => { const current = read(); const next = current.includes(id) ? current.filter(x => x !== id) : [...current, id]; localStorage.setItem(KEY, JSON.stringify(next)); setIds(next); dispatchEvent(new Event(EVENT)); }, []);
  return { ids, toggle, has: (id: string) => ids.includes(id) };
}
