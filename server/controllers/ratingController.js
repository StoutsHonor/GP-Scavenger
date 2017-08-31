const db = require('../database/index');

module.exports = {
  findRating: (req, res) => {
    db.Rating.findAll({
      where: {
        gameId: req.query.gameId
      }
    })
    .then(ratings => res.status(200).send(ratings))
    .catch(err => res.status(500).send(`Error finding game! ${err}`))
  },

  addRating: (req, res) => {
    db.Rating.create({
      stars: req.body.stars,
      userId: req.body.userId,
      gameId: req.body.gameId
    })
    .then(rating => res.status(201).send(rating))
    .catch(err => res.status(500).send(`Error adding game to database! ${err}`))
  }
} 