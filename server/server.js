const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');
const routes = require('../routes/home');
const ProfileDataService = require('../services/ProfileDataService');

const profileDataService = new ProfileDataService(
  path.join(__dirname, '../files/profileData.json')
);

const app = express();

const port = 3000;
let cumulativeVisit = 0;

app.use(express.static(path.join(__dirname, '../static')));

app.set('trust proxy', 1);

app.use(
  cookieSession({
    name: 'session',
    keys: ['Ronaldo1234', 'Michael11209'],
  })
);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

app.use(async (req, res, next) => {
  try {
    const profileInfo = await profileDataService.getProfileData();
    res.locals.profileInformation = profileInfo;
    console.log(res.locals);
    return next();
  } catch (error) {
    return next(error);
  }
});

app.use(
  '/',
  routes({
    profileDataService,
    cumulativeVisit,
  })
);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started on port: ${port}`);
});
