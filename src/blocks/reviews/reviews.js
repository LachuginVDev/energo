import './reviews.css';
import { Swiper } from 'swiper';

export function initReviews() {
  const element = document.querySelector('.js-reviews-swiper');
  if (!element) return;

  new Swiper(element, {
    slidesPerView: 1.08,
    spaceBetween: 14,
    speed: 450,
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 16,
      },
      1200: {
        slidesPerView: 4,
        spaceBetween: 18,
        allowTouchMove: false,
      },
    },
  });
}

initReviews();

