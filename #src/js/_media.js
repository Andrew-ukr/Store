window.addEventListener('DOMContentLoaded', () => {
  try {
    function widthBtn() {
      if (window.innerWidth < 365) {
        let btn = document.querySelector('button.goods__cart-btn').innerText = '';
      } else {
        let btn = document.querySelector('button.goods__cart-btn').innerText = 'Add To Cart';
      }
    }

    function hideFilterBlocks() {
      let filterBlocks = document.querySelector('.store__aside');
      let filterBtn = document.querySelector('button.store__aside-block-hover-btn');
      const productCard = document.querySelectorAll('.product-card');
      const productList = document.querySelector('.store__products-list');

      if (window.innerWidth < 1000) {
        filterBlocks.style.display = 'none';
        filterBtn.style.display = 'block';

      } else {
        filterBlocks.style.display = 'block';
        filterBtn.style.display = 'none';
      }

      filterBtn.addEventListener('click', () => {
        if (filterBlocks.style.display === 'block') {
          filterBlocks.style.display = 'none';
        } else {
          filterBlocks.style.display = 'block';
        }
      });

      if (window.innerWidth < 700) {
        productCard.forEach(value => {
          value.classList.remove('inline');
        });
        productList.classList.remove('inline');

      } 
    }

    widthBtn();
    hideFilterBlocks();

    window.addEventListener('resize', () => {
      widthBtn();
      hideFilterBlocks();
    });
  } catch (error) {

  }
});