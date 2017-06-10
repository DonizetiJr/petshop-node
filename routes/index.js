var express = require('express');
var router = express.Router();
var Cart = require('../models/cart');

var Product = require('../models/product');
var Order = require('../models/order');

/* GET home page. */
router.get('/', function(req, res, next) {
  var successMsg = req.flash('success')[0];
  Product.find(function(err, docs) {
    var productChunks = [];
    var chunckSize = 3;
    for (var i = 0; i < docs.length; i += chunckSize) {
      productChunks.push(docs.slice(i,i + chunckSize));
    }
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    res.render('shop/index', { title: 'Pet Shop', products: productChunks, successMsg: successMsg, noMessages: !successMsg, productsCart: cart.generateArray(), totalPrice: cart.totalPrice });
  });
});

router.get('/add-to-cart/:id', function(req, res, next) {
  var productID = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  Product.findById(productID, function(err, product) {
    if (err) {
      return res.redirect('/');
    }
    cart.add(product, product.id);
    req.session.cart = cart;
    // res.redirect('/');
    res.send({product: product, productsCart: cart.generateArray(), totalPrice: cart.totalPrice});
  });
});

router.get('/reduce/:id', function(req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  Product.findById(productId, function (err, product) {
    if (err) {
      return res.redirect('/');
    }
    cart.reduceByOne(productId);
    req.session.cart = cart;
    // res.redirect('/shopping-cart');
    res.send({product: product, productsCart: cart.generateArray(), totalPrice: cart.totalPrice});
  });
});

router.get('/remove/:id', function(req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  Product.findById(productId, function (err, product) {
    if (err) {
      return res.redirect('/');
    }

    cart.removeItem(productId);
    req.session.cart = cart;
    // res.redirect('/shopping-cart');
    res.send({product: product, productsCart: cart.generateArray(), totalPrice: cart.totalPrice});
  });

});

router.get('/shopping-cart', function(req, res, next) {
  if (!req.session.cart) {
    return res.render('shop/shopping-cart', {products: null});
  }
  var cart = new Cart(req.session.cart);
  var errMsg = req.flash('error')[0];
  res.render('shop/shopping-cart', { products: cart.generateArray(), totalPrice: cart.totalPrice, errMsg: errMsg, noError: !errMsg});
});

router.get('/checkout', isLoggedIn, function(req, res, next) {
  if (!req.session.cart) {
    return res.res('/shopping-cart');
  }
  var cart = new Cart(req.session.cart);
  var errMsg = req.flash('error')[0];
  res.send({totalPrice: cart.totalPrice, errMsg: errMsg, noError: !errMsg, products: cart.generateArray()});
});

router.get('/buy-final', isLoggedIn, function(req, res, next) {
  if (!req.session.cart) {
    return res.res('/shopping-cart');
  }
  var cart = new Cart(req.session.cart);

  var order = new Order({
      user: req.user,
      cart: cart,
      address: req.body.address,
      name: req.body.name,
      // paymentId: charge.id
    });

    order.save(function(err, result) {
      req.session.cart = null;
      res.send({total: cart.totalPrice});
    });

});

// router.post('/checkout', isLoggedIn, function(req, res, next) {
//   if (!req.session.cart) {
//     return res.res('/shopping-cart');
//   }
//   var cart = new Cart(req.session.cart);
//
//   var order = new Order({
//     user: req.user,
//     cart: cart,
//     address: req.body.address,
//     name: req.body.name,
//     // paymentId: charge.id
//   });
//
//   order.save(function(err, result) {
//     req.flash('success', 'Successfully bought product!');
//     req.session.cart = null;
//     // res.redirect('/');
//     res.send({total: cart.totalPrice});
//   });
//
//
// });

module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.session.oldUrl = req.url;
  res.redirect('/user/signin');
}
