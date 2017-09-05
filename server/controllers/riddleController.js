const db = require('../database/index');

module.exports = {
  findRiddle: (req, res) => {
    db.Riddle.find({
      where: {
        id: req.query.id
      }
    })
    .then(riddle => res.status(200).send(riddle))
    .catch(err => res.status(500).send(`Error finding game! ${err}`))
  },

  addRiddle: (req, res) => {
    // console.log('addRiddle: req.body: ', req.body);
    db.Riddle.create({
      question: req.body.question,
      answer: req.body.answer,
      difficulty: req.body.difficulty,
      default: req.body.default
    })
    .then( riddle => {
      res.status(201).send(riddle)
    })
    .catch(err => res.status(500).send(`Error adding game to database! ${err}`))
  }
}