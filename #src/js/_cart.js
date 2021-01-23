window.addEventListener('DOMContentLoaded', () => {
  const cartData = document.querySelectorAll(`[data-cart="data"]`);
  const numberOfGoods = document.querySelector(`[data-cart="numberOfGoods"]`);
  const hoverCart = document.querySelector(`[data-cart="hover-cart"]`);
  const mainCart = document.querySelector(`[data-cart="main-cart"]`);
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

  function cartResultBlock() {
    try {
      let cartResaultblock = document.querySelector('.cart-result');
      if (cart.length > 0) {
        cartResaultblock.style.display = 'flex';
      } else {
        cartResaultblock.style.display = 'none';
      }
    } catch (error) {

    }
  }

  function getGoods() {
    try {
      if (localStorage.getItem('cartItems') && cart.length > 0) {
        let itemsArray = '';
        let itemsArrayCart = '';
        cart.forEach(item => {
          itemsArray += `
            <div class="cart-item cart-item-hover">
              <div class="cart-item__del">
                <img class="cart-item__close-img" src="img/cart/close.svg" alt="">
              </div>
              <div class="cart-item__img-body">
                <picture>
                  <source srcset="${item.imgSmallWebp}" type="image/webp">
                  <img class="swiper-slide__img" src="${item.imgSmall}" alt="" data-cart="ImgPath">
                </picture>
              </div>
              <div class="cart-item_text">
                <div class="cart-item__title">${cutTitle(item.title)}</div>
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

          itemsArrayCart += `
          <div class="cart-item cart-item-big">

          <div class="cart-item-big-wrapper">
            <div class="cart-item-big-inner cart__title">
              <div class="cart__title-item">PRODUCT NAME</div>
            </div>
            <div class="cart-item-big-inner">
              <div class="cart-item__del">
                <img class="cart-item__close-img" src="img/cart/close.svg" alt="">
              </div>
              <div class="cart-item__img-body">
                <picture>
                  <source srcset="${item.imgWebp}" type="image/webp">
                  <img class="swiper-slide__img" src="${item.img}" alt="" data-cart="ImgPath">
                </picture>
              </div>
              <div class="cart-item__title">${item.title} ${item.color.toUpperCase()} ${item.size} GB</div>
            </div>
          </div>

          <div class="cart-item-big-wrapper">
            <div class="cart-item-big-inner cart__title">
              <div class="cart__title-item">UNIT PRICE</div>
              <div class="cart__title-item">QTY</div>
              <div class="cart__title-item">PRICE</div>
            </div>
            <div class="cart-item-big-inner">
              <div class="cart-item__price">${item.price}</div>
              <div class="cart-item__quantity-body">
                <div class="goods__quantity-body">
                  <div class="goods__quantity-minus cart-item__quantity-minus">-</div>
                  <div class="goods__quantity-number" data-cart="number">${item.number}</div>
                  <div class="goods__quantity-plus cart-item__quantity-plus">+</div>
                </div>
              </div>
              <div class="cart-item__price-total">$${item.price.replace(/\D/, '') * item.number}</div>
            </div>
          </div>
          
        </div>
            `;
        });
        hoverCart.innerHTML = `${itemsArray}`;
        mainCart.innerHTML = `${itemsArrayCart}`;
      } else {
        hoverCart.innerText = `No products`;
        mainCart.innerHTML = `
        <div class="cart-no-product">
          No product 
        </div>
        `;
      }
    } catch (error) {

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

  function delCartElem(a) {
    let cartElem = document.querySelectorAll(a);
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

  function changeQty(a) {
    try {
      let cartElem = document.querySelectorAll(a);
      cartElem.forEach((item, i) => {
        item.addEventListener('click', (e) => {
          if (e.target && e.target.classList.contains('cart-item__quantity-plus')) {
            cart[i].number = +cart[i].number + 1;
            localStorage.setItem('cartItems', JSON.stringify(cart));
            init();
          } else if ((e.target && e.target.classList.contains('cart-item__quantity-minus'))) {
            cart[i].number = +cart[i].number - 1;
            if (cart[i].number < 1) {
              cart[i].number = 1;
            }
            localStorage.setItem('cartItems', JSON.stringify(cart));
            init();
          }
        });
      });
    } catch (error) {

    }
  }

  function showCartMassage(text, color) {
    let cartMassage = document.querySelector(".modal__cart-massage");
    cartMassage.style.cssText = `
      display: flex;
      background-color: ${color};
    `;
    cartMassage.innerText = text;

    setTimeout(() => {
      cartMassage.style.display = 'none';
    }, 2000);
  }

  function checkCoupon() {
    try {
      let coupon = document.querySelector('[data-cart="coupon"]');
      let couponInput = document.querySelector('.cart-result__input');
      let couponInputBtn = document.querySelector('.cart-result__input-btn');

      couponInputBtn.addEventListener('click', () => {
        if (couponInput.value === '1111') {
          coupon.innerText = '$100';
          document.querySelector('.cart-result__total-item-text-big[data-cart="total"]').innerText = `$${(document.querySelector('.cart-result__total-item-text-big[data-cart="total"]').innerText.replace(/\D/,"") - 100).toFixed(2)}`;
          showCartMassage('Disscount  $100', '#a9ffa9');
          couponInputBtn.disabled = true;
        } else {
          coupon.innerText = 'No';
          showCartMassage('Wrong code', '#ffa9a9');
        }
        couponInput.value = '';
      });
    } catch (error) {

    }
  }

  function cutTitle(a, b = 10) {
    if (a.length > b) {
      a = `${a.slice(0, b)}…`;
    }
    return a;
  }

  function mailBody() {
    let bodyGoods = '';
    cart.forEach((elem, i) => {
      bodyGoods += `
      <div>
        <img src="https://svityaz-centr.com/img/active/icon_active.jpg" alt="">
        <p>Name : ${elem.title}</p>
        <p>color : ${elem.color}</p>
        <p>size : ${elem.size}</p>
        <p>quantity : ${elem.number}</p>
        <p>unit price : ${elem.price}</p>
        <p>total price : ${elem.price.replace(/\D/, '') * elem.number} </p>
        <br>
        <br>
      </div>
      `;
    });
    let body = `
    <p>Customer Name : ${document.querySelector('input#name').value}</p>
    <p>e-mail : ${document.querySelector('input#mail').value}</p>
    <p>phone : ${document.querySelector('input#phone').value}</p>
    <div>
      ${bodyGoods}
    </div>
    `;
    return body;
  }

  function openSendForm() {
    let chechOutBtn = document.querySelector('button.cart-result__total-item-btn');
    chechOutBtn.addEventListener('click', () => {
      document.querySelector('.modal__client-info').style.display = 'flex';
    });

  }

  function closwSendForm() {
    let chechOutBtn = document.querySelector('button.input-cancel');
    chechOutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelector('.modal__client-info').style.display = 'none';
    });

  }
  let nameInput = document.querySelector('input#name');
  let emailInput = document.querySelector('input#mail');
  let phoneInput = document.querySelector('input#phone');
  let checkboxInput = document.querySelector('input.input-checkbox');

  function validationInput() {

    nameInput.addEventListener('change', () => {
      if (nameInput.value === '') {
        nameInput.style.cssText = `
        box-shadow: 0 0 5px 5px rgb(234, 154, 157);
        `;
      } else {
        nameInput.style.cssText = `
        box-shadow: unset;
        `;
      }
    });

    emailInput.addEventListener('change', () => {
      let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      if (reg.test(emailInput.value) === false) {
        emailInput.style.cssText = `
        box-shadow: 0 0 5px 5px rgb(234, 154, 157);
        `;
      } else {
        emailInput.style.cssText = `
        box-shadow: unset;
        `;
      }
    });

    phoneInput.addEventListener('change', () => {
      let reg = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
      if (reg.test(phoneInput.value) === false) {
        phoneInput.style.cssText = `
        box-shadow: 0 0 5px 5px rgb(234, 154, 157);
        `;
      } else {
        phoneInput.style.cssText = `
        box-shadow: unset;
        `;
      }
    });
    
    checkboxInput.addEventListener('change', () => {
      if (!checkboxInput.checked)  {
        checkboxInput.style.cssText = `
        box-shadow: 0 0 5px 5px rgb(234, 154, 157);
        `;
      } else {
        checkboxInput.style.cssText = `
        box-shadow: unset;
        `;
      }
    });

  }

  function sendForm(params) {
    let submitBtn = document.querySelector('button.input-submit');
    submitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      
      let form = document.querySelector('form.modal__client-form');
      let inputForm = form.querySelectorAll('input');
      let checkboxInput = form.querySelector('input.input-checkbox');
      let counter = 0;

      inputForm.forEach(elem => {
        if (elem.style.boxShadow === `rgb(234, 154, 157) 0px 0px 5px 5px` || elem.value === '') {
          elem.style.cssText = `
          box-shadow: 0 0 5px 5px rgb(234, 154, 157);
          `;
          counter++;
        } else {
          elem.style.cssText = `
          box-shadow: unset;
          `;
        }
      });

      if (checkboxInput.checked === false) {
        checkboxInput.style.cssText = `
        box-shadow: 0 0 5px 5px rgb(234, 154, 157);
        `;
        counter++;
      } else {
        checkboxInput.style.cssText = `
        box-shadow: unset;
        `;
      }


      if (counter === 0) {
        checkboxInput.style.cssText = `
        unset;
        `;
        form.classList.add('loading');
        Email.send({
          Host: "smtp.gmail.com",
          Username: "dzonlennon25@gmail.com",
          Password: "dqwrkwkturmbrwib",
          To: 'dzonlennon25@gmail.com',
          From: "dzonlennon25@gmail.com",
          Subject: "Order",
          Body: mailBody(),
        }).then(() => {
          form.classList.remove('loading');
          form.classList.add('sucsses');
          setTimeout(() => {
            form.classList.remove('sucsses');
            document.querySelector('.modal__client-info').style.display = 'none';
            cart = [];
            localStorage.setItem('cartItems', JSON.stringify(cart));
            init();
          }, 2000);
        }).catch(() => {
          form.classList.remove('loading');
          form.classList.add('error');
          setTimeout(() => {
            form.classList.remove('error');
          }, 2000);
        }).finally(() => {
          form.reset();
        });
      } else {
        showCartMassage('Wrong filled form', '#ffa9a9');
      }
    });
  }

  function init() {
    try {
      getNumOfGoods();
      getGoods();
      totalsum();
      delCartElem(`.cart-item-hover`);
      delCartElem(`.cart-item-big`);
      changeQty(`.cart-item-hover`);
      changeQty(`.cart-item-big`);
      cartResultBlock();
      checkCoupon();
      validationInput();


      openSendForm();
      closwSendForm();
      sendForm();
    } catch (error) {

    }
  }

  cartData.forEach(item => {
    item.addEventListener('click', (e) => {
      // const addToCartBtn = item.querySelector(`[data-cart="add"]`);
      const goodsTitle = item.querySelector(`[data-cart="title"]`);
      const goodsPrice = item.querySelector(`[data-cart="price"]`);
      const goodsSize = item.querySelector(`[data-cart="size"]`);
      const goodsNumber = item.querySelector(`[data-cart="number"]`);
      const goodsColor = item.querySelector(`.active[data-cart="color"]`);
      const goodsImgPath = item.querySelector(`[data-cart="ImgPath"]`);

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
        goods.imgSmall = goods.img.replace(`/mid_`, `/small_`);
        goods.imgSmallWebp = goods.imgWebp.replace(`/mid_`, `/small_`);
        goods.id = `${goods.title} ${goods.color} ${goods.size}GB`;

        cart.forEach(elem => {
          if (elem.id === goods.id) {
            control += 1;
            showCartMassage('The product has already been added', '#ffa9a9');
          }
        });

        if (control === 0) {
          cart.unshift(goods);
          localStorage.setItem('cartItems', JSON.stringify(cart));
          init();
          showCartMassage('Product added successfully', '#a9ffa9');
        } else {
          goods = {};
        }
      }
    });
  });

  init();
});