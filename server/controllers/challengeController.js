const db = require('../database/index');

module.exports = {
  findChallengeByGameId: (req, res) => {
    db.Challenge.findAll({
      where: {
        gameId: req.query.gameId
      }
    })
    .then(challenge => res.status(200).send(challenge))
    .catch(err => res.status(500).send(`Error finding challenge! ${err}`))
  },

  addChallenge: (req, res) => {
    db.Challenge.create({
      name: req.query.name,
      description: req.query.description,
      sequence: req.query.sequence,
      location: req.query.location,
      timeLimit: req.query.timeLimit,
      questionId: req.query.questionId,
      gameId: req.query.gameId,
      questionTypeId: req.query.questionTypeId
    })
    .then( challenge => {
      res.status(201).send(challenge)
    })
    .catch(err => res.status(500).send(`Error adding challenge to database! ${err}`))
  }
}