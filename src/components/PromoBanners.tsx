import telegramBanner from '../assets/optimized/banners/vl-telegram-banner.jpg';

export default function PromoBanners() {
  return <section className="promos" aria-label="Telegram ПАР ЛАУНЖ"><a className="promo soft-morph-content" href="https://t.me/Vapor_Launge" target="_blank" rel="noreferrer" aria-label="Telegram ПАР ЛАУНЖ"><img src={telegramBanner} alt="Telegram ПАР ЛАУНЖ" /></a></section>;
}
