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

  const selectWrapper = document.querySelectorAll('.select-wrapper');
  const selectDropdownAll = document.querySelectorAll('.select__dropdown');

  selectWrapper.forEach(elem => {

    let selectDropdown = elem.querySelector('.select__dropdown');
    let select = elem.querySelector('.select');

    elem.addEventListener('click', (e) => {
      e.stopPropagation();
      console.log(1);

      if (e.target && select) {
        console.log(2);
        if (selectDropdown.classList.contains('select__dropdown-active')) {
          selectDropdownAll.forEach(elem => {
            elem.classList.remove('select__dropdown-active');
          });
          selectDropdown.classList.remove('select__dropdown-active');
          console.log(2.1);
        } else {
          selectDropdownAll.forEach(elem => {
            elem.classList.remove('select__dropdown-active');
          });
          selectDropdown.classList.add('select__dropdown-active');
          console.log(2.2);
        }
      }

      if (e.target && e.target.classList.contains('select__dropdown-item')) {
        console.log(3);
        select.innerText = `${e.target.dataset.selectOption}`;
        selectDropdown.classList.remove('select__dropdown-active');
      }
    });
  });

  window.addEventListener('click', (e) => {
    if (e.target !== selectWrapper) {
      console.log(4);
      selectDropdownAll.forEach(elem => {
        elem.classList.remove('select__dropdown-active');
      });
    }
  });

});