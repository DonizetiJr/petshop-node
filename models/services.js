var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
	clientName: {type: String, required: true},
	petName: {type: String, required: true},
	fone: {type: String, required: true},
	serviceType: {type: String, required: true},
	date: {type: Date, required: true},
});

module.exports = mongoose.model('Product', schema);