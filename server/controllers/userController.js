const db = require('../database/index');

module.exports = {
  getUser: (req, res) => {
    db.User.find({
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
        email: req.query.email,
      },
      defaults: {
        firstName: req.query.firstName,
        lastName: req.query.lastName,
        username: req.query.username,
        email: req.query.email,
        profileDescription: req.query.profileDescription,
        DOB: req.query.DOB
      }
    })
    .then( user => {
      res.status(201).send(user)
    })
    .catch(err => res.status(500).send(`Error adding user to database! ${err}`))
  }
} 