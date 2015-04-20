var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var ArticleSchema = new Schema(
{
    id: String,
    title: String,
    authors: Array,
    posted: Date,
    updated: Date,
    markdown: Array
});

module.exports = mongoose.model('Article', ArticleSchema);