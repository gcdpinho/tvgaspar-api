'use strict';

var bookshelf = require('bookshelf')(require('knex')(require('./../config/db.json')));

var Category = bookshelf.Model.extend({
    tableName: 'category'
});

module.exports = Category;