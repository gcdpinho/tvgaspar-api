'use strict';

const router = require('express').Router();
const Video = require('./../models/video');

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
                    message: 'Error listing videos.'
                });
            });
    } catch (err) {
        res.status(400).send({
            err: err,
            position: 1,
            message: 'Error listing videos.'
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
                    message: 'Error inserting video.'
                });
            });
    } catch (err) {
        res.status(400).send({
            err: err,
            position: 1,
            message: 'Error inserting video.'
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
                    message: 'Error updating video.'
                });
            });
    } catch (err) {
        res.status(400).send({
            err: err,
            position: 1,
            message: 'Error updating video.'
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
                    message: 'Error deleting video.'
                });
            });
    } catch (err) {
        res.status(400).send({
            err: err,
            position: 1,
            message: 'Error deleting video.'
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
                            message: 'Error inserting video with Tag.'
                        });
                    });
            })
            .catch(err => {
                res.status(400).send({
                    err: err,
                    position: 1,
                    message: 'Error inserting video with Tag.'
                });
            });
    } catch (err) {
        res.status(400).send({
            err: err,
            position: 2,
            message: 'Error inserting video with Tag.'
        });
    }
});


module.exports = app => app.use('/video', router);