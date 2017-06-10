$(function() {

  $('.btn-buy').click(function() {
    var id = $(this).attr('id')

    var cartQty = $('.badge').text();
    cartQty++;
    $('.badge').text(cartQty);
    // $('.badge').val(cartQty);

    $.ajax({
      url: '/add-to-cart/'+id,
      contentType: 'application/json',
      success: function(response) {
        console.log(response);
      }
    });
  });
});
