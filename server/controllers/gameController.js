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
      name: req.body.name,
      userId: req.body.userId,
      duration: req.body.duration,
      maxPlayers: req.body.duration,
      private: req.body.private,
      rewardPoints: req.body.rewardPoints
    })
    .then( game => {
      res.status(201).send(game)
    })
    .catch(err => res.status(500).send(`Error adding game to database! ${err}`))
  }
} 