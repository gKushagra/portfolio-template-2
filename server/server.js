const express = require('express');
const path = require('path');
const routes = require('../routes/home');

const app = express();

const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

app.use('/', routes());

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started on port: ${port}`);
});
