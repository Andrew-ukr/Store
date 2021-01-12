window.addEventListener('DOMContentLoaded', () => {
  const storeCenter = document.querySelector('.store__center');
  const viewBtn = document.querySelectorAll('.store__top-panel-icon');
  try {
    const productCard = storeCenter.querySelectorAll('.product-card');
  } catch (error) {}

  const productList = document.querySelector('.store__products-list');
  const productFilterList = document.querySelector('.store__aside-block-list');
  const colorFilterList = document.querySelector('[data-filter-color="color-area"]');
  const showNumberSelect = document.querySelector('select.store__top-panel-show');
  let filterItems = ['all'];
  let filterColor = ['all'];
  let showNumber = 12;
  let minPrice = document.querySelector('input.store__aside-input-left');
  let maxPrice = document.querySelector('input.store__aside-input-right');
  let rangeMaxPrice = 0;
  let rangeMinPrice = 999999999;
  let priceRange = document.querySelectorAll('input[type="range"]');
  let filteredCount = 0;

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

  function initPriceRange() {
    priceRange.forEach(elem => {
      elem.setAttribute('max', rangeMaxPrice);
      elem.setAttribute('min', rangeMinPrice);
    });

    minPrice.setAttribute('value', rangeMinPrice);
    maxPrice.setAttribute('value', rangeMaxPrice);
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
        let prodCardPrice = productCardItem.querySelector('[data-cart="price"]').textContent.replace(/\D/, '');

        if (rangeMaxPrice < +prodCardPrice) {
          rangeMaxPrice = prodCardPrice;
        }

        if (rangeMinPrice > +prodCardPrice) {
          rangeMinPrice = prodCardPrice;
        }

        initPriceRange();

        if (productCardItem.classList.contains(elem) &&
          (+prodCardPrice >= +minPrice.value) &&
          (+prodCardPrice <= +maxPrice.value)) {
          productCardItem.classList.add('user-filter');
        }

        productCardItem.classList.add(productCardItem.querySelector('.product-card__color-item.active').getAttribute("title"));
      });
    });

    let productCardItemUserFilter = document.querySelectorAll('.user-filter');

    productCardItemUserFilter.forEach(productCardItem => {
      productCardItem.classList.remove('user-filter');
    });

    filterColor.forEach(elem => {
      productCardItemUserFilter.forEach(productCardItem => {
        if (productCardItem.classList.contains(elem)) {
          productCardItem.classList.add('user-filter');
        }
      });
    });

    productCardItemUserFilter = document.querySelectorAll('.user-filter');
    filteredCount = 0;
    productCardItemUserFilter.forEach((item, i) => {
      if (i + 1 <= showNumber) {
        item.classList.add('active');
      }
      filteredCount++;
    });

    setFilteredCount();
  }

  function setFilteredCount() {
    let filteredCountArea = document.querySelector('span.store__top-panel-text');
    filteredCountArea.innerText = `${filteredCount} items`;
  }

  function clickAction() {
    let checkClick = true;
    productFilterList.addEventListener('click', (e) => {
      if (e.target && e.target.classList.contains('store__aside-block-list-item')) {
        let currentFilterItem = e.target.firstChild.textContent.toLowerCase();
        checkClick = true;
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

    colorFilterList.addEventListener('click', (e) => {
      if (e.target && e.target.classList.contains('store__aside-block-list-item')) {
        let currentFilterItem = e.target.dataset.filterColor;
        checkClick = true;

        filterColor.forEach(item => {
          if (item === currentFilterItem) {
            checkClick = false;
          }
        });

        if (checkClick) {
          filterColor.forEach((elem, i) => {
            if (elem === 'all') {
              filterColor.splice(i, 1);
            }
          });

          filterColor.push(currentFilterItem);
          console.log(filterColor);
          hideAllProd();
          showFilteredProd();
        }

        if (!checkClick) {
          filterColor.forEach((elem, i) => {
            if (elem === currentFilterItem) {
              filterColor.splice(i, 1);
            }
          });
          console.log(filterColor);

          if (filterColor.length === 0) {
            filterColor[0] = 'all';
          }
          hideAllProd();
          showFilteredProd();
        }

        e.target.firstChild.classList.toggle('active');
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

  function getFilterPrice() {
    priceRange = document.querySelectorAll('input[type="range"]');

    priceRange.forEach(elem => {
      elem.addEventListener('change', () => {
        minPrice = document.querySelector('input.store__aside-input-left');
        maxPrice = document.querySelector('input.store__aside-input-right');
        console.log(minPrice, maxPrice);
        hideAllProd();
        showFilteredProd();
      });
    });
  }

  try {
    showCardInline();
    hideAllProd();
    showFilteredProd();
    clickAction();
    getNumberValue();
    getFilterPrice();
  } catch (error) {

  }
});