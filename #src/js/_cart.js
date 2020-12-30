window.addEventListener('DOMContentLoaded', () => {
  const cartData = document.querySelectorAll(`[data-cart="data"]`);
  let goods = {};
  
  let cart = [];
  if (localStorage.getItem('cartItems')) {
    cart = JSON.parse(localStorage.getItem('cartItems'));
  } 

  cartData.forEach(item => {
    item.addEventListener('click', (e) => {
      const addToCartBtn = item.querySelector(`[data-cart="add"]`);
      const goodsTitle = item.querySelector(`[data-cart="title"]`);
      const goodsPrice = item.querySelector(`[data-cart="price"]`);
      const goodsSize = item.querySelector(`[data-cart="size"]`);
      const goodsNumber = item.querySelector(`[data-cart="number"]`);
      const goodsColor = item.querySelector(`.active[data-cart="color"]`);
      const goodsId = item.querySelector(`[data-cart]`);

      if (e.target && e.target.dataset.cart === 'add') {
        goods.id = goodsId.getAttribute("data-id");
        goods.title = goodsTitle.innerText;
        goods.price = goodsPrice.innerText;
        goods.size = goodsSize.value;
        goods.number = goodsNumber.innerText;
        goods.color = goodsColor.title;


        cart.push(goods);
        localStorage.setItem('cartItems', JSON.stringify(cart));
        cart = JSON.parse(localStorage.getItem('cartItems'));
        console.log(cart);
      }
    });
  });
});