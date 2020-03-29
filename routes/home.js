const express = require('express');

const contactRoute = require('./contact');

const router = express.Router();

module.exports = (params) => {
  const { profileDataService } = params;
  let { cumulativeVisit } = params;

  router.get('/', async (req, res) => {
    if (!req.session.visitcount) {
      req.session.visitcount = 0;
    }

    req.session.visitcount += 1;
    cumulativeVisit += 1;

    // eslint-disable-next-line no-console
    // console.log(`Number of visits: ${req.session.visitcount}, Cumulative Visits: ${cumulativeVisit}`);

    const jsonData = await profileDataService.getProfileData();
    return res.render('layouts/layout', { pageTitle: 'Home', template: '../home' });
    // return res.json(jsonData);
    // res.render('home', { pageTitle: 'Profile' });
  });

  router.use('/contact', contactRoute(params));

  return router;
};
