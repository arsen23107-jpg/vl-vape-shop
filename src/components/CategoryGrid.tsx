import { Link } from 'react-router-dom';
import Icon from './Icon';
import vape from '../assets/popular/vape.jpg';
import disposable from '../assets/popular/disposable.jpg';
import liquids from '../assets/popular/liquids.jpg';

const cards = [
  { title: 'Вейп', kind: 'pod', image: vape },
  { title: 'Одноразовые устройства', kind: 'disposable', image: disposable },
  { title: 'Жидкости', kind: 'liquids', image: liquids },
];

export default function CategoryGrid() {
  return <section className="container popular" data-reveal><div className="section-heading"><div><p className="section-label">Каталог VL</p><h2>Популярно у нас</h2></div><Link to="/catalog" className="text-action">Весь каталог <Icon name="arrow" size={17} /></Link></div><div className="popular__grid">{cards.map(card => <Link key={card.kind} to={`/catalog?category=${card.kind}`} className="popular__card"><img src={card.image} alt="" loading="lazy" width={560} height={746} /><span>{card.title}</span><Icon name="arrow" size={16} /></Link>)}</div></section>;
}
