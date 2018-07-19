'use strict';

var router = require('express').Router();
var Ad = require('./../models/ad');

router.get('/', (req, res) => {
    try {
        Ad.fetchAll({
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
                    message: 'Erro ao listar as ads.'
                });
            });
    } catch (err) {
        res.status(400).send({
            err: err,
            position: 1,
            message: 'Erro ao listar as ads.'
        });
    }
});

router.post('/', (req, res) => {
    try {
        new Ad(req.body).save()
            .then(saved => {
                res.json(saved);
            })
            .catch(err => {
                res.status(400).send({
                    err: err,
                    position: 0,
                    message: 'Erro ao inserir ad.'
                });
            });
    } catch (err) {
        res.status(400).send({
            err: err,
            position: 1,
            message: 'Erro ao inserir ad.'
        });
    }
});

router.put('/:id', (req, res) => {
    try {
        Ad.where('id', req.params.id).save(req.body, {
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
                    message: 'Erro ao atualizar ad.'
                });
            });
    } catch (err) {
        res.status(400).send({
            err: err,
            position: 1,
            message: 'Erro ao atualizar ad.'
        });
    }
});

router.delete('/:id', (req, res) => {
    try {
        Ad.where('id', req.params.id).destroy()
            .then(destroyed => {
                res.json(destroyed);
            })
            .catch(err => {
                res.status(400).send({
                    err: err,
                    position: 0,
                    message: 'Erro ao excluir ad.'
                });
            });
    } catch (err) {
        res.status(400).send({
            err: err,
            position: 1,
            message: 'Erro ao excluir ad.'
        });
    }
});

// router.post('/:id', (req, res) => {
//     try {
//         const ad = new Ad(req.body);
//         ad.save({
//                 image_id: req.params.id
//             })
//             .then(saved => {
//                 res.json(saved)
//                     .catch(err => {
//                         res.status(400).send({
//                             err: err,
//                             position: 0,
//                             message: 'Erro ao inserir ad com image.'
//                         });
//                     });
//             })
//             .catch(err => {
//                 res.status(400).send({
//                     err: err,
//                     position: 1,
//                     message: 'Erro ao inserir ad com image.'
//                 });
//             });
//     } catch (err) {
//         res.status(400).send({
//             err: err,
//             position: 2,
//             message: 'Erro ao inserir ad com image.'
//         });
//     }
// });


module.exports = app => app.use('/ad', router);