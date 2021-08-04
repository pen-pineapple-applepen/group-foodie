import express from 'express';
import path from 'path';
import history from 'connect-history-api-fallback';
import router from './router';

const app = express();
const port = 4000;

app.use(
  history({
    rewrites: [
      {
        from: /^\/api\/.*$/,
        to: function (context) {
          return context.parsedUrl.path;
        },
      },
    ],
  })
);
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use('/api', router);

app.listen(port, (err) => {
  if (err) {
    console.log('error listening on port: ', err);
  } else {
    console.log('listening on port: ', port);
  }
});
