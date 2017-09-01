const db = require('../database/index');

module.exports = {
  findChat: (req, res) => {
    db.Chat.findAll({
      where: {
        roomName: req.query.roomName
      }
    })
    .then(chat => res.status(200).send(chat))
    .catch(err => res.status(500).send(`Error finding challenge! ${err}`))
  },

  addChat: (req, res) => {
    db.Chat.create({
      user_id: req.body.user._id,
      createdAt: req.body.createdAt,
      _id: req.body._id,
      roomName: req.body.roomName,
      text: req.body.text,
      image: req.body.image
    })
    .then( chat => {
      res.status(201).send(chat)
    })
    .catch(err => res.status(500).send(`Error adding challenge to database! ${err}`))
  }
}