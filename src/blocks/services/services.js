import './services.css';
import 'swiper/css';
import { Swiper } from 'swiper';

export function initServices() {
  const cards = document.querySelector('.services__cards');
  if (!cards) return;

  const sliderQuery = window.matchMedia('(max-width: 1199px)');
  let swiperInstance = null;
  let wrapper = null;

  const enableSlider = () => {
    if (swiperInstance) return;

    cards.classList.add('swiper', 'is-swiper');

    wrapper = document.createElement('div');
    wrapper.className = 'swiper-wrapper';

    const items = Array.from(cards.querySelectorAll('.service-card'));
    items.forEach((item) => {
      item.classList.add('swiper-slide');
      wrapper.appendChild(item);
    });

    cards.appendChild(wrapper);

    swiperInstance = new Swiper(cards, {
      slidesPerView: 1.08,
      spaceBetween: 14,
      speed: 450,
      breakpoints: {
        768: {
          slidesPerView: 2,
          spaceBetween: 18,
        },
      },
    });
  };

  const disableSlider = () => {
    if (!swiperInstance) return;

    swiperInstance.destroy(true, true);
    swiperInstance = null;

    if (wrapper) {
      const slides = Array.from(wrapper.children);
      slides.forEach((slide) => {
        slide.classList.remove('swiper-slide');
        cards.appendChild(slide);
      });
      wrapper.remove();
      wrapper = null;
    }

    cards.classList.remove('swiper', 'is-swiper');
  };

  const syncServicesMode = () => {
    if (sliderQuery.matches) {
      enableSlider();
    } else {
      disableSlider();
    }
  };

  syncServicesMode();
  sliderQuery.addEventListener('change', syncServicesMode);
}

initServices();

