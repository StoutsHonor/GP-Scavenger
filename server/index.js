const express = require('express');
const parser = require('body-parser');
// const db = require('./database/db.js');
// const https = require('https');
// const fs = require('fs');

app = express();

app.use(parser.urlencoded({extended: true}));
app.use(parser.json());

// app.use(express.static(__dirname + '/client-react'));


app.get('/images', function(req, res) {
  console.log('Server: receievd GET to /users');
  // console.log('Server: req.body:', req.body);
  // console.log('Server: req.params:', req.params);
  console.log('Server: req.query:', req.query);

  res.status(200).send('server response to GET to /images');
})

app.post('/images', function(req, res) {
  console.log('Server: received POST to /users');
  console.log('Server: req.body:', req.body);
  // console.log('Server: req.params:', req.params);
  // console.log('Server: req.query:', req.query);

  res.status(201).send('server response to POST to /images');
})

app.post('/*', function(req, res) {
  console.log('Server: received POST to /*');
  console.log('Server: req.body:', req.body);
  // console.log('Server: req.params:', req.params);
  // console.log('Server: req.query:', req.query);

  res.status(201).send('server response to POST to /*');
})


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

