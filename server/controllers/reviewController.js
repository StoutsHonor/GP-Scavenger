const db = require('../database/index');

module.exports = {
  findReview: (req, res) => {
    db.Review.findAll({
      where: {
        gameId: req.query.gameId
      }
    })
    .then(reviews => res.status(200).send(reviews))
    .catch(err => res.status(500).send(`Error finding game! ${err}`))
  },

  addReview: (req, res) => {
    db.Review.create({
      type: req.body.type,
      description: req.body.description
    })
    .then(review => res.status(201).send(review))
    .catch(err => res.status(500).send(`Error adding game to database! ${err}`))
  }
} 