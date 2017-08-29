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
    db.Game.create({
      name: req.query.name,
      userId: req.query.userId,
      duration: req.query.duration,
      maxPlayers: req.query.duration,
      private: req.query.private,
      rewardPoints: req.query.rewardPoints
    })
    .then( game => {
      res.status(201).send(game)
    })
    .catch(err => res.status(500).send(`Error adding game to database! ${err}`))
  }
} 