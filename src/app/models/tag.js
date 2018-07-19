'use strict';

var bookshelf = require('bookshelf')(require('knex')(require('./../config/db.json')));
const Imagem = require('./imagem');

var Tag = bookshelf.Model.extend({
    tableName: 'tag'
});

module.exports = Tag;