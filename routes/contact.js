const express = require('express');

const router = express.Router();

module.exports = () => {
  router.get('/', (req, res) => {
    res.render('layouts/layout', { pageTitle: 'Contact', template: '../contact' });
  });
  return router;
};
