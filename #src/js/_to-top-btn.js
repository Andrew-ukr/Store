window.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('scroll', ()=> {
    if(document.documentElement.scrollTop > 1000) {
      document.querySelector('a.to-top-btn').style.opacity = '1';
    } else {
      document.querySelector('a.to-top-btn').style.opacity = '0';
    }
  });
});