'use strict';

const router = require('express').Router();
const Category = require('./../../models/category');

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

router.post('/', (req, res) => {
    try {
        new Category(req.body).save()
            .then(saved => {
                res.json(saved);
            })
            .catch(err => {
                res.status(400).send({
                    err: err,
                    position: 0,
                    message: 'Error inserting category.'
                });
            });
    } catch (err) {
        res.status(400).send({
            err: err,
            position: 1,
            message: 'Error inserting category.'
        });
    }
});

router.put('/:id', (req, res) => {
    try {
        Category.where('id', req.params.id).save(req.body, {
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
                    message: 'Error updating category.'
                });
            });
    } catch (err) {
        res.status(400).send({
            err: err,
            position: 1,
            message: 'Error updating category.'
        });
    }
});

router.delete('/:id', (req, res) => {
    try {
        Category.where('id', req.params.id).destroy()
            .then(destroyed => {
                res.json(destroyed);
            })
            .catch(err => {
                res.status(400).send({
                    err: err,
                    position: 0,
                    message: 'Error deleting category.'
                });
            });
    } catch (err) {
        res.status(400).send({
            err: err,
            position: 1,
            message: 'Error deleting category.'
        });
    }
});


module.exports = app => app.use('/category', router);