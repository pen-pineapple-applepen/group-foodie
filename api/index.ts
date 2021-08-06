import 'reflect-metadata';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import history from 'connect-history-api-fallback';
import 'dotenv/config';
import router from './router';

// Container.set('DATABASE_ACCESS', db);

const app = express();
const port = process.env.PORT || 4000;

app.use(
  history({
    rewrites: [
      {
        from: /^\/api\/.*$/,
        to: function (context) {
          return context.parsedUrl.path!;
        },
      },
    ],
  })
);
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use('/api', router);

app.listen(port, () => {
  console.log('listening on port: ', port);
});
