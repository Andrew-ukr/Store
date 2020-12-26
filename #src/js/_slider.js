window.addEventListener('DOMContentLoaded', () => {
  let mySwiper = new Swiper('.carousel-container', {
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    speed: 1000,
    loop: true,
    autoplay: {
      delay: 5000,
    },
  });

  let goodsSwiper = new Swiper('.goods-aside__slider', {
    speed: 500,
    loop: true,

    autoplay: {
      delay: 3000,
    },

    pagination: {
      el: '.swiper-pagination',
    },
  });

  let goodsDownHeadSwiper = new Swiper('.goods__down-slider-container', {
    spaceBetween: 10,
    slidesPerView: 4,
    speed: 500,
    freeMode: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
  });

  let goodsHeadSwiper = new Swiper('.goods__slider-container', {
    speed: 500,
    thumbs: {
      swiper: goodsDownHeadSwiper
    }
  });

});