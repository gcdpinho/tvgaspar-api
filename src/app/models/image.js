'use strict';

const bookshelf = require('bookshelf')(require('knex')(require('./../config/db.json')));
const Tag = require('./tag');

const Image = bookshelf.Model.extend({
    tableName: 'image',
    tags: function () {
        return this.belongsToMany(Tag);
    }
});

module.exports = Image;