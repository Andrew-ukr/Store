window.addEventListener('DOMContentLoaded', () => {
  const cartData = document.querySelectorAll(`[data-cart="data"]`);
  const numberOfGoods = document.querySelector(`[data-cart="numberOfGoods"]`);
  const hoverCart = document.querySelector(`[data-cart="hover-cart"]`);
  const totalSum = document.querySelectorAll(`[data-cart="total"]`);
  let cart = [];
  if (localStorage.getItem('cartItems')) {
    cart = JSON.parse(localStorage.getItem('cartItems'));
  }

  function getNumOfGoods() {
    let counter = 0;
    cart.forEach(item => {
      counter += +item.number;
    });
    numberOfGoods.innerText = `${counter}`;
  }

  function getGoods() {
    if (localStorage.getItem('cartItems') && cart.length > 0) {
      let itemsArray = '';
      cart.forEach(item => {
        itemsArray += `
        <div class="cart-item">
        <div class="cart-item__del">
          <img class="cart-item__close-img" src="img/cart/close.svg" alt="">
        </div>
        <div class="cart-item__img-body">
          <picture>
            <source srcset="${item.imgWebp}" type="image/webp">
            <img class="swiper-slide__img" src="${item.img}" alt="" data-cart="ImgPath">
          </picture>
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
    } else {
      hoverCart.innerText = `No products`;
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

  function delCartElem() {
    let cartElem = document.querySelectorAll(`.cart-item`);
    let cartDelBtn = document.querySelector(`button.cart-hover__btn`);
    cartElem.forEach((item, i) => {
      item.addEventListener('click', (e) => {
        if (e.target && e.target.parentElement.classList.contains("cart-item__del") || e.target && e.target.classList.contains("cart-item__del")) {
          cart.splice(i, 1);
          localStorage.setItem('cartItems', JSON.stringify(cart));
          init();
        }
      });
    });

    cartDelBtn.addEventListener('click', () => {
      cart = [];
      localStorage.setItem('cartItems', JSON.stringify(cart));
      init();
    });
  }

  function changeQty() {
    let cartElem = document.querySelectorAll(`.cart-item`);
    cartElem.forEach((item, i) => {
      item.addEventListener('click', (e) => {
        switch (e.target && e.target.className) {
          case 'cart-item__quantity-plus':
            cart[i].number = +cart[i].number + 1;
            localStorage.setItem('cartItems', JSON.stringify(cart));
            init();
            break;

          case 'cart-item__quantity-minus':
            cart[i].number = +cart[i].number - 1;
            if (cart[i].number < 1) {
              cart[i].number = 1;
            }
            localStorage.setItem('cartItems', JSON.stringify(cart));
            init();
            break;
        }
      });
    });
  }

  function init() {
    getNumOfGoods();
    getGoods();
    totalsum();
    delCartElem();
    changeQty();
  }

  cartData.forEach(item => {
    item.addEventListener('click', (e) => {
      const addToCartBtn = item.querySelector(`[data-cart="add"]`);
      const goodsTitle = item.querySelector(`[data-cart="title"]`);
      const goodsPrice = item.querySelector(`[data-cart="price"]`);
      const goodsSize = item.querySelector(`[data-cart="size"]`);
      const goodsNumber = item.querySelector(`[data-cart="number"]`);
      const goodsColor = item.querySelector(`.active[data-cart="color"]`);
      const goodsImgPath = item.querySelector(`[data-cart="ImgPath"]`);
      const goodsId = item.querySelector(`[data-id]`);

      if (e.target && e.target.dataset.cart === 'add') {
        let control = 0;
        let goods = {};
        goods.title = goodsTitle.innerText;
        goods.price = goodsPrice.innerText;
        goods.size = goodsSize.value;
        goods.number = goodsNumber.innerText;
        goods.color = goodsColor.title;
        goods.img = goodsImgPath.getAttribute('src');
        goods.imgWebp = goodsImgPath.previousElementSibling.getAttribute('srcset');
        goods.id = `${goods.title} ${goods.color} ${goods.size}GB`;

        cart.forEach(elem => {
          if (elem.id === goods.id) {
            control += 1;
          }
        });

        if (control === 0) {
          cart.unshift(goods);
          localStorage.setItem('cartItems', JSON.stringify(cart));
          init();
        } else {
          goods = {};
        }
      }
    });
  });

  init();
});