$(function () {
  let slideshow = $(".slideshow");
  let thumbnails = $(".thumbnails");

  thumbnails.on('click', 'li', function(e) {
    let currentImg = slideshow.find('figure:visible');
    let img = $(this).find('img').attr('src');
    let chosen = slideshow.find(`img[src='${img}']`).closest('figure');

    if (currentImg.is(chosen)) return;

    currentImg.fadeOut(200, function() {
      $(this).toggleClass('hidden');
    });
    
    chosen.delay(200).fadeIn(200, function() {
      $(this).toggleClass('hidden');
    });
    
    $('li').removeClass('active');
    $(this).addClass('active');
  })
});
