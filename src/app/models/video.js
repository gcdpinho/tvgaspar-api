'use strict';

const bookshelf = require('bookshelf')(require('knex')(require('./../config/db.json')));
const Tag = require('./tag');

const Video = bookshelf.Model.extend({
    tableName: 'video',
    tags: function () {
        return this.belongsToMany(Tag);
    }
});

module.exports = Video;