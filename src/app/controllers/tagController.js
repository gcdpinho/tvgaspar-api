'use strict';

var router = require('express').Router();
var Tag = require('./../models/tag');

router.get('/', (req, res) => {
    try {
        Tag.fetchAll()
            .then(tags => {
                res.json(tags);
            })
            .catch(err => {
                res.status(400).send({
                    err: err,
                    position: 0,
                    message: 'Erro ao listar as tags.'
                });
            });
    } catch (err) {
        res.status(400).send({
            err: err,
            position: 1,
            message: 'Erro ao listar as tags.'
        });
    }
});

router.post('/', (req, res) => {
    try {
        new Tag(req.body).save()
            .then(saved => {
                res.json(saved);
            })
            .catch(err => {
                res.status(400).send({
                    err: err,
                    position: 0,
                    message: 'Erro ao inserir tag.'
                });
            });
    } catch (err) {
        res.status(400).send({
            err: err,
            position: 1,
            message: 'Erro ao inserir tag.'
        });
    }
});

router.put('/:idTag', (req, res) => {
    try {
        Tag.where('idTag', req.params.idTag).save(req.body, {
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
                    message: 'Erro ao atualizar tag.'
                });
            });
    } catch (err) {
        res.status(400).send({
            err: err,
            position: 1,
            message: 'Erro ao atualizar tag.'
        });
    }
});

router.delete('/:idTag', (req, res) => {
    try {
        Tag.where('idTag', req.params.idTag).destroy()
            .then(destroyed => {
                res.json(destroyed);
            })
            .catch(err => {
                res.status(400).send({
                    err: err,
                    position: 0,
                    message: 'Erro ao excluir tag.'
                });
            });
    } catch (err) {
        res.status(400).send({
            err: err,
            position: 1,
            message: 'Erro ao excluir tag.'
        });
    }
});


module.exports = app => app.use('/tag', router);