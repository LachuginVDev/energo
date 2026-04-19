import './trusted.css';
import 'swiper/css';
import { Swiper } from 'swiper';

export function initTrusted() {
  const grid = document.querySelector('.trusted__grid');
  if (!grid) return;

  const mobileQuery = window.matchMedia('(max-width: 767px)');
  let swiperInstance = null;
  let wrapper = null;

  const enableMobileSlider = () => {
    if (swiperInstance) return;

    grid.classList.add('swiper', 'is-swiper');

    wrapper = document.createElement('div');
    wrapper.className = 'swiper-wrapper';

    const items = Array.from(grid.querySelectorAll('.trusted__item'));
    items.forEach((item) => {
      item.classList.add('swiper-slide');
      wrapper.appendChild(item);
    });

    grid.appendChild(wrapper);

    swiperInstance = new Swiper(grid, {
      slidesPerView: 2,
      spaceBetween: 12,
      speed: 450,
    });
  };

  const disableMobileSlider = () => {
    if (!swiperInstance) return;

    swiperInstance.destroy(true, true);
    swiperInstance = null;

    if (wrapper) {
      const slides = Array.from(wrapper.children);
      slides.forEach((slide) => {
        slide.classList.remove('swiper-slide');
        grid.appendChild(slide);
      });
      wrapper.remove();
      wrapper = null;
    }

    grid.classList.remove('swiper', 'is-swiper');
  };

  const syncTrustedMode = () => {
    if (mobileQuery.matches) {
      enableMobileSlider();
    } else {
      disableMobileSlider();
    }
  };

  syncTrustedMode();
  mobileQuery.addEventListener('change', syncTrustedMode);
}

initTrusted();
