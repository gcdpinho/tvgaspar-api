'use strict';

const router = require('express').Router();
const News = require('./../models/news');

router.get('/byApproval', (req, res) => {
    try {
        News.where({
                approval: 1,
                flgActive: 1,
            }).fetchAll({
                withRelated: ['tags', 'images', 'categories', 'videos']
            })
            .then(news => {
                res.json(news);
            })
            .catch(err => {
                console.log(err);
                res.status(400).send({
                    err: err,
                    position: 0,
                    message: 'Error listing news by approval.'
                });
            });
    } catch (err) {
        res.status(400).send({
            err: err,
            position: 1,
            message: 'Error listing news by approval.'
        });
    }
});

router.post('/byTag', (req, res) => {
    try {
        News.forge({
                approval: 1,
                flgActive: 1
            })
            .query('innerJoin', 'news_tag', 'news_id', 'news.id')
            .query('innerJoin', 'tag', 'tag.id', 'tag_id')
            .where('tag.tag', req.body.tag)
            .fetchAll({
                withRelated: ['tags', 'images', 'categories', 'videos']
            })
            .then(news => {
                res.json(news);
            })
            .catch(err => {
                console.log(err);
                res.status(400).send({
                    err: err,
                    position: 0,
                    message: 'Error listing news by tag.'
                });
            });
    } catch (err) {
        console.log(err);
        res.status(400).send({
            err: err,
            position: 1,
            message: 'Error listing news by tag.'
        });
    }
});


module.exports = app => app.use('/news', router);