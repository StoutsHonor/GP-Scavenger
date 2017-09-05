const db = require('../database/index');

module.exports = {
  findVideo: (req, res) => {
    db.Video.find({
      where: {
        id: req.query.id
      }
    })
    .then(riddle => res.status(200).send(riddle))
    .catch(err => res.status(500).send(`Error finding game! ${err}`))
  },

  addVideo: (req, res) => {
    db.Video.create({
      title: req.body.title,
      question: req.body.question,
      link: req.body.link,
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