$(document).ready(function() {
  $('.nav-icon__btn').click(function(event) {
    $('.nav-bar').toggleClass('nav-bar--active');
    $('.nav-icon__btn-line').toggleClass('nav-icon__btn-line--active');
    $('body').toggleClass('lock');    
  });
});