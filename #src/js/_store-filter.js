window.addEventListener('DOMContentLoaded', () => {

  const viewBtn = document.querySelectorAll('.store__top-panel-icon');
  const productCard = document.querySelectorAll('.product-card');
  const productList = document.querySelector('.store__products-list');
  const productFilterItem = document.querySelectorAll('.store__aside-block-list-item');
  let filterItems = [];

  function showCardInline() {
    viewBtn.forEach(elem => {
      elem.addEventListener('click', () => {
        viewBtn.forEach(item => {
          item.classList.remove('active');
        });
        if (elem.dataset.card) {
          productCard.forEach(value => {
            value.classList.add('inline');
          });
          productList.classList.add('inline');
        } else {
          productCard.forEach(value => {
            value.classList.remove('inline');
          });
          productList.classList.remove('inline');
        }
        elem.classList.add('active');
      });
    });
  }

  function showCheckedElem() {
    productFilterItem.forEach(elem => {
      elem.addEventListener('click', () => {
        filterItems.push(`${elem.firstChild.textContent.toLowerCase()}`);
        elem.classList.add('checked');

        filterItems.forEach((item, i) => {
          productCard.forEach(unit => {
            if (i < 1) {
              unit.classList.remove('active');
            }
            if (unit.classList.contains(item)) {
              unit.classList.add('active', 'user-filter');
            }
          });
        });
      });
    });







  }










  try {
    showCardInline();
    showCheckedElem();
  } catch (error) {

  }
});