'use strict';

var router = require('express').Router();
var Video = require('./../models/video');

router.get('/', (req, res) => {
    try {
        Video.fetchAll({
                withRelated: ['tags']
            })
            .then(videos => {
                res.json(videos);
            })
            .catch(err => {
                console.log(err);
                res.status(400).send({
                    err: err,
                    position: 0,
                    message: 'Erro ao listar os videos.'
                });
            });
    } catch (err) {
        res.status(400).send({
            err: err,
            position: 1,
            message: 'Erro ao listar os videos.'
        });
    }
});

router.post('/', (req, res) => {
    try {
        new Video(req.body).save()
            .then(saved => {
                res.json(saved);
            })
            .catch(err => {
                res.status(400).send({
                    err: err,
                    position: 0,
                    message: 'Erro ao inserir video.'
                });
            });
    } catch (err) {
        res.status(400).send({
            err: err,
            position: 1,
            message: 'Erro ao inserir video.'
        });
    }
});

router.put('/:id', (req, res) => {
    try {
        Video.where('id', req.params.id).save(req.body, {
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
                    message: 'Erro ao atualizar video.'
                });
            });
    } catch (err) {
        res.status(400).send({
            err: err,
            position: 1,
            message: 'Erro ao atualizar video.'
        });
    }
});

router.delete('/:id', (req, res) => {
    try {
        Video.where('id', req.params.id).destroy()
            .then(destroyed => {
                res.json(destroyed);
            })
            .catch(err => {
                res.status(400).send({
                    err: err,
                    position: 0,
                    message: 'Erro ao excluir video.'
                });
            });
    } catch (err) {
        res.status(400).send({
            err: err,
            position: 1,
            message: 'Erro ao excluir video.'
        });
    }
});

router.post('/:id', (req, res) => {
    try {
        const video = new Video(req.body);
        video.save()
            .then(saved => {
                video.tags().attach(JSON.parse(req.params.id))
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
                            message: 'Erro ao inserir video com Tag.'
                        });
                    });
            })
            .catch(err => {
                res.status(400).send({
                    err: err,
                    position: 1,
                    message: 'Erro ao inserir video com Tag.'
                });
            });
    } catch (err) {
        res.status(400).send({
            err: err,
            position: 2,
            message: 'Erro ao inserir video com Tag.'
        });
    }
});


module.exports = app => app.use('/video', router);