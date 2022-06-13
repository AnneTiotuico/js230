$(function () {
  let slideshow = $(".slideshow");
  let thumbnails = $(".thumbnails");
  thumbnails.on('click', 'li', function(e) {
    slideshow.find('figure.visible').fadeOut(200, function() {
      $(this).removeClass('visible').addClass('hidden');
    })
    let img = $(this).find('img').attr('src');
    let chosen = slideshow.find(`img[src='${img}']`).closest('figure');
    chosen.delay(200).fadeIn(200, function() {
      $(this).removeClass('hidden').addClass('visible');
    });
    $('li').removeClass('active');
    $(this).addClass('active');
  })
});
