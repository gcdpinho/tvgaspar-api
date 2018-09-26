'use strict';

const router = require('express').Router();
const News = require('./../models/news');

router.get('/byApproval', (req, res) => {
    try {
        News.where({
                approval: 1,
                flgActive: 1,
            })
            .orderBy('created_at', 'desc')
            .fetchPage({
                pageSize: req.query.pageSize || 24,
                page: req.query.page || 1,
                withRelated: ['tags', 'images', 'categories', 'videos']
            })
            .then(news => {
                res.json({
                    news,
                    pagination: news.pagination
                });
            })
            .catch(err => {
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
        News.where({
                approval: 1,
                flgActive: 1
            })
            .query('innerJoin', 'news_tag', 'news_id', 'news.id')
            .query('innerJoin', 'tag', 'tag.id', 'tag_id')
            .where('tag.tag', req.body.tag)
            .orderBy('created_at', 'desc')
            .fetchPage({
                pageSize: req.query.pageSize || 5,
                page: req.query.page || 1,
                withRelated: ['tags', 'images', 'categories', 'videos']
            })
            .then(news => {
                res.json({
                    news,
                    pagination: news.pagination
                });
            })
            .catch(err => {
                res.status(400).send({
                    err: err,
                    position: 0,
                    message: 'Error listing news by tag.'
                });
            });
    } catch (err) {
        res.status(400).send({
            err: err,
            position: 1,
            message: 'Error listing news by tag.'
        });
    }
});

router.post('/byCategory', (req, res) => {
    try {
        News.where({
                approval: 1,
                flgActive: 1
            })
            .query('innerJoin', 'category_news', 'news_id', 'news.id')
            .query('innerJoin', 'category', 'category.id', 'category_id')
            .where('category.category', req.body.category)
            .orderBy('created_at', 'desc')
            .fetchPage({
                pageSize: req.query.pageSize || 10,
                page: req.query.page || 1,
                withRelated: ['tags', 'images', 'categories', 'videos']
            })
            .then(news => {
                res.json({
                    news,
                    pagination: news.pagination
                });
            })
            .catch(err => {
                res.status(400).send({
                    err: err,
                    position: 0,
                    message: 'Error listing news by category.'
                });
            });
    } catch (err) {
        res.status(400).send({
            err: err,
            position: 1,
            message: 'Error listing news by category.'
        });
    }
});

router.post('/byTagByCategory', (req, res) => {
    try {
        News.where({
                approval: 1,
                flgActive: 1
            })
            .query('innerJoin', 'category_news', 'category_news.news_id', 'news.id')
            .query('innerJoin', 'category', 'category.id', 'category_id')
            .query('innerJoin', 'news_tag', 'news_tag.news_id', 'news.id')
            .query('innerJoin', 'tag', 'tag.id', 'tag_id')
            .where('category.category', req.body.category)
            .where('tag.tag', req.body.tag)
            .orderBy('created_at', 'desc')
            .fetchPage({
                pageSize: req.query.pageSize || 10,
                page: req.query.page || 1,
                withRelated: ['tags', 'images', 'categories', 'videos']
            })
            .then(news => {
                res.json({
                    news,
                    pagination: news.pagination
                });
            })
            .catch(err => {
                res.status(400).send({
                    err: err,
                    position: 0,
                    message: 'Error listing news by category by tag.'
                });
            });
    } catch (err) {
        res.status(400).send({
            err: err,
            position: 1,
            message: 'Error listing news by category by tag.'
        });
    }
});

router.post('/byTagNotCategory', (req, res) => {
    try {
        News.where({
                approval: 1,
                flgActive: 1
            })
            .query('innerJoin', 'category_news', 'category_news.news_id', 'news.id')
            .query('innerJoin', 'category', 'category.id', 'category_id')
            .query('innerJoin', 'news_tag', 'news_tag.news_id', 'news.id')
            .query('innerJoin', 'tag', 'tag.id', 'tag_id')
            .where('category.category', '<>', req.body.category)
            .where('tag.tag', req.body.tag)
            .orderBy('created_at', 'desc')
            .fetchPage({
                pageSize: req.query.pageSize || 3,
                page: req.query.page || 1,
                withRelated: ['tags', 'images', 'categories', 'videos']
            })
            .then(news => {
                res.json({
                    news,
                    pagination: news.pagination
                });
            })
            .catch(err => {
                res.status(400).send({
                    err: err,
                    position: 0,
                    message: 'Error listing news by category by tag.'
                });
            });
    } catch (err) {
        res.status(400).send({
            err: err,
            position: 1,
            message: 'Error listing news by category by tag.'
        });
    }
});

router.get('/:id', (req, res) => {
    try {
        News.where({
                id: req.params.id,
                approval: 1,
                flgActive: 1
            })
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
                    message: 'Error listing news by id.'
                });
            });
    } catch (err) {
        console.log(err);
        res.status(400).send({
            err: err,
            position: 1,
            message: 'Error listing news by id.'
        });
    }
});


module.exports = app => app.use('/news', router);