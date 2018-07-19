'use strict';

var router = require('express').Router();
var Ad = require('./../models/ad');

router.get('/', (req, res) => {
    try {
        Ad.fetchAll({
                withRelated: ['image']
            })
            .then(ads => {
                res.json(ads);
            })
            .catch(err => {
                console.log(err);
                res.status(400).send({
                    err: err,
                    position: 0,
                    message: 'Error listing ads.'
                });
            });
    } catch (err) {
        res.status(400).send({
            err: err,
            position: 1,
            message: 'Error listing ads.'
        });
    }
});

router.post('/', (req, res) => {
    try {
        new Ad(req.body).save()
            .then(saved => {
                res.json(saved);
            })
            .catch(err => {
                res.status(400).send({
                    err: err,
                    position: 0,
                    message: 'Error inserting ad.'
                });
            });
    } catch (err) {
        res.status(400).send({
            err: err,
            position: 1,
            message: 'Error inserting ad.'
        });
    }
});

router.put('/:id', (req, res) => {
    try {
        Ad.where('id', req.params.id).save(req.body, {
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
                    message: 'Error updating ad.'
                });
            });
    } catch (err) {
        res.status(400).send({
            err: err,
            position: 1,
            message: 'Error updating ad.'
        });
    }
});

router.delete('/:id', (req, res) => {
    try {
        Ad.where('id', req.params.id).destroy()
            .then(destroyed => {
                res.json(destroyed);
            })
            .catch(err => {
                res.status(400).send({
                    err: err,
                    position: 0,
                    message: 'Error deleting ad.'
                });
            });
    } catch (err) {
        res.status(400).send({
            err: err,
            position: 1,
            message: 'Error deleting ad.'
        });
    }
});

module.exports = app => app.use('/ad', router);