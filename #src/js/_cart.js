window.addEventListener('DOMContentLoaded', () => {
  const cartData = document.querySelectorAll(`[data-cart="data"]`);
  const numberOfGoods = document.querySelector(`[data-cart="numberOfGoods"]`);
  const hoverCart = document.querySelector(`[data-cart="hover-cart"]`);
  const totalSum = document.querySelectorAll(`[data-cart="total"]`);
  let goods = {};
  let cart = [];
  if (localStorage.getItem('cartItems')) {
    cart = JSON.parse(localStorage.getItem('cartItems'));
  }
  let numOfGoods;

  function getNumOfGoods() {
    let counter = 0;
    cart.forEach(item => {
      counter += +item.number;
    });
    numOfGoods = numberOfGoods.innerText = `${counter}`;
  }

  function getGoods() {
    if (localStorage.getItem('cartItems')) {
      let itemsArray = '';
      cart.forEach(item => {
        itemsArray += `
        <div class="cart-item">
        <div class="cart-item__close">
          <img class="cart-item__close-img" src="img/cart/close.svg" alt="">
        </div>
        <div class="cart-item__img-body">
          <img class="cart-item__img" src="img/goods/goods1/red/small/beats1.jpg" alt="">
        </div>
        <div class="cart-item_text">
          <div class="cart-item__title">${item.title}</div>
          <div class="cart-item__price">${item.price}</div>
        </div>
        <div class="cart-item__quantity-body">
          <div class="cart-item__quantity">
            <div class="cart-item__quantity-plus">+</div>
            <div class="cart-item__quantity-number">${item.number}</div>
            <div class="cart-item__quantity-minus">-</div>
          </div>
        </div>
      </div>
        `;
      });
      hoverCart.innerHTML = `${itemsArray}`;
    }
  }

  function totalsum() {
    let total = 0;
    cart.forEach(item => {
      total += +item.price.replace(/\D/, "") * +item.number;
    });
    totalSum.forEach(item => {
      item.innerText = `$${total.toFixed(2)}`;
    });
  }


  cartData.forEach(item => {
    item.addEventListener('click', (e) => {
      const addToCartBtn = item.querySelector(`[data-cart="add"]`);
      const goodsTitle = item.querySelector(`[data-cart="title"]`);
      const goodsPrice = item.querySelector(`[data-cart="price"]`);
      const goodsSize = item.querySelector(`[data-cart="size"]`);
      const goodsNumber = item.querySelector(`[data-cart="number"]`);
      const goodsColor = item.querySelector(`.active[data-cart="color"]`);
      const goodsId = item.querySelector(`[data-id]`);

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

        getNumOfGoods();
        getGoods();
        totalsum();
      }
    });
  });

  getNumOfGoods();
  getGoods();
  totalsum();
});