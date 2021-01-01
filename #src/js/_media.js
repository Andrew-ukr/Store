window.addEventListener('DOMContentLoaded', () => {
  function widthBtn() {
    if (window.innerWidth < 365) {
      let btn = document.querySelector('button.goods__cart-btn').innerText = '';
    } else {
      let btn = document.querySelector('button.goods__cart-btn').innerText = 'Add To Cart';
    }
  }
  widthBtn();
  window.addEventListener('resize', () => {
    widthBtn();
  });

});