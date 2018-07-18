'use strict';

var router = require('express').Router();
var categoria = require('./../models/categoria');

router.get('/', (req, res) => {
    categoria.fetchAll().then((categorias) => {
        res.json({
            categorias
        });
    });
});

module.exports = app => app.use('/categoria', router);