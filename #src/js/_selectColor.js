window.addEventListener('DOMContentLoaded', () => {
  let colorItem = document.querySelectorAll(".goods__color-item");
  let sliderImg = document.querySelectorAll('.swiper-slide__img');

  colorItem.forEach(item => {
    item.addEventListener('click', () => {
      let previousColorClass;
      let currentColorClass;
      colorItem.forEach(item => {
        if (item.classList.contains('active')) {
          previousColorClass = item.classList.item(1);
        }
        item.classList.remove('active');
      });
      item.classList.add('active');
      currentColorClass = item.classList.item(1);
      sliderImg.forEach(item => {
        let sliderImgPath = item.getAttribute('src').replace(previousColorClass, currentColorClass);
        item.setAttribute('src', sliderImgPath);
        let sliderImgPathWebp = item.previousElementSibling.getAttribute('srcset').replace(previousColorClass, currentColorClass);
        item.previousElementSibling.setAttribute('srcset', sliderImgPathWebp);
      });
    });
  });
});