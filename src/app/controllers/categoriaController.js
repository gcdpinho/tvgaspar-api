'use strict';

var router = require('express').Router();
var Categoria = require('./../models/categoria');

router.get('/', (req, res) => {
    try {
        Categoria.fetchAll()
            .then(categorias => {
                res.json(categorias);
            })
            .catch(err => {
                res.status(400).send({
                    err: err,
                    position: 0,
                    message: 'Erro ao listar as categorias.'
                });
            });
    } catch (err) {
        res.status(400).send({
            err: err,
            position: 1,
            message: 'Erro ao listar as categorias.'
        });
    }
});

router.post('/', (req, res) => {
    try {
        new Categoria(req.body).save()
            .then(saved => {
                res.json(saved);
            })
            .catch(err => {
                res.status(400).send({
                    err: err,
                    position: 0,
                    message: 'Erro ao inserir categoria.'
                });
            });
    } catch (err) {
        res.status(400).send({
            err: err,
            position: 1,
            message: 'Erro ao inserir categoria.'
        });
    }
});

router.put('/:idCategoria', (req, res) => {
    try {
        Categoria.where('idCategoria', req.params.idCategoria).save(req.body, {
                method: 'update',
                patch: true
            })
            .then(saved => {
                res.json(saved);
            })
            .catch(err => {
                console.log(err);
                res.status(400).send({
                    err: err,
                    position: 0,
                    message: 'Erro ao atualizar categoria.'
                });
            });
    } catch (err) {
        res.status(400).send({
            err: err,
            position: 1,
            message: 'Erro ao atualizar categoria.'
        });
    }
});

router.delete('/:idCategoria', (req, res) => {
    try {
        Categoria.where('idCategoria', req.params.idCategoria).destroy()
            .then(destroyed => {
                res.json(destroyed);
            })
            .catch(err => {
                res.status(400).send({
                    err: err,
                    position: 0,
                    message: 'Erro ao excluir categoria.'
                });
            });
    } catch (err) {
        res.status(400).send({
            err: err,
            position: 1,
            message: 'Erro ao excluir categoria.'
        });
    }
});


module.exports = app => app.use('/categoria', router);