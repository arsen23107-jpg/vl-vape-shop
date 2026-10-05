import { Link } from 'react-router-dom';
import CategoryGrid from '../components/CategoryGrid';
import StorePreview from '../components/StorePreview';
import PromoBanners from '../components/PromoBanners';
import VkFeed from '../components/VkFeed';
import { useReveal } from '../hooks/useReveal';
import wideStore from '../assets/optimized/about/vl-store-wide.jpg';
import mobileStore from '../assets/optimized/about/vl-store-mobile.jpg';
export default function Home() {
  useReveal();
  return <><PromoBanners /><CategoryGrid /><VkFeed /><section className="container story story--about" data-reveal><Link to="/about" className="story__visual"><picture><source media="(max-width: 820px)" srcSet={mobileStore} /><img src={wideStore} alt="Интерьер ПАР ЛАУНЖ" /></picture><span>Кто мы <b>→</b></span></Link></section><div id="stores"><StorePreview /></div></>;
}
