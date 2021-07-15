const express = require('express');
const path = require('path');
const router = require('./router');
const port = 4000;
const app = express();
const history = require('connect-history-api-fallback');

app.use(express.json());
app.use(history());
app.use(express.static(path.join(__dirname, '../../public')));

app.use('/', router);

app.listen(port, (err) => {
  if (err) {
    console.log('error listening on port: ', err);
  } else {
    console.log('listening on port: ', port);
  }
})