const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });

const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {

    const server = express();

    server.use((req, res, next) => {
      if (req.headers['x-forwarded-proto'] === 'http') {
        res.redirect(301, `https://${req.hostname}${req.url}`);
        return;
      }

      res.setHeader('strict-transport-security', 'max-age=31536000; includeSubDomains; preload');
      next();
    });

    server.get('*', (req, res) => handle(req, res));

    server.listen(
      3000,
      error => {
        if (error) throw error;
        console.error('Listening on port 3000');
      }
    );

  })
  .catch(error => {
    console.error(error);
    process.exit(1);
  });