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
                    message: 'Error listing tags.'
                });
            });
    } catch (err) {
        res.status(400).send({
            err: err,
            position: 1,
            message: 'Error listing tags.'
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
                    message: 'Error inserting tag.'
                });
            });
    } catch (err) {
        res.status(400).send({
            err: err,
            position: 1,
            message: 'Error inserting tag.'
        });
    }
});

router.put('/:id', (req, res) => {
    try {
        Tag.where('id', req.params.id).save(req.body, {
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
                    message: 'Error updating tag.'
                });
            });
    } catch (err) {
        res.status(400).send({
            err: err,
            position: 1,
            message: 'Error updating tag.'
        });
    }
});

router.delete('/:id', (req, res) => {
    try {
        Tag.where('id', req.params.id).destroy()
            .then(destroyed => {
                res.json(destroyed);
            })
            .catch(err => {
                res.status(400).send({
                    err: err,
                    position: 0,
                    message: 'Error deleting tag.'
                });
            });
    } catch (err) {
        res.status(400).send({
            err: err,
            position: 1,
            message: 'Error deleting tag.'
        });
    }
});


module.exports = app => app.use('/tag', router);