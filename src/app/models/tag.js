'use strict';

var bookshelf = require('bookshelf')(require('knex')(require('./../config/db.json')));

var Tag = bookshelf.Model.extend({
    tableName: 'tag'
});

module.exports = Tag;