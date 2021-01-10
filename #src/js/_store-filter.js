window.addEventListener('DOMContentLoaded', () => {

  const viewBtn = document.querySelectorAll('.store__top-panel-icon');
  const productCard = document.querySelectorAll('.product-card');
  const productList = document.querySelector('.store__products-list');
  const productFilterList = document.querySelector('.store__aside-block-list');
  const showNumberSelect = document.querySelector('select.store__top-panel-show');
  let filterItems = ['all'];
  let showNumber = 12;

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

  function hideAllProd() {
    productCard.forEach(elem => {
      elem.classList.remove('active');
      elem.classList.remove('user-filter');
    });
  }

  function showFilteredProd() {
    filterItems.forEach(elem => {
      productCard.forEach(productCardItem => {
        if (productCardItem.classList.contains(elem)) {
          productCardItem.classList.add('user-filter');
        }
      });
    });
    let productCardItemUserFilter = document.querySelectorAll('.user-filter');
    productCardItemUserFilter.forEach((item, i) => {
      if (i + 1 <= showNumber) {
        item.classList.add('active');
      }
    });
  }

  function clickAction() {
    productFilterList.addEventListener('click', (e) => {
      if (e.target && e.target.classList.contains('store__aside-block-list-item')) {
        let currentFilterItem = e.target.firstChild.textContent.toLowerCase();
        let checkClick = true;

        filterItems.forEach(item => {
          if (item === currentFilterItem) {
            checkClick = false;
          }
        });

        if (checkClick) {
          filterItems.forEach((elem, i) => {
            if (elem === 'all') {
              filterItems.splice(i, 1);
            }
          });

          filterItems.push(currentFilterItem);
          console.log(filterItems);
          hideAllProd();
          showFilteredProd();
        }

        if (!checkClick) {
          filterItems.forEach((elem, i) => {
            if (elem === currentFilterItem) {
              filterItems.splice(i, 1);
            }
          });
          console.log(filterItems);

          if (filterItems.length === 0) {
            filterItems[0] = 'all';
          }
          hideAllProd();
          showFilteredProd();
        }

        e.target.classList.toggle('checked');
        e.target.firstElementChild.classList.toggle('checked');
      }
    });
  }

  function getNumberValue() {
    showNumberSelect.addEventListener('change', () => {
      showNumber = showNumberSelect.value;
      hideAllProd();
      showFilteredProd();
    });
  }

  

















  try {
    showCardInline();
    hideAllProd();
    showFilteredProd();
    clickAction();
    getNumberValue();
  } catch (error) {

  }
});