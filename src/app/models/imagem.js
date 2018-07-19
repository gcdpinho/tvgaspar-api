'use strict';

const bookshelf = require('bookshelf')(require('knex')(require('./../config/db.json')));
const Tag = require('./tag');

const Imagem = bookshelf.Model.extend({
    tableName: 'imagem',
    tags: function () {
        return this.belongsToMany(Tag, 'imagem_tag', 'idImagem', 'idTag', 'idImagem', 'idTag');
    }
});

module.exports = Imagem;