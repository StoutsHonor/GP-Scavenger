const db = require('../database/index');

module.exports = {
  findGameByUserId: (req, res) => {
    db.Game.findAll({
      where: {
        userId: req.query.userId
      }
    })
    .then(game => res.status(200).send(game))
    .catch(err => res.status(500).send(`Error finding game! ${err}`))
  },

  addGame: (req, res) => {
    console.log('addgame invoked', req.body);
    db.Game.create({
      name: req.body.name,
      userId: req.body.userId,
      duration: req.body.duration,
      maxPlayers: req.body.duration,
      private: req.body.private,
      rewardPoints: req.body.rewardPoints,
      startLocation: req.body.startLocation
    })
    .then( game => {
      res.status(201).send(game)
    })
    .catch(err => res.status(500).send(`Error adding game to database! ${err}`))
  },

  getAllGames: (req,res) => {
    db.Game.findAll().then( (games) => {
      res.status(201).send(games)
    })
  }
} 