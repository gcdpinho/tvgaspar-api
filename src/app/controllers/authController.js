'use strict';

const router = require('express').Router();
const User = require('./../models/user');
const jwt = require('jsonwebtoken');
const authConfig = require('./../config/auth.json');

const getToken = () => {
    return jwt.sign({}, authConfig.secret, {
        expiresIn: "1d"
    });
};

router.post('/', (req, res) => {
    try {
        User.forge({
                email: req.body.email
            }).fetch()
            .then(user => {
                user.authenticate(req.body.password)
                    .then(user => {
                        user.save({
                                token: getToken()
                            })
                            .then((saved) => {
                                res.json(saved);
                            })
                            .catch(err => {
                                res.status(400).send({
                                    err: err,
                                    position: 0,
                                    message: 'Error authenticate user.'
                                });
                            });
                    })
                    .catch(err => {
                        res.status(400).send({
                            err: err,
                            position: 1,
                            message: 'Error authenticate user.'
                        });
                    })
            })
            .catch(err => {
                res.status(400).send({
                    err: err,
                    position: 2,
                    message: 'Error authenticate user.'
                });
            });
    } catch (err) {
        res.status(400).send({
            err: err,
            position: 3,
            message: 'Error authenticate user.'
        });
    }
});



module.exports = app => app.use('/auth', router);