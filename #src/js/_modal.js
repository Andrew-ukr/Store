window.addEventListener('DOMContentLoaded', () => {
  const newsletterWindow = document.querySelector('.modal');
  const newsletterWindowCheckbox = newsletterWindow.querySelector('#checkbox-modal');
  const closeBtn = newsletterWindow.querySelector('.modal__close-btn');
  let scrollWidth;

  function modalMR() {
    let div = document.createElement('div');

    div.style.overflowY = 'scroll';
    div.style.width = '50px';
    div.style.height = '50px';

    document.body.append(div);
    scrollWidth = div.offsetWidth - div.clientWidth;

    div.remove();
  }

  function closeWindow() {
    closeBtn.addEventListener('click', (e) => {
      newsletterWindow.style.display = 'none';
      document.body.style.overflow = 'auto';
      document.body.style.paddingRight = ``;
    });

    newsletterWindow.addEventListener('click', (e) => {
      if (e.target && e.target.classList.contains('modal')) {
        newsletterWindow.style.display = 'none';
        document.body.style.overflow = 'auto';
        document.body.style.paddingRight = ``;
      }
    });
  }

  function openWindow() {
    newsletterWindow.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollWidth}px`;

    newsletterWindowCheckbox.addEventListener('change', () => {
      if (newsletterWindowCheckbox.checked) {
        localStorage.setItem('show-popup', 'false');
      } else {
        localStorage.removeItem('show-popup');
      }
    });

  }

  function showWindow() {
    modalMR();

    if (!localStorage.getItem('show-popup')) {
      setTimeout(() => {
        openWindow();
      }, 1000);
    }

    closeWindow();
  }

  showWindow();
});