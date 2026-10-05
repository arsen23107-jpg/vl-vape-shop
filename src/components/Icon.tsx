const P: Record<string, string> = {
  search: 'M11 4a7 7 0 105 12l4 4M11 4a7 7 0 010 14',
  heart: 'M12 20s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.6-7 10-7 10z',
  user: 'M12 12a4 4 0 100-8 4 4 0 000 8zM4 20c1-4 4-6 8-6s7 2 8 6',
  home: 'M4 11l8-7 8 7v9h-5v-6H9v6H4z',
  grid: 'M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z',
  pin: 'M12 21s7-6 7-11a7 7 0 10-14 0c0 5 7 11 7 11zM12 12a2 2 0 100-4 2 2 0 000 4z',
  x: 'M6 6l12 12M18 6L6 18',
  menu: 'M4 7h16M4 12h16M4 17h16',
  arrow: 'M5 12h14M13 6l6 6-6 6',
  chevron: 'M9 18l6-6-6-6',
  phone: 'M6.6 3.8l2.2-.5 1.7 4-1.6 1.4a15 15 0 006.8 6.8l1.4-1.6 4 1.7-.5 2.2a2 2 0 01-2 1.5C10.4 19 5 13.6 5.1 5.8a2 2 0 011.5-2z',
  cart: 'M4 5h2l2.1 10.1a2 2 0 002 1.6h6.8a2 2 0 001.9-1.4L20 9H8M10 21a1 1 0 100-2 1 1 0 000 2zM17 21a1 1 0 100-2 1 1 0 000 2z',
  vk: 'M4 7.5c0-2.1 1.4-3.5 3.5-3.5h9c2.1 0 3.5 1.4 3.5 3.5v9c0 2.1-1.4 3.5-3.5 3.5h-9C5.4 20 4 18.6 4 16.5zM7 9.5c.1 3.1 1.5 5 3.9 5h.2v-1.8c1.1.1 2 .9 2.3 1.8H15c-.4-1.4-1.4-2.2-2-2.5.6-.4 1.5-1.1 1.7-2.5h-1.5c-.3 1.1-1.1 1.9-2.1 2V9.5h-1.4v3.5c-1.1-.3-1.5-1.8-1.6-3.5z',
};
export default function Icon({ name, size = 22, fill = false }: { name: string; size?: number; fill?: boolean }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill={fill ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={P[name]} /></svg>;
}
