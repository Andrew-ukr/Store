window.addEventListener('DOMContentLoaded', () => {
  function prodTitle() {
    let titleArea = document.querySelector('[data-cart="title"]');
    let primaryTitle = titleArea.getAttribute('alt');
    let primaryColor = document.querySelector('.goods__color-item.active').getAttribute('title');
    let primarySize = document.querySelector('[data-cart="size"]').value;

    titleArea.innerText = `${primaryTitle} ${primaryColor} ${primarySize} Gb`;
  }
  prodTitle();
});