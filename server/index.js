const express = require('express');
const parser = require('body-parser');
const routes = require('./routes/index');
const http = require('http');
const socketio = require('socket.io');

const db = require('./database');

const app = express();

app.use(parser.urlencoded({extended: true}))
   .use(parser.json())
   .use('/api', routes)
   .post('/*', function(req, res) {
    console.log('Server: received POST to /*');
    res.status(201).send('server response to POST to /*');
  });

let port = 3000;

const server = http.Server(app);
const websocket = socketio(server);
server.listen(port, function () {
  console.log(`Server: listening on ${port}`);
});


websocket.on('connection', (socket) => {

  socket.on('createRoom', (message) => {
    socket.join(message);
    websocket.sockets.in(message).emit('joinLobby');
  });
 
  socket.on('message', (message) => { 
    websocket.sockets.in(message.roomName).emit('message', message);
  });

  socket.on('updateOtherPlayer', (message) => { 
    websocket.sockets.in(message.roomName).emit('updateOtherPlayer', message);
  });

  socket.on('getOtherUserName', (message) => { 
    websocket.sockets.in(message.roomName).emit('getOtherUserName', message);
  });

  socket.on('startGame', (message) => { 
    websocket.sockets.in(message).emit('startGame');
  });

  socket.on('congratsPage', (message) => { 
    websocket.sockets.in(message.gameName).emit('congratsPage', message.team);
  });

  socket.on('congratsNext', (message) => { 
    websocket.sockets.in(message.gameName).emit('congratsNext', message.team);
  });

  
});





