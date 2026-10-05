import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import Icon from './Icon';
import logo from '../assets/brand/vl-logo.png';
import { stores } from '../data/stores';
import { useFavorites } from '../hooks/useFavorites';
import { useCart } from '../hooks/useCart';
import { morphClass, useSoftMorph } from '../motion/softMorph';

const links = [['/catalog', 'Каталог'], ['/#stores', 'Магазины'], ['/about', 'О ПАР ЛАУНЖ']] as const;

export default function Header({ onSearch, onAuth }: { onSearch: () => void; onAuth: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const menu = useSoftMorph();
  const cityOpen = useSoftMorph();
  const phonesOpen = useSoftMorph();
  const phoneSheet = useSoftMorph();
  const [allPhones, setAllPhones] = useState(false);
  const [city, setCity] = useState('Барнаул');
  const phoneRef = useRef<HTMLDivElement>(null);
  const phoneCloseTimer = useRef<number | null>(null);
  const menuCloseTimer = useRef<number | null>(null);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { ids: favoriteIds } = useFavorites();
  const { count: cartCount } = useCart();

  useEffect(() => {
    const update = () => setScrolled(scrollY > 24);
    update(); addEventListener('scroll', update, { passive: true });
    return () => removeEventListener('scroll', update);
  }, []);
  useEffect(() => {
    const close = (event: MouseEvent) => { if (!phoneRef.current?.contains(event.target as Node)) phonesOpen.close(); };
    addEventListener('click', close); return () => removeEventListener('click', close);
  }, [phonesOpen.close]);

  const cityStores = stores.filter(store => store.city === city);
  const visiblePhones = allPhones ? cityStores : cityStores.slice(0, 4);
  const closeMenu = () => menu.close();
  const openPhones = () => {
    if (phoneCloseTimer.current) window.clearTimeout(phoneCloseTimer.current);
    phonesOpen.open();
  };
  const schedulePhonesClose = () => {
    phoneCloseTimer.current = window.setTimeout(() => phonesOpen.close(), 240);
  };
  const goBack = () => {
    if (window.history.length > 1) navigate(-1);
    else navigate('/');
  };
  const openMenu = () => {
    if (menuCloseTimer.current) window.clearTimeout(menuCloseTimer.current);
    menu.open();
  };
  const scheduleMenuClose = () => {
    menuCloseTimer.current = window.setTimeout(() => menu.close(), 240);
  };
  const openMenuOnHover = () => {
    if (window.matchMedia('(hover: hover)').matches) openMenu();
  };
  const closeMenuOnHover = () => {
    if (window.matchMedia('(hover: hover)').matches) scheduleMenuClose();
  };

  return <>
    <header className={'header' + (scrolled ? ' header--scrolled' : '') + (menu.present ? ' header--menu' : '')}>
      <div className="container header__in">
        <div className="header__menu-wrap">
          {pathname !== '/' && <button className="header__back iconbtn" aria-label="Назад" onClick={goBack}><Icon name="arrow" /></button>}
          <button className="header__menu iconbtn" aria-label={menu.present ? 'Закрыть меню' : 'Открыть меню'} aria-expanded={menu.present} onMouseEnter={openMenuOnHover} onMouseLeave={closeMenuOnHover} onClick={menu.toggle}><Icon name={menu.present ? 'x' : 'menu'} /></button>
          {menu.present && <div ref={menu.ref} className={'header__side-menu ' + morphClass(menu.phase)} style={menu.style} aria-hidden={!menu.present} onMouseEnter={openMenuOnHover} onMouseLeave={closeMenuOnHover}>
            <nav className="container" aria-label="Меню сайта">
              {links.map(([to, label]) => <NavLink key={to} to={to} onClick={closeMenu}>{label}<Icon name="arrow" /></NavLink>)}
              <a href="https://t.me/Vapor_Launge" target="_blank" rel="noreferrer">Мы в Telegram<Icon name="arrow" /></a>
              <div className="header__menu-bottom"><button onClick={() => { closeMenu(); onAuth(); }}>Личный кабинет</button></div>
            </nav>
          </div>}
        </div>
        <Link to="/" className="brand-logo" aria-label="VL — на главную"><img src={logo} alt="VL" /></Link>
        <div className="header__desktop-search">
          <button className="header__city" onClick={cityOpen.toggle}>{city} <Icon name="chevron" size={13} /></button>
          {cityOpen.present && <div ref={cityOpen.ref} className={'header__city-menu ' + morphClass(cityOpen.phase)} style={cityOpen.style}><button onClick={() => { setCity('Барнаул'); cityOpen.close(); }}>Барнаул</button></div>}
          <button className="header__search-field" onClick={onSearch}>Поиск по каталогу <Icon name="search" size={19} /></button>
        </div>
        <div className="header__act">
          <div className="header__phones" ref={phoneRef} onMouseEnter={openPhones} onMouseLeave={schedulePhonesClose}>
            <button className="header__phone" onClick={phonesOpen.toggle}><Icon name="phone" size={15} /> Телефоны магазинов <Icon name="chevron" size={12} /></button>
            {phonesOpen.present && <div ref={phonesOpen.ref} className={'header__phone-menu ' + morphClass(phonesOpen.phase)} style={phonesOpen.style}>{visiblePhones.filter((store) => store.phone).map(store => <a key={store.id} href={'tel:' + store.phone!.replace(/[^+\d]/g, '')}><b>{store.phone}</b><span>{store.address}</span></a>)}{cityStores.length > 4 && <button onClick={() => setAllPhones(value => !value)}>{allPhones ? 'Свернуть' : 'Развернуть все'}</button>}</div>}
          </div>
          <button className="header__login" onClick={onAuth}><Icon name="user" size={18} /><span>Войти</span></button>
          <Link className="iconbtn header__fav icon-with-count" aria-label="Избранное" to="/favorites"><Icon name="heart" />{favoriteIds.length > 0 && <b>{favoriteIds.length}</b>}</Link>
          <Link className="iconbtn icon-with-count" aria-label="Корзина" to="/cart"><Icon name="cart" />{cartCount > 0 && <b>{cartCount}</b>}</Link>
        </div>
        <div className="header__mobile-actions" aria-label="Быстрые действия">
          <button className="iconbtn" aria-label="Телефоны магазинов" onClick={phoneSheet.open}><Icon name="phone" /></button>
          <button className="iconbtn" aria-label="Поиск" onClick={onSearch}><Icon name="search" /></button>
          <button className="iconbtn" aria-label="Личный кабинет" onClick={onAuth}><Icon name="user" /></button>
        </div>
      </div>
    </header>
    {phoneSheet.present && <section ref={phoneSheet.ref} className={'phone-sheet ' + morphClass(phoneSheet.phase)} style={phoneSheet.style} role="dialog" aria-modal="true" aria-label="Телефоны магазинов">
      <div className="phone-sheet__head"><h2>Телефоны</h2><button className="iconbtn" onClick={phoneSheet.close} aria-label="Закрыть"><Icon name="x" size={30} /></button></div>
      <div className="phone-sheet__list">{stores.filter((store) => store.phone).map(store => <a key={store.id} href={'tel:' + store.phone!.replace(/[^+\d]/g, '')}><b>{store.phone}</b><span>{store.address}</span></a>)}</div>
    </section>}
  </>;
}
