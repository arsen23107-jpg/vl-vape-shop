import { useCallback, useEffect, useMemo, useState } from 'react';
export type CartItems = Record<string, number>;
const KEY = 'vl:cart'; const EVENT = 'vl:cart-change';
const read = (): CartItems => { try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch { return {}; } };
export function useCart() {
  const [items, setItems] = useState<CartItems>(read);
  useEffect(() => { const sync = () => setItems(read()); addEventListener(EVENT, sync); addEventListener('storage', sync); return () => { removeEventListener(EVENT, sync); removeEventListener('storage', sync); }; }, []);
  const save = useCallback((next: CartItems) => { localStorage.setItem(KEY, JSON.stringify(next)); setItems(next); dispatchEvent(new Event(EVENT)); }, []);
  const add = useCallback((id: string) => { const current = read(); save({ ...current, [id]: (current[id] || 0) + 1 }); }, [save]);
  const setQuantity = useCallback((id: string, quantity: number) => { const current = read(); if (quantity <= 0) { delete current[id]; save({ ...current }); } else save({ ...current, [id]: quantity }); }, [save]);
  const clear = useCallback(() => save({}), [save]);
  const count = useMemo(() => Object.values(items).reduce((sum, quantity) => sum + quantity, 0), [items]);
  return { items, count, add, setQuantity, clear };
}
