'use strict';

var bookshelf = require('bookshelf')(require('knex')(require('./../config/db.json')));

var User = bookshelf.Model.extend({
    tableName: 'user'
});

module.exports = User;