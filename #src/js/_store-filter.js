window.addEventListener('DOMContentLoaded', () => {

  const viewBtn = document.querySelectorAll('.store__top-panel-icon');
  const productCard = document.querySelectorAll('.product-card');
  const productList = document.querySelector('.store__products-list');

  viewBtn.forEach(elem => {
    elem.addEventListener('click', () => {
      viewBtn.forEach(item => {
        item.classList.remove('active');
      });
      if (elem.dataset.card) {
        elem.classList.add('active');
        productCard.forEach(value => {
          value.classList.add('inline');
        });
        productList.classList.add('inline');
      } else {
        productCard.forEach(value => {
          value.classList.remove('inline');
        });
        elem.classList.add('active');
        productList.classList.remove('inline');
      }
    });
  });
});