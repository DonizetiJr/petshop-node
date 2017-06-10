// var stripe = Stripe('pk_test_QfA3v5h8cKn9sBuYjNDT1RFG');
//
// var $form = $("#checkout-form");
//
// $form.submit(function(event) {
//   $form.find('button').prop('disabled', true);
//
//   stripe.createToken({
//     number: $('#card-number').val(),
//     cvc: $('#card-cvc').val(),
//     exp_month: $('#card-expiry-month').val(),
//     exp_year: $('#card-expiry-year').val(),
//     name: $('#card-name').val()
//   }).then(function(result) {
//     $('#charge-error').text(response.error.message);
//     $('#charge-error').removeClass('hidden');
//     $form.find('button').prop('disabled', false);
//   });
// });
//
// function stripeResponseHandler(status, response) {
//   if (response.error) {
//     $('#charge-error').text(response.error.message);
//     $('#charge-error').removeClass('hidden');
//     $form.find('button').prop('disabled', false);
//   } else {
//     var token = response.id;
//     $form.append($('<input type="hidden" name="stripeToken" />').val(token));
//     $form.get(0).submit();
//   }
// }
