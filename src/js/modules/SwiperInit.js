import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

Swiper.use([Navigation, Pagination]);

class InitSliders {
  constructor() {
    this.sliders = [];
    this.tariffsSliderInstance = null;

    this.initializeAllSliders();
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  createSwiperInstance(sliderSelector, params) {
    const sliderElement = document.querySelector(sliderSelector);

    if (!sliderElement) return null;

    return new Swiper(sliderElement, {
      slidesPerView: params.slidesPerView || 1,
      slidesPerGroup: params.slidesPerGroup || 1,
      spaceBetween: params.spaceBetween || 0,
      loop: params.loop || false,
      pagination: {
        el: params.paginationEl,
        clickable: true,
      },
      navigation: {
        nextEl: params.nextEl,
        prevEl: params.prevEl,
      },
      autoHeight: params.autoHeight || false,
      ...params.settings,
    });
  }

  initializeAllSliders() {
    this.createSwiperInstance('.js-features-slider-desktop-init', {
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 24,
      loop: true,
      nextEl: '.js-swiper-button-next-1',
      prevEl: '.js-swiper-button-prev-1',
    });

    this.createSwiperInstance('.js-features-slider-mobile-init', {
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 24,
      loop: true,
      paginationEl: '.js-swiper-pagination-features',
    });

    this.handleResponsiveSliders();
  }

  handleResponsiveSliders() {
    const isMobile = window.innerWidth < 992;

    if (isMobile) {
      if (!this.tariffsSliderInstance) {
        this.tariffsSliderInstance = this.createSwiperInstance('.js-tariffs-slider-mobile-init', {
          loop: false,
          paginationEl: '.js-swiper-pagination-tariffs',
          settings: {
            slidesPerView: 'auto',
            spaceBetween: 60,
          },
        });
      }
    } else {
      if (this.tariffsSliderInstance) {
        this.tariffsSliderInstance.destroy(true, true);
        this.tariffsSliderInstance = null;
      }
    }
  }

  handleResize() {
    this.handleResponsiveSliders();
  }
}

export default InitSliders;