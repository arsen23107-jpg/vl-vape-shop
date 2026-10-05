import { Link } from 'react-router-dom';
import logo from '../assets/brand/vl-logo.png';
export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand"><Link to="/" className="brand-logo" aria-label="VL — на главную"><img src={logo} alt="VL" /></Link><p>Сеть вейпшопов в Барнауле.</p></div>
        <div><h4>Навигация</h4><Link to="/catalog">Каталог</Link><Link to="/stores">Магазины</Link><Link to="/about">Кто мы?</Link><Link to="/favorites">Избранное</Link></div>
        <div><h4>Связь</h4><a href="https://t.me/Vapor_Launge" target="_blank" rel="noreferrer">Telegram</a><a href="https://t.me/Vapor_Launge_bot" target="_blank" rel="noreferrer">Каталог в Telegram</a><Link to="/#stores">Адреса магазинов</Link></div>
      </div>
      <div className="container footer__legal"><b>18+</b><p>Информация на сайте предназначена только для совершеннолетних.</p></div>
    </footer>
  );
}
