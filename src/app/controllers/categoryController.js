'use strict';

var router = require('express').Router();
var Category = require('./../models/category');

router.get('/', (req, res) => {
    try {
        Category.fetchAll()
            .then(categories => {
                res.json(categories);
            })
            .catch(err => {
                res.status(400).send({
                    err: err,
                    position: 0,
                    message: 'Erro ao listar as categories.'
                });
            });
    } catch (err) {
        res.status(400).send({
            err: err,
            position: 1,
            message: 'Erro ao listar as categories.'
        });
    }
});

router.post('/', (req, res) => {
    try {
        new Category(req.body).save()
            .then(saved => {
                res.json(saved);
            })
            .catch(err => {
                res.status(400).send({
                    err: err,
                    position: 0,
                    message: 'Erro ao inserir category.'
                });
            });
    } catch (err) {
        res.status(400).send({
            err: err,
            position: 1,
            message: 'Erro ao inserir category.'
        });
    }
});

router.put('/:id', (req, res) => {
    try {
        Category.where('id', req.params.id).save(req.body, {
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
                    message: 'Erro ao atualizar category.'
                });
            });
    } catch (err) {
        res.status(400).send({
            err: err,
            position: 1,
            message: 'Erro ao atualizar category.'
        });
    }
});

router.delete('/:id', (req, res) => {
    try {
        Category.where('id', req.params.id).destroy()
            .then(destroyed => {
                res.json(destroyed);
            })
            .catch(err => {
                res.status(400).send({
                    err: err,
                    position: 0,
                    message: 'Erro ao excluir category.'
                });
            });
    } catch (err) {
        res.status(400).send({
            err: err,
            position: 1,
            message: 'Erro ao excluir category.'
        });
    }
});


module.exports = app => app.use('/category', router);