'use strict';

var router = require('express').Router();
var User = require('./../models/user');

router.post('/', (req, res) => {
    try {
        User.forge({
                email: req.body.email
            }).fetch()
            .then(user => {
                user.authenticate(req.body.password)
                    .then(user => {
                        res.json(user);
                    })
                    .catch(err => {
                        res.status(400).send({
                            err: err,
                            position: 0,
                            message: 'Error authenticate user.'
                        });
                    })
            })
            .catch(err => {
                res.status(400).send({
                    err: err,
                    position: 1,
                    message: 'Error authenticate user.'
                });
            });
    } catch (err) {
        res.status(400).send({
            err: err,
            position: 2,
            message: 'Error authenticate user.'
        });
    }
});

module.exports = app => app.use('/auth', router);