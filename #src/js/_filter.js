window.addEventListener("DOMContentLoaded", () => {
  const productsTabsItem = document.querySelectorAll('.products__tabs-item');
  const productCard = document.querySelectorAll('.product-card');

  function init() {
    let currentDataFilter;
    productsTabsItem.forEach(item => {
      item.addEventListener('click', (e) => {
        productsTabsItem.forEach(elem => {
          elem.classList.remove('active');
        });

        e.target.classList.add('active');

        currentDataFilter = e.target.getAttribute('data-filter');

        productCard.forEach(elem => {
          if (elem.classList.contains(`${currentDataFilter}`)) {
            elem.style.display = 'block';
          } else {
            elem.style.display = 'none';
          }
        });
      });
    });
  }

  init();
});