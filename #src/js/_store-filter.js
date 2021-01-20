window.addEventListener('DOMContentLoaded', () => {
  const storeCenter = document.querySelector('.store__center');
  const viewBtn = document.querySelectorAll('.store__top-panel-icon');
  const productList = document.querySelector('.store__products-list');
  const productFilterList = document.querySelector('.store__aside-block-list');
  const colorFilterList = document.querySelector('[data-filter-color="color-area"]');
  const selectWrapper = document.querySelectorAll('.select-wrapper');
  const selectDropdownAll = document.querySelectorAll('.select__dropdown');
  let filterItems = ['all'];
  let filterColor = ['all'];
  let showNumber = 12;
  let minPrice = document.querySelector('input.store__aside-input-left');
  let maxPrice = document.querySelector('input.store__aside-input-right');
  let rangeMaxPrice = 0;
  let rangeMinPrice = 999999999;
  let priceRange = document.querySelectorAll('input[type="range"]');
  let filteredCount = 0;
  let activeFilteredCount = 0;
  let moreBtnCounter = 2;
  const moreBtn = document.querySelector('.store__more-btn');


  function showCardInline() {
    const productCard = storeCenter.querySelectorAll('.product-card');

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
    const productCard = storeCenter.querySelectorAll('.product-card');
    productCard.forEach(elem => {
      elem.classList.remove('active');
      elem.classList.remove('user-filter');
    });
  }

  function showFilteredProd(a = showNumber) {
    const productCard = storeCenter.querySelectorAll('.product-card');

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
    activeFilteredCount = 0;
    productCardItemUserFilter.forEach((item, i) => {
      if (i + 1 <= a) {
        item.classList.add('active');
        activeFilteredCount++;
      }
      filteredCount++;
    });

    let noProduct = document.querySelector('.cart-no-product');
    if (noProduct) {
      noProduct.remove();
    }

    if (filteredCount === 0) {
      let noProductView = document.createElement('div');
      noProductView.classList.add('cart-no-product');
      noProductView.innerText = 'No products';
      storeCenter.append(noProductView);
    }
    if (filteredCount > activeFilteredCount) {
      moreBtn.style.display = 'block';
    } else {
      moreBtn.style.display = 'none';
    }

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
          hideAllProd();
          showFilteredProd();
        }

        if (!checkClick) {
          filterItems.forEach((elem, i) => {
            if (elem === currentFilterItem) {
              filterItems.splice(i, 1);
            }
          });

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
          hideAllProd();
          showFilteredProd();
        }

        if (!checkClick) {
          filterColor.forEach((elem, i) => {
            if (elem === currentFilterItem) {
              filterColor.splice(i, 1);
            }
          });

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

  function getFilterPrice() {
    priceRange = document.querySelectorAll('input[type="range"]');

    priceRange.forEach(elem => {
      elem.addEventListener('change', () => {
        minPrice = document.querySelector('input.store__aside-input-left');
        maxPrice = document.querySelector('input.store__aside-input-right');
        hideAllProd();
        showFilteredProd();
      });
    });
  }

  function initProdNumber() {
    const productCard = storeCenter.querySelectorAll('.product-card');

    let ListItem = document.querySelectorAll('[data-list="item"]');
    ListItem.forEach(elem => {
      let counter = 0;
      productCard.forEach(item => {
        if (item.classList.contains(elem.firstChild.textContent.toLowerCase())) {
          counter++;
        }
      });
      elem.lastElementChild.innerText = `${counter}`;
    });
  }

  selectWrapper.forEach(elem => {

    let selectDropdown = elem.querySelector('.select__dropdown');
    let select = elem.querySelector('.select');

    elem.addEventListener('click', (e) => {
      moreBtnCounter = 2;

      e.stopPropagation();

      if (e.target && select) {
        if (selectDropdown.classList.contains('select__dropdown-active')) {
          selectDropdownAll.forEach(elem => {
            elem.classList.remove('select__dropdown-active');
          });
          selectDropdown.classList.remove('select__dropdown-active');
        } else {
          selectDropdownAll.forEach(elem => {
            elem.classList.remove('select__dropdown-active');
          });
          selectDropdown.classList.add('select__dropdown-active');
        }
      }

      if (e.target && e.target.classList.contains('select__dropdown-item')) {
        if (e.target.dataset.selectOption) {
          select.innerText = `${e.target.dataset.selectOption}`;
        } else {
          select.innerText = `${e.target.innerText}`;
        }
        selectDropdown.classList.remove('select__dropdown-active');
        if (e.target.dataset.selectView) {
          showNumber = `${e.target.dataset.selectView}`;
        }
        hideAllProd();
        showFilteredProd();
      }
    });
  });

  window.addEventListener('click', (e) => {
    if (e.target !== selectWrapper) {
      selectDropdownAll.forEach(elem => {
        elem.classList.remove('select__dropdown-active');
      });
    }
  });


  function launchMoreBtn() {
    let newShowNumber;
    moreBtn.addEventListener('click', () => {
      newShowNumber = showNumber * moreBtnCounter;
      moreBtnCounter++;
      hideAllProd();
      showFilteredProd(newShowNumber);
    });
  }

  try {
    showCardInline();
    hideAllProd();
    showFilteredProd();
    clickAction();
    getFilterPrice();
    initProdNumber();
    launchMoreBtn();
  } catch (error) {

  }
});