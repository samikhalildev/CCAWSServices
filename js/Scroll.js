$(window).scroll(function() {
  var sticky = $('header'),
    scroll = $(window).scrollTop();
  if (scroll >= 10) sticky.addClass('scroll');
  else sticky.removeClass('scroll');
});
