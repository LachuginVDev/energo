import './hero.css';
import logoSrc from '../../assets/images/ПЭСК.svg';

export function initHero() {
  const logoImg = document.querySelector('[data-hero-logo-img]');
  if (logoImg instanceof HTMLImageElement) {
    logoImg.src = logoSrc;
  }
}

initHero();

