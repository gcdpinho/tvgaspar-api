'use strict';

var bookshelf = require('bookshelf')(require('knex')(require('./../config/db.json')));

var categoria = bookshelf.Model.extend({
    tableName: 'categoria'
});

module.exports = categoria;