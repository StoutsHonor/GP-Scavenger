const db = require('../database/index');

module.exports = {
  findUser: (req, res) => {
    db.User.find({
      where: {
        username: req.query.username
      }
    })
    .then(user => res.status(200).send(user))
    .catch(err => res.status(500).send(`Error finding username! ${err}`))
  },

  findAllUserPoints: (req, res) => {
    db.User.findAll()
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send(`Error finding data! ${err}`))
  },

  addUser: (req, res) => {
    db.User.findOrCreate({
      where: {
        email: req.body.email,
      },
      defaults: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        email: req.body.email,
        profileDescription: req.body.profileDescription,
        DOB: req.body.DOB,
        rewardPoints: 0
      }
    })
    .then( user => {
      res.status(201).send(user)
    })
    .catch(err => res.status(500).send(`Error adding user to database! ${err}`))
  }
} 