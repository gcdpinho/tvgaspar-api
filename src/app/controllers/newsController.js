'use strict';

var router = require('express').Router();
var News = require('./../models/news');

router.get('/', (req, res) => {
    try {
        News.fetchAll({
                withRelated: ['tags', 'images', 'categories', 'videos']
            })
            .then(news => {
                res.json(news);
            })
            .catch(err => {
                console.log(err);
                res.status(400).send({
                    err: err,
                    position: 0,
                    message: 'Erro ao listar as news.'
                });
            });
    } catch (err) {
        res.status(400).send({
            err: err,
            position: 1,
            message: 'Erro ao listar as news.'
        });
    }
});

router.post('/', (req, res) => {
    try {
        new News(req.body).save()
            .then(saved => {
                res.json(saved);
            })
            .catch(err => {
                res.status(400).send({
                    err: err,
                    position: 0,
                    message: 'Erro ao inserir news.'
                });
            });
    } catch (err) {
        res.status(400).send({
            err: err,
            position: 1,
            message: 'Erro ao inserir news.'
        });
    }
});

router.put('/:id', (req, res) => {
    try {
        News.where('id', req.params.id).save(req.body, {
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
                    message: 'Erro ao atualizar news.'
                });
            });
    } catch (err) {
        res.status(400).send({
            err: err,
            position: 1,
            message: 'Erro ao atualizar news.'
        });
    }
});

router.delete('/:id', (req, res) => {
    try {
        News.where('id', req.params.id).destroy()
            .then(destroyed => {
                res.json(destroyed);
            })
            .catch(err => {
                res.status(400).send({
                    err: err,
                    position: 0,
                    message: 'Erro ao excluir news.'
                });
            });
    } catch (err) {
        res.status(400).send({
            err: err,
            position: 1,
            message: 'Erro ao excluir news.'
        });
    }
});

router.post('/:idCategory/:idImage/:idTag/:idVideo', (req, res) => {
    try {
        const news = new News(req.body);
        news.save()
            .then(saved => {
                Promise.all([news.categories().attach(JSON.parse(req.params.idCategory)),
                    news.images().attach(JSON.parse(req.params.idImage)),
                    news.videos().attach(JSON.parse(req.params.idVideo)),
                    news.tags().attach(JSON.parse(req.params.idTag))

                ]).then(relation => {
                    res.json({
                        saved,
                        relation
                    });
                }).catch(err => {
                    res.status(400).send({
                        err: err,
                        position: 0,
                        message: 'Erro ao inserir news relação.'
                    });
                });
            }).catch(err => {
                res.status(400).send({
                    err: err,
                    position: 1,
                    message: 'Erro ao inserir news com relação.'
                });
            });
    } catch (err) {
        res.status(400).send({
            err: err,
            position: 2,
            message: 'Erro ao inserir news com relação.'
        });
    }
});


module.exports = app => app.use('/news', router);