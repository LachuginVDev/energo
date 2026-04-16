import './work-types.css';
import 'swiper/css';
import { Swiper } from 'swiper';

export function initWorkTypes() {
  const element = document.querySelector('.js-work-types-swiper');
  if (!element) return;

  new Swiper(element, {
    slidesPerView: 1.2,
    spaceBetween: 12,
    speed: 450,
    breakpoints: {
      769: {
        slidesPerView: 6,
        spaceBetween: 14,
        allowTouchMove: false,
      },
      1201: {
        slidesPerView: 6,
        spaceBetween: 14,
        allowTouchMove: false,
      },
    },
  });
}

initWorkTypes();

