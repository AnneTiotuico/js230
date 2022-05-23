$(function() {
  $('form').submit(function (e) {
    e.preventDefault();
    let inputChar = $("#key").val();

    $(document).off('keypress').on('keypress', function(e) {
      if (e.key !== inputChar) {
        return;
      }

      $('a').trigger('click');
    });
  });

  $('a').click(function (e) {
    e.preventDefault();
    $('#accordion').slideToggle();
  });
});
