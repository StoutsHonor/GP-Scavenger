const db = require('../database/index');

module.exports = {
  getUser: (req, res) => {
    db.User.find( {
      where: {
        username: req.query.username
      }
    })
    .then(user => res.status(200).send(user))
    .catch(err => res.status(500).send(`Error finding username! ${err}`))
  },

  addUser: (req, res) => {
    db.User.findOrCreate({
      where: {
        username: req.body.username,
      },
      defaults: {
        username: req.body.username,
        email: req.body.email
      }
    })
    .then( user => {
      res.status(201).send(user)
    })
    .catch(err => res.status(500).send(`Error adding user to database! ${err}`))
  }
} 