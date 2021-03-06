'use strict';

const router = require('express').Router();
const nodemailer = require('nodemailer');

router.post('/', (req, res) => {
    try {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'vulpistvgaspar@gmail.com',
                pass: 'tvgaspar123'
            }
        });

        let mailOptions = {
            from: req.body.from,
            to: req.body.to,
            subject: req.body.subject,
            text: req.body.text
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                res.status(400).send({
                    err: error,
                    position: 0,
                    message: 'Error sending email contact.'
                });
            } else
                res.json(info.response);
        });
    } catch (err) {
        console.log(err);
        res.status(400).send({
            err: err,
            position: 1,
            message: 'Error sending email contact.'
        });
    }
});

module.exports = app => app.use('/email', router);