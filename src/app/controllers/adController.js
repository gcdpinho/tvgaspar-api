'use strict';

const router = require('express').Router();
const Ad = require('./../models/ad');

router.post('/byType', (req, res) => {
    try {
        Ad.where({
                type: req.body.type,
                flgActive: 1
            })
            .fetchAll({
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

module.exports = app => app.use('/ad', router);