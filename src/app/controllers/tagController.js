'use strict';

const router = require('express').Router();
const Tag = require('./../models/tag');

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

module.exports = app => app.use('/tag', router);