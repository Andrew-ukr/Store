window.addEventListener('DOMContentLoaded', () => {
  try {
    const selectBody = document.querySelector('.goods__size');
    const priceBodyNew = document.querySelector('.goods__price-new');
    const priceBodyOld = document.querySelector('.goods__price-old');
    let currentSelectValue;

    selectBody.addEventListener('change', () => {
      currentSelectValue = selectBody.value;

      switch (currentSelectValue) {
        case '64':
          priceBodyNew.textContent = `$499`;
          priceBodyOld.textContent = `$599`;
          break;
        case '128':
          priceBodyNew.textContent = `$599`;
          priceBodyOld.textContent = `$699`;
          break;
        case '256':
          priceBodyNew.textContent = `$699`;
          priceBodyOld.textContent = `$799`;
          break;
      }
    });
  } catch (error) {

  }
});