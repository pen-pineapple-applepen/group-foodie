const express = require('express');
const path = require('path');
const router = require('./router');
const port = 4000;
const app = express();
const history = require('connect-history-api-fallback');

app.use(history({
  rewrites: [
    {
      from: /^\/api\/.*$/,
      to: function(context) {
        return context.parsedUrl.path
      }
    }
  ]
}))
app.use(express.json());
app.use(express.static(path.join(__dirname, '../../public')));
app.use('/api', router);


app.use(history());

app.listen(port, (err) => {
  if (err) {
    console.log('error listening on port: ', err);
  } else {
    console.log('listening on port: ', port);
  }
})