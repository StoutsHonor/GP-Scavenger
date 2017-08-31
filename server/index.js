const express = require('express');
const parser = require('body-parser');
const routes = require('./routes/index');
const http = require('http');
const socketio = require('socket.io');

const db = require('./database');
// const db = require('./database/db.js');
// const https = require('https');
// const fs = require('fs');

const app = express();

app.use(parser.urlencoded({extended: true}))
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

const server = http.Server(app);
const websocket = socketio(server);
server.listen(port, function () {
  console.log(`Server: listening on ${port}`);
});

// https.createServer(sslOptions, app).listen(port, function () {
//   console.log(`Server: listening on ${port}`);
// });



// Mapping objects to easily map sockets and users.
var clients = {};
var users = {};

// This represents a unique chatroom.
// For this example purpose, there is only one chatroom;
var chatId = 1;
let send_messages = [];

websocket.on('connection', (socket) => {

    socket.on('createRoom', roomName => {
      socket.join(roomName);
    });
  
    //socket.on('userJoined', (userId) => onUserJoined(userId, socket));
    socket.on('message', (message) => {
      //onMessageReceived(message, socket)
      socket.in(message.roomName).emit('message', message);
      //socket.in('room2').emit('message', message);
    });
});

// Event listeners.
// When a user joins the chatroom.
function onUserJoined(userId, socket) {
 
  users[socket.id] = userId;
  _sendExistingMessages(socket);
    
  
  
}

// When a user sends a message in the chatroom.
function onMessageReceived(message, senderSocket) {
  console.log('Socket received message ', message);

  senderSocket.emit('message', [message]);
}


var stdin = process.openStdin();
stdin.addListener('data', function(d) {
  let val = { 
    _id: Math.round(Math.random() * 1000000),
    text: d.toString().trim(),
    user: {
            _id: 2,
            name: 'React Native'
          },
    createdAt: new Date(),    
  };
  send_messages.push(val);
  websocket.emit('message', val);
  //onMessageReceived({ message: d.toString().trim() }, socket);
  
});



