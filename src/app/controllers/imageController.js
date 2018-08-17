'use strict';

const router = require('express').Router();
const Image = require('./../models/image');

router.post('/byTag', (req, res) => {
    try {
        Image
            .query('innerJoin', 'image_tag', 'image_id', 'image.id')
            .query('innerJoin', 'tag', 'tag.id', 'tag_id')
            .where('tag.tag', req.body.tag)
            .orderBy('image.id', 'desc')
            .fetchAll({
                withRelated: ['tags']
            })
            .then(images => {
                res.json(images);
            })
            .catch(err => {
                console.log(err);
                res.status(400).send({
                    err: err,
                    position: 0,
                    message: 'Error listing images by Tag.'
                });
            });
    } catch (err) {
        res.status(400).send({
            err: err,
            position: 1,
            message: 'Error listing images by Tag.'
        });
    }
});

module.exports = app => app.use('/image', router);