'use strict';

var router = require('express').Router();
var User = require('./../models/user');

router.get('/', (req, res) => {
    try {
        User.fetchAll()
            .then(users => {
                res.json(users);
            })
            .catch(err => {
                res.status(400).send({
                    err: err,
                    position: 0,
                    message: 'Error listing users.'
                });
            });
    } catch (err) {
        res.status(400).send({
            err: err,
            position: 1,
            message: 'Error listing users.'
        });
    }
});

router.post('/', (req, res) => {
    try {
        new User(req.body).save()
            .then(saved => {
                res.json(saved);
            })
            .catch(err => {
                res.status(400).send({
                    err: err,
                    position: 0,
                    message: 'Error inserting user.'
                });
            });
    } catch (err) {
        res.status(400).send({
            err: err,
            position: 1,
            message: 'Error inserting user.'
        });
    }
});

router.put('/:id', (req, res) => {
    try {
        User.where('id', req.params.id).save(req.body, {
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
                    message: 'Error updating user.'
                });
            });
    } catch (err) {
        res.status(400).send({
            err: err,
            position: 1,
            message: 'Error updating user.'
        });
    }
});

router.delete('/:id', (req, res) => {
    try {
        User.where('id', req.params.id).destroy()
            .then(destroyed => {
                res.json(destroyed);
            })
            .catch(err => {
                res.status(400).send({
                    err: err,
                    position: 0,
                    message: 'Error deleting user.'
                });
            });
    } catch (err) {
        res.status(400).send({
            err: err,
            position: 1,
            message: 'Error deleting user.'
        });
    }
});


module.exports = app => app.use('/user', router);