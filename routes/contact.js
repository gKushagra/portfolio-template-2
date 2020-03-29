const express = require('express');
const { check, validationResult } = require('express-validator');

const router = express.Router();

module.exports = (params) => {
  const { contactService } = params;

  router.get('/', (req, res, next) => {
    try {
      const errors = req.session.feedback ? req.session.feedback.errors : false;
      const successMessage = req.session.feedback ? req.session.feedback.message : false;
      req.session.feedback = {};

      return res.render('layouts/layout', {
        pageTitle: 'Contact',
        template: '../contact',
        errors,
        successMessage,
      });
    } catch (error) {
      return next(error);
    }
  });

  router.post(
    '/',
    [
      check('name').trim().isLength({ min: 3 }).escape().withMessage('A name is required!'),
      check('email').trim().isEmail().normalizeEmail().withMessage('An email is required!'),
      check('title').trim().isLength({ min: 3 }).escape().withMessage('A title is required!'),
      check('message').trim().isLength({ min: 5 }).escape().withMessage('Empty message!'),
    ],
    async (req, res) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        req.session.feedback = {
          errors: errors.array(),
        };
        return res.redirect('/contact');
      }

      const { name, email, title, message } = req.body;
      await contactService.addEntry(name, email, title, message);
      req.session.feedback = {
        message: 'Thank you for contacting! Will reach out soon.',
      };
      return res.redirect('/contact');
    }
  );

  return router;
};
