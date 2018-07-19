'use strict';

var bookshelf = require('bookshelf')(require('knex')(require('./../config/db.json')));

var Categoria = bookshelf.Model.extend({
    tableName: 'categoria'
});

module.exports = Categoria;