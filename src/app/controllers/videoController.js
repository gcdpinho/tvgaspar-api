'use strict';

const router = require('express').Router();
const Video = require('./../models/video');

router.post('/byTag', (req, res) => {
    try {
        Video
            .query('innerJoin', 'tag_video', 'video_id', 'video.id')
            .query('innerJoin', 'tag', 'tag.id', 'tag_id')
            .where('tag.tag', req.body.tag)
            .orderBy('video.id', 'desc')
            .fetchAll({
                withRelated: ['tags']
            })  
            .then(videos => {
                res.json(videos);
            })
            .catch(err => {
                console.log(err);
                res.status(400).send({
                    err: err,
                    position: 0,
                    message: 'Error listing videos by tag.'
                });
            });
    } catch (err) {
        res.status(400).send({
            err: err,
            position: 1,
            message: 'Error listing videos by tag.'
        });
    }
});


module.exports = app => app.use('/video', router);