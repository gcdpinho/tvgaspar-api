'use strict';

var router = require('express').Router();
var Image = require('./../models/image');

router.get('/', (req, res) => {
    try {
        Image.fetchAll({
                withRelated: ['tags']
            })
            .then(images => {
                res.json(images);
            })
            .catch(err => {
                console.log(err);
                res.status(400).send({
                    err: err,
                    position: 0,
                    message: 'Erro ao listar as images.'
                });
            });
    } catch (err) {
        res.status(400).send({
            err: err,
            position: 1,
            message: 'Erro ao listar as images.'
        });
    }
});

router.post('/', (req, res) => {
    try {
        new Image(req.body).save()
            .then(saved => {
                res.json(saved);
            })
            .catch(err => {
                res.status(400).send({
                    err: err,
                    position: 0,
                    message: 'Erro ao inserir image.'
                });
            });
    } catch (err) {
        res.status(400).send({
            err: err,
            position: 1,
            message: 'Erro ao inserir image.'
        });
    }
});

router.put('/:id', (req, res) => {
    try {
        Image.where('id', req.params.id).save(req.body, {
                method: 'update',
                patch: true
            })
            .then(saved => {
                res.json(saved);
            })
            .catch(err => {
                res.status(400).send({
                    err: err,
                    position: 0,
                    message: 'Erro ao atualizar image.'
                });
            });
    } catch (err) {
        res.status(400).send({
            err: err,
            position: 1,
            message: 'Erro ao atualizar image.'
        });
    }
});

router.delete('/:id', (req, res) => {
    try {
        Image.where('id', req.params.id).destroy()
            .then(destroyed => {
                res.json(destroyed);
            })
            .catch(err => {
                res.status(400).send({
                    err: err,
                    position: 0,
                    message: 'Erro ao excluir image.'
                });
            });
    } catch (err) {
        res.status(400).send({
            err: err,
            position: 1,
            message: 'Erro ao excluir image.'
        });
    }
});

router.post('/:id', (req, res) => {
    try {
        const image = new Image(req.body);
        image.save()
            .then(saved => {
                image.tags().attach(JSON.parse(req.params.id))
                    .then(relation => {
                        res.json({
                            saved,
                            relation
                        });
                    })
                    .catch(err => {
                        res.status(400).send({
                            err: err,
                            position: 0,
                            message: 'Erro ao inserir image com Tag.'
                        });
                    });
            })
            .catch(err => {
                res.status(400).send({
                    err: err,
                    position: 1,
                    message: 'Erro ao inserir image com Tag.'
                });
            });
    } catch (err) {
        res.status(400).send({
            err: err,
            position: 2,
            message: 'Erro ao inserir image com Tag.'
        });
    }
});


module.exports = app => app.use('/image', router);