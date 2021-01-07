window.addEventListener('DOMContentLoaded', () => {
  try {
    let inputLeft = document.querySelector('input.store__aside-input-left');
    let inputRight = document.querySelector('input.store__aside-input-right');
    let leftBtn = document.querySelector('.range-slider-left');
    let rightBtn = document.querySelector('.range-slider-right');
    let range = document.querySelector('.range-slider-range');
    let rangeValue = document.querySelector(`[data-range='range']`);

    function getLeftValue() {
      inputLeft.value = Math.min(+inputLeft.value, +inputRight.value - 1);
      let value = ((+inputLeft.value - +inputLeft.min) / (+inputLeft.max - +inputLeft.min)) * 100;
      leftBtn.style.left = `${value}%`;
      range.style.left = `${value}%`;
      initRangeValue();
    }

    function getRightValue() {
      inputRight.value = Math.max(+inputRight.value, +inputLeft.value + 1);
      let value = ((+inputRight.value - +inputRight.min) / (+inputRight.max - +inputRight.min)) * 100;
      rightBtn.style.right = `${100 - value}%`;
      range.style.right = `${100 - value}%`;
      initRangeValue();
    }

    function initRangeValue() {
      rangeValue.innerText = `$${(+inputLeft.value).toFixed(2)} - $${(+inputRight.value).toFixed(2)}`;
    }

    inputLeft.addEventListener('input', () => {
      rightBtn.style.zIndex = "1";
      leftBtn.style.zIndex = "2";
      inputRight.style.zIndex = "3";
      inputLeft.style.zIndex = "4";
      getLeftValue();
    });

    inputRight.addEventListener('input', () => {
      rightBtn.style.zIndex = "2";
      leftBtn.style.zIndex = "1";
      inputRight.style.zIndex = "4";
      inputLeft.style.zIndex = "3";
      getRightValue();
    });

    getLeftValue();
    getRightValue();
  } catch (error) {

  }
});