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
      clickable: true,
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

  let relatedSwiper = new Swiper('.related__slider', {
    spaceBetween: 10,
    speed: 500,
    slidesPerView: 1,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      360: {
        slidesPerView: 1.5
      },
      420: {
        slidesPerView: 2
      },
      520: {
        slidesPerView: 2.5
      },
      620: {
        slidesPerView: 3
      },
      720: {
        slidesPerView: 3.5
      },
      820: {
        slidesPerView: 4
      },
    }
  });
  
  let featuredSwiper = new Swiper('.featured-slider', {
    spaceBetween: 10,
    speed: 500,
    slidesPerView: 1,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      450: {
        slidesPerView: 1.2
      },
      550: {
        slidesPerView: 1.5
      },
      650: {
        slidesPerView: 2
      },
      800: {
        slidesPerView: 2.5
      },
      1000: {
        slidesPerView: 3
      },
    }
  });
  
  let newsSwiper = new Swiper('.news-slider', {
    spaceBetween: 10,
    speed: 500,
    slidesPerView: 1,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      450: {
        slidesPerView: 1
      },
      600: {
        slidesPerView: 1.2
      },
      700: {
        slidesPerView: 2
      },
      850: {
        slidesPerView: 2.2
      },
      1050: {
        slidesPerView: 3
      },
    }
  });
});