'use strict';

const router = require('express').Router();
const News = require('./../../models/news');

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
                    message: 'Error listing news.'
                });
            });
    } catch (err) {
        res.status(400).send({
            err: err,
            position: 1,
            message: 'Error listing news.'
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
                    message: 'Error inserting news.'
                });
            });
    } catch (err) {
        res.status(400).send({
            err: err,
            position: 1,
            message: 'Error inserting news.'
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
                    message: 'Error updating news.'
                });
            });
    } catch (err) {
        res.status(400).send({
            err: err,
            position: 1,
            message: 'Error updating news.'
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
                    message: 'Error deleting news.'
                });
            });
    } catch (err) {
        res.status(400).send({
            err: err,
            position: 1,
            message: 'Error deleting news.'
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
                        message: 'Error inserting news with relação.'
                    });
                });
            }).catch(err => {
                res.status(400).send({
                    err: err,
                    position: 1,
                    message: 'Error inserting news with relação.'
                });
            });
    } catch (err) {
        res.status(400).send({
            err: err,
            position: 2,
            message: 'Error inserting news with relação.'
        });
    }
});


module.exports = app => app.use('/news', router);