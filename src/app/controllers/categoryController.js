'use strict';

const router = require('express').Router();
const Category = require('./../models/category');

router.get('/', (req, res) => {
    try {
        Category.fetchAll()
            .then(categories => {
                res.json(categories);
            })
            .catch(err => {
                res.status(400).send({
                    err: err,
                    position: 0,
                    message: 'Error listing categories.'
                });
            });
    } catch (err) {
        res.status(400).send({
            err: err,
            position: 1,
            message: 'Error listing categories.'
        });
    }
});



module.exports = app => app.use('/category', router);