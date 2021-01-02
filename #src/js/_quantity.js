window.addEventListener('DOMContentLoaded', () => {
  try {
    let quantityBody = document.querySelector(".goods__quantity-body");
    let quantityCounter = 1;
    quantityBody.addEventListener('click', (e) => {
      if (e.target && e.target.classList.contains('goods__quantity-plus')) {
        quantityBody.querySelector('.goods__quantity-number').textContent = (++quantityCounter);
      } else if (e.target && e.target.classList.contains('goods__quantity-minus') && quantityCounter > 1) {
        quantityBody.querySelector('.goods__quantity-number').textContent = (--quantityCounter);
      }
    });
  } catch (error) {

  }
});