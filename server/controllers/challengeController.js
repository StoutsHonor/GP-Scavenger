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
      name: req.body.name,
      description: req.body.description,
      sequence: req.body.sequence,
      location: req.body.location,
      timeLimit: req.body.timeLimit,
      questionId: req.body.questionId,
      gameId: req.body.gameId,
      questionTypeId: req.body.questionTypeId
    })
    .then( challenge => {
      res.status(201).send(challenge)
    })
    .catch(err => res.status(500).send(`Error adding challenge to database! ${err}`))
  }
}