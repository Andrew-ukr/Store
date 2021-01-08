window.addEventListener("DOMContentLoaded", () => {
  const productsTabsItem = document.querySelectorAll('.products__tabs-item');
  const productCard = document.querySelectorAll('.product-card');
  const moreCardBtn = document.querySelector('button.more-btn');
  const moreCardBtnMob = document.querySelector('div.more-btn');
  let currentVisibleCardsCounter = 0;
  let totalCardsCounter = 0;
  let cardsIndex = 8;
  let currentDataFilter = 'all';
  let innerWidth = window.innerWidth;

  function init() {

    productsTabsItem.forEach(item => {
      item.addEventListener('click', (e) => {
        currentVisibleCardsCounter = 0;
        totalCardsCounter = 0;
        productsTabsItem.forEach(elem => {
          elem.classList.remove('active');
        });
        e.target.classList.add('active');
        currentDataFilter = e.target.getAttribute('data-filter');

        showActiveBlocks();

        checkVisibleBlocks();
        hideBlocks();
      });
    });
  }

  function showActiveBlocks() {
    productCard.forEach(elem => {
      if (elem.classList.contains(`${currentDataFilter}`)) {
        elem.classList.add('active');
      } else {
        elem.classList.remove('active');
      }
    });
  }

  function checkVisibleBlocks() {
    productCard.forEach(elem => {
      if (elem.classList.contains('active')) {
        currentVisibleCardsCounter += 1;
      }
      totalCardsCounter += 1;
    });
  }

  function hideBlocks() {
    try {
      const productCardActive = document.querySelectorAll('.product-card.active');

      if (cardsIndex < currentVisibleCardsCounter) {
        if (innerWidth > 550) {
          moreCardBtn.style.display = 'block';
        } else {
          moreCardBtnMob.style.display = 'flex';
        }

        productCardActive.forEach((item, i) => {
          if (i + 1 > cardsIndex) {
            item.classList.remove('active');
          }
        });
      } else {
        moreCardBtn.style.display = 'none';
        moreCardBtnMob.style.display = 'none';
      }
    } catch (error) {

    }
  }

  try {
    moreCardBtn.addEventListener('click', () => {
      moreCardBtnMob.style.display = 'none';
      moreCardBtn.style.display = 'none';
      showActiveBlocks();
    });
    
    moreCardBtnMob.addEventListener('click', () => {
      moreCardBtn.style.display = 'none';
      moreCardBtnMob.style.display = 'none';
      showActiveBlocks();
    });
  } catch (error) {

  }

  window.addEventListener('resize', () => {
    innerWidth = window.innerWidth;
  });

  init();
  checkVisibleBlocks();
  hideBlocks();
});