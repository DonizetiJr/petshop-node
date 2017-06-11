$(function() {

  $(document).on('click','.btn-buy', function (e) {
    let id = $(this).attr('id');

    let cartQty = $('#header-badge').text();
    cartQty++;
    $('#header-badge').text(cartQty);

    $.ajax({
      url: '/add-to-cart/'+id,
      contentType: 'application/json',
      success: function(response) {
        var tbodyEl = $('#cart-ul');

        tbodyEl.html('');

        response.productsCart.forEach(function(product) {

          tbodyEl.append('\<li id="table-item-'+product.item._id+'" class="list-group-item">\
          <span id="cart-badge-'+product.item._id+'" class="badge">'+product.qty+'</span>\
          <strong>'+product.item.title+'</strong>\
          <span id="item-price" class="label label-success">R$<span>'+product.item.price+'</span></span>\
          <div class="btn-group">\
          <button class="btn btn-primary btn-xs dropdown-toggle" type="button" data-toggle="dropdown">Ação<span class="caret"></span></button>\
          <ul class="dropdown-menu">\
          <li><a id="'+product.item._id+'" class="btn-reduce">Remover 1 unidade</a></li>\
          <li><a id="'+product.item._id+'" class="btn-remove">Remover Todos</a></li>\
          </ul>\
          </div>\
          </li>');
        });
        $('#total-price').html('');
        $('#total-price').append('<strong>Total: R$ <span>'+response.totalPrice+'</span></strong></p>');
        $('#cart-footer').html('');
        $('#cart-footer').append('<button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>\
                                      <a id="btn-checkout" type="button" class="btn btn-success">Prosseguir Compra</a>');
      }
    });
  });

  $(document).on('click','.btn-reduce', function (e) {
    let id = $(this).attr('id');

    $.ajax({
      url: '/reduce/'+id,
      contentType: 'application/json',
      success: function(response) {

        let cartQty = $('#header-badge').text();
        let itemQty = $('#cart-badge-'+id).text();
        cartQty--;
        itemQty--;
        $('#header-badge').text(cartQty);

        if (itemQty == 0) {
          $('#table-item-'+id).css('display', 'none');
        } else {
          $('#cart-badge-'+id).text(itemQty);
        }
        if (cartQty == 0) {
          $('#cart-ul').append("<div class='row'><div class='col-sm-6 cold-md-6 col-md-offset-3 col-sm-offset-3'><h2>Nenhum item no carrinho de compras</h2></div></div");
          $('#btns-cart-modal').html('');
          $('#btns-cart-modal').append('<button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>');

        }

        $('#total-price').find('span').text(response.totalPrice);
      }
    });

  });

  $(document).on('click','.btn-remove', function (e) {
    let id = $(this).attr('id');

    $.ajax({
      url: '/remove/'+id,
      contentType: 'application/json',
      success: function(response) {

        let cartQty = $('#header-badge').text();
        let itemQty = $('#cart-badge-'+id).text();
        cartQty -= itemQty;
        $('#header-badge').text(cartQty);

        $('#table-item-'+id).css('display', 'none');

        if (cartQty == 0) {
          $('#cart-ul').append("<div class='row'><div class='col-sm-6 cold-md-6 col-md-offset-3 col-sm-offset-3'><h2>Nenhum item no carrinho de compras</h2></div></div");
          $('#btns-cart-modal').html('');
          $('#btns-cart-modal').append('<button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>');
        }

        $('#total-price').find('span').text(response.totalPrice);
      }
    });
  });

  $(document).on('click','#btn-checkout', function (e) {

    $.ajax({
      url: "/checkout",
      contentType: 'application/json',
      success: function(response) {

        $('#cart-list').html('');
        $('#cart-list').append("<div class='row'> <div class='col-sm-6 col-md-4 col-md-offset-4 col-sm-offset-3'> <h1>Dados Pessoais</h1> <h4>Seu total: $"+response.totalPrice+"</h4><form id='checkout-form'> <div class='row'> <div class='col-xs-12'> <div class='form-group'> <label >Nome</label> <input type='text' id='name' class='form-control'> </div></div><div class='col-xs-12'> <div class='form-group'> <label>Endereço</label> <input type='text' id='address' class='form-control'> </div></div><hr> <div class='col-xs-12'> <div class='form-group'> <label>Nome no cartão</label> <input type='text' id='card-name' class='form-control'> </div></div><div class='col-xs-12'> <div class='form-group'> <label>Número do Cartão de Crédito</label> <input type='text' id='card-number' class='form-control'> </div></div><div class='col-xs-12'> <div class='row'> <div class='col-xs-6'> <div class='form-group'> <label>Mês de Vencimento</label> <input type='text' id='card-expiry-month' class='form-control'> </div></div><div class='col-xs-6'> <div class='form-group'> <label>Ano de Vencimento</label> <input type='text' id='card-expiry-year' class='form-control'> </div></div></div></div><div class='col-xs-12'> <div class='form-group'> <label>CVC</label> <input type='text' id='card-cvc' class='form-control'> </div></div></div> </form> </div></div>");
        $('#total-price').find('span').text(response.totalPrice);

        $('.cart-total-price').html('');
        $('#cart-footer').html('');
        $('#cart-list').append('<div id="cart-footer" class="modal-footer">'+

          '<div class="row">'+
            '<div id="btns-cart-modal" class="col-sm-6 cold-md-6 col-md-offset-6 col-sm-offset-6">'+
              '<button id="btn-close-modal" type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>'+
              '<button id="btn-close-modal" type="button" class="btn btn-info btn-buy-final" data-dismiss="modal">Finalizar Compra</button>'+
            '</div>'+
          '</div>'+

        '</div>');
      }
    });

  });

  $(document).on('click','.btn-buy-final', function (e) {
    e.preventDefault();
    $.ajax({
      url: "/buy-final",
      mehotd: 'GET',
      contentType: 'application/json',
      success: function(response) {
        $('#header-badge').text('0');
        response.totalPrice = 0;

        setTimeout(function(){
          $('#success-bought').toggleClass("hidden");
        }, 5000);
        $('#success-bought').toggleClass("hidden");

        $('#cart-list').html('');
        $('#cart-list').append('<h2>Nenhum item no carrinho de compras</h2>'+
        '<div class="row">'+
          '<div id="total-cart-price" class="col-sm-6 cold-md-6 col-md-offset-3 col-sm-offset-3">'+
            '<p id="total-price"><strong>Total: R$ <span>'+response.totalPrice+'</span></strong></p>'+
          '</div>'+
        '</div>'+

      '<div class="modal-footer">'+

        '<div class="row">'+
          '<div id="btns-cart-modal" class="col-sm-6 cold-md-6 col-md-offset-6 col-sm-offset-6">'+
            '<button id="btn-close-modal" type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>'+
          '</div>'+
          '</div>'+
        '</div>');
      }
    });
  });

});
