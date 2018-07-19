'use strict';

var router = require('express').Router();
var Imagem = require('./../models/imagem');

router.get('/', (req, res) => {
    try {
        Imagem.fetchAll({
                withRelated: ['tags']
            })
            .then(imagens => {
                res.json(imagens);
            })
            .catch(err => {
                res.status(400).send({
                    err: err,
                    position: 0,
                    message: 'Erro ao listar as imagens.'
                });
            });
    } catch (err) {
        res.status(400).send({
            err: err,
            position: 1,
            message: 'Erro ao listar as imagens.'
        });
    }
});

router.post('/', (req, res) => {
    try {
        new Imagem(req.body).save()
            .then(saved => {
                res.json(saved);
            })
            .catch(err => {
                res.status(400).send({
                    err: err,
                    position: 0,
                    message: 'Erro ao inserir imagem.'
                });
            });
    } catch (err) {
        res.status(400).send({
            err: err,
            position: 1,
            message: 'Erro ao inserir imagem.'
        });
    }
});

router.put('/:idImagem', (req, res) => {
    try {
        Imagem.where('idImagem', req.params.idImagem).save(req.body, {
                method: 'update',
                patch: true
            })
            .then(saved => {
                res.json(saved);
            })
            .catch(err => {
                res.status(400).send({
                    err: err,
                    position: 0,
                    message: 'Erro ao atualizar imagem.'
                });
            });
    } catch (err) {
        res.status(400).send({
            err: err,
            position: 1,
            message: 'Erro ao atualizar imagem.'
        });
    }
});

router.delete('/:idImagem', (req, res) => {
    try {
        Imagem.where('idImagem', req.params.idImagem).destroy()
            .then(destroyed => {
                res.json(destroyed);
            })
            .catch(err => {
                res.status(400).send({
                    err: err,
                    position: 0,
                    message: 'Erro ao excluir imagem.'
                });
            });
    } catch (err) {
        res.status(400).send({
            err: err,
            position: 1,
            message: 'Erro ao excluir imagem.'
        });
    }
});

router.post('/:idTag', (req, res) => {
    try {
        const imagem = new Imagem(req.body);
        imagem.save()
            .then(() => {
                imagem.tags().attach(req.params.idTag)
                    .then(saved => {
                        res.json(saved);
                    })
                    .catch(err => {
                        res.status(400).send({
                            err: err,
                            position: 0,
                            message: 'Erro ao inserir imagem com Tag.'
                        });
                    });
            })
            .catch(err => {
                res.status(400).send({
                    err: err,
                    position: 1,
                    message: 'Erro ao inserir imagem com Tag.'
                });
            });
    } catch (err) {
        res.status(400).send({
            err: err,
            position: 2,
            message: 'Erro ao inserir imagem com Tag.'
        });
    }
});


module.exports = app => app.use('/imagem', router);