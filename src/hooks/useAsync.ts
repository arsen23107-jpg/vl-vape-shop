import { useEffect, useState } from 'react';
export function useAsync<T>(fn: () => Promise<T>, deps: unknown[] = []) {
  const [data, setData] = useState<T | null>(null);
  useEffect(() => { let ok = true; setData(null); fn().then(d => ok && setData(d)); return () => { ok = false; }; }, deps); // eslint-disable-line
  return { data, loading: data === null };
}
