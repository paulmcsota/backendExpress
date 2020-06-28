'use strict'

var mongoose = require('mongoose');
var schema = mongoose.Schema;

var  SongSchema = schema({
   Number: String,
   name: String,
   duration: String,
   file: String,
   album: {type: schema.ObjectId, ref: 'album'}
});

module.exports = mongoose.model('song', SongSchema);