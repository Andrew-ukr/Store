window.addEventListener('DOMContentLoaded', () => {
  const tabItem = document.querySelectorAll('.goods__tab-list-item');
  const tabContentItem = document.querySelectorAll('.goods__tab-content-item');

  function clearActiveClass() {
    tabItem.forEach(elem => {
      elem.classList.remove('active');
    });
  }


  tabItem.forEach((elem, i) => {
    elem.addEventListener('click', (e) => {
      if (e.target && e.target.classList.contains('goods__tab-list-item')) {
        clearActiveClass();
        e.target.classList.add('active');

        tabContentItem.forEach(item => {
          item.classList.remove('active');
          tabContentItem[i].classList.add('active');
        });
      }
    });
  });

});