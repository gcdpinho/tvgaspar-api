'use strict';

const bookshelf = require('bookshelf')(require('knex')(require('./../config/db.json')));
const Image = require('./image');

const Ad = bookshelf.Model.extend({
    tableName: 'ad',
    image: function () {
        return this.belongsTo(Image);
    }
});

module.exports = Ad;