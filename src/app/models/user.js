'use strict';

var bookshelf = require('bookshelf')(require('knex')(require('./../config/db.json')));

bookshelf.plugin(require('bookshelf-secure-password'));

var User = bookshelf.Model.extend({
    tableName: 'user',
    hasSecurePassword: true
});

module.exports = User;