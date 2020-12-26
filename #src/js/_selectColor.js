window.addEventListener('DOMContentLoaded', () => {
  let colorItem = document.querySelectorAll(".goods__color-item");

  colorItem.forEach(item => {
    item.addEventListener('click', () => {
      colorItem.forEach(item => {
        item.classList.remove('active');
      });
      item.classList.add('active');
    });
  });

});