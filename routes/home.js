const express = require('express');

const contactRoute = require('./contact');

const router = express.Router();

module.exports = () => {
    router.get('/', (req, res) => {
        res.render('home', { pageTitle: 'Profile' });
    });

    router.use('/contact', contactRoute());

    return router;
}


