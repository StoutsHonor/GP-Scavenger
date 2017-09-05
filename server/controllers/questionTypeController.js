const db = require('../database/index');

module.exports = {
  findQuestionType: (req, res) => {
    db.QuestionType.find({
      where: {
        id: req.query.questionTypeId
      }
    })
    .then(type => res.status(200).send(type))
    .catch(err => res.status(500).send(`Error finding game! ${err}`))
  },

  addQuestionType: (req, res) => {
    db.QuestionType.create({
      type: req.body.type,
      description: req.body.description
    })
    .then( type => {
      res.status(201).send(type)
    })
    .catch(err => res.status(500).send(`Error adding game to database! ${err}`))
  }
} 