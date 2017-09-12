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

const activeLobbies = []
const activeGames = {}

websocket.on('connection', (socket) => {

  socket.on('createRoom', (room) => {
    socket.join(room);
    websocket.sockets.in(room).emit('joinLobby');
  });

  socket.on('startedANewRoom', (game) => {
    activeLobbies.unshift(game);
    console.log(`activeLobbies is now ${JSON.stringify(activeLobbies)}`);

  })

  socket.on('message', (message) => { 
    websocket.sockets.in(message.roomName).emit('message', message);
  });

  socket.on('updateOtherPlayer', (message) => { 
    websocket.sockets.in(message.roomName).emit('updateOtherPlayer', message);
  });

  socket.on('getOtherUserName', (message) => { 
    websocket.sockets.in(message.roomName).emit('getOtherUserName', message);
  });

  socket.on('startGame', (message, team1, team2) => { 
    websocket.sockets.in(message).emit('startGame');
    const index = activeLobbies.findIndex( (e,i) => e.roomId === message );
    if (index > -1) {
      const startedGame = activeLobbies.splice(index,1)[0];
      startedGame.players = {};
      for (let i = 0; i < team1.length; i++) {
        startedGame.players[team1[i]] = {latitude: startedGame.startLocation[0], longitude: startedGame.startLocation[1], userId: team1[i] }
      }
      for (let i = 0; i < team2.length; i++) {
        startedGame.players[team2[i]] = {latitude: startedGame.startLocation[0], longitude: startedGame.startLocation[1], userId: team2[i] }
      }
      activeGames[startedGame.roomId] = startedGame;
      console.log(`activeGames is ${JSON.stringify(activeGames)}`)
      console.log(`activeLobbies is now ${JSON.stringify(activeLobbies)}`)
    }
  });

  socket.on('congratsPage', (message) => { 
    websocket.sockets.in(message.gameName).emit('congratsPage', message.team);
  });

  socket.on('loserPage', (message) => {
    websocket.sockets.in(message.gameName).emit('loserPage', message);
  });

  socket.on('congratsNext', (message) => { 
    websocket.sockets.in(message.gameName).emit('congratsNext', message.team);
  });

  socket.on('listJoinGames', () => {
    websocket.sockets.emit('listJoinGames', activeLobbies)
  });

  socket.on('leaveGame', (message) => {
    websocket.sockets.in(message.roomName).emit('removePlayer', message.userId)
  });
  
  socket.on('updatePlayerLocation', (playerInfo) => {
    activeGames[playerInfo.gameName].players[playerInfo.userId] = { latitude: playerInfo.latitude, longitude: playerInfo.longitude, userId: playerInfo.userId};
    console.log(`activeGames is ${JSON.stringify(activeGames)}`);
    const playersLocations = activeGames[playerInfo.gameName].players;
    websocket.sockets.emit('updatePlayersLocation', playersLocations);
  })

});