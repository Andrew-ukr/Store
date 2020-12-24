window.addEventListener('DOMContentLoaded', ()=>{
  var mySwiper = new Swiper('.swiper-container', {
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    speed: 1000,
    loop: true,
    autoplay: {
      delay: 5000,
    },
    // effect: 'fade',
    // fadeEffect: {
    //   crossFade: true
    // },
  });
});