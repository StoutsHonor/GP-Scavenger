const express = require('express');
const parser = require('body-parser');
const routes = require('./routes/index');
// const db = require('./database/db.js');
// const https = require('https');
// const fs = require('fs');

const app = express()
  .use(parser.urlencoded({extended: true}))
  .use(parser.json())
  .use('/api', routes)
  .post('/*', function(req, res) {
    console.log('Server: received POST to /*');
    res.status(201).send('server response to POST to /*');
  });

// app.use(express.static(__dirname + '/client-react'));

// const sslOptions = {
//   key: fs.readFileSync('./server/key.pem'),
//   cert: fs.readFileSync('./server/cert.pem'),
//   requestCert: false,
//   rejectUnauthorized: false
// };

let port = false || 3000;

app.listen(port, function () {
  console.log(`Server: listening on ${port}`);
});

// https.createServer(sslOptions, app).listen(port, function () {
//   console.log(`Server: listening on ${port}`);
// });

