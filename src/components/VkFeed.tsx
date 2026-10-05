import Icon from './Icon';
import elfbar from '../assets/telegram/elfbar-post.png';
import lostMary from '../assets/telegram/lost-mary-post.png';
import rickMorty from '../assets/telegram/rick-morty-post.png';
import pasito from '../assets/telegram/pasito-post.png';

const posts = [
  { date: '5 октября 2026', text: 'НОВИНКА 🚀\nELFBAR💓\nЦЕНА: 1800р', image: elfbar, href: 'https://t.me/Vapor_Launge/6120' },
  { date: '5 октября 2026', text: 'НОВИНКА 💎\nLOST MARY\nЦЕНА: 1900р', image: lostMary, href: 'https://t.me/Vapor_Launge/6118' },
  { date: '4 октября 2026', text: 'НОВИНКА ⚡️\nРик и Морти в ассортименте🔝\nЦЕНА: 600р', image: rickMorty, href: 'https://t.me/Vapor_Launge/6116' },
  { date: '4 октября 2026', text: 'НОВОЕ ПОСТУПЛЕНИЕ⚡️\nPASITO III🚨👈\nЦЕНА: 3600р', image: pasito, href: 'https://t.me/Vapor_Launge/6115' },
];

export default function VkFeed() {
  return <section className="container vk-feed" data-reveal><div className="section-heading"><div><p className="section-label">ПАР ЛАУНЖ</p><h2>Мы в Telegram</h2></div><a className="text-action" href="https://t.me/Vapor_Launge" target="_blank" rel="noreferrer">Открыть Telegram <Icon name="arrow" size={17} /></a></div><div className="telegram-posts">{posts.map(post => <a key={post.href} className="telegram-post" href={post.href} target="_blank" rel="noreferrer"><span className="telegram-post__meta">✈ Telegram · {post.date}</span><p>{post.text}</p><img src={post.image} alt="" loading="lazy" /></a>)}</div></section>;
}
