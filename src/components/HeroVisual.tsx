import desktopHero from '../assets/hero/desktop-hero.png';
import mobileHero from '../assets/hero/mobile-hero.png';
export default function HeroVisual() {
  return (
    <div className="hero-visual" aria-hidden="true">
      <picture>
        <source media="(max-width: 820px)" srcSet={mobileHero} />
        <img className="hv__img" src={desktopHero} alt="" width={1672} height={941} fetchPriority="high" />
      </picture>
    </div>
  );
}
