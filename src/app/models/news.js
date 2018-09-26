'use strict';

const bookshelf = require('bookshelf')(require('knex')(require('./../config/db.json')));
bookshelf.plugin('pagination')
const Tag = require('./tag');
const Image = require('./image');
const Video = require('./video');
const Category = require('./category');

const News = bookshelf.Model.extend({
    tableName: 'news',
    hasTimestamps: true,
    tags: function () {
        return this.belongsToMany(Tag);
    },
    images: function () {
        return this.belongsToMany(Image);
    },
    videos: function () {
        return this.belongsToMany(Video);
    },
    categories: function () {
        return this.belongsToMany(Category);
    }
});

module.exports = News;