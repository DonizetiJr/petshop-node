var Product = require('../models/product');

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('localhost:27017/shopping');

var products = [
    new Product({
    imagePath: 'http://ghk.h-cdn.co/assets/cm/15/11/54ff8d2ead677-pets-can-love-orig-master-1.jpg',
    title: 'Pet Love',
    description: 'Two pets loving!',
    price: 10
  }),
  new Product({
    imagePath: 'http://ghk.h-cdn.co/assets/cm/15/11/54ff8d2ead677-pets-can-love-orig-master-1.jpg',
    title: 'Pet Love',
    description: 'Two pets loving!!',
    price: 20
  }),
  new Product({
    imagePath: 'http://ghk.h-cdn.co/assets/cm/15/11/54ff8d2ead677-pets-can-love-orig-master-1.jpg',
    title: 'Pet Love',
    description: 'Two pets loving!!!',
    price: 30
  }),
  new Product({
    imagePath: 'http://ghk.h-cdn.co/assets/cm/15/11/54ff8d2ead677-pets-can-love-orig-master-1.jpg',
    title: 'Pet Love',
    description: 'Two pets loving!!!!',
    price: 40
  }),
  new Product({
    imagePath: 'http://ghk.h-cdn.co/assets/cm/15/11/54ff8d2ead677-pets-can-love-orig-master-1.jpg',
    title: 'Pet Love',
    description: 'Two pets Loving!!',
    price: 50
  }),
  new Product({
    imagePath: 'http://ghk.h-cdn.co/assets/cm/15/11/54ff8d2ead677-pets-can-love-orig-master-1.jpg',
    title: 'Pet Love',
    description: 'Two Pets loving!!',
    price: 60
  })
];

var done = 0;

for (var i = 0; i < products.length; i++) {
  products[i].save(function(err, result) {
    done++;
    if (done === products.length) {
      exit();
    }
  });
}

function exit() {
  mongoose.disconnect();
}
