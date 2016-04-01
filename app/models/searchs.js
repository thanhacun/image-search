'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Search = new Schema({
   time: { type:Date, default: Date.now },
   phrase: String
});

module.exports = mongoose.model('Search', Search);