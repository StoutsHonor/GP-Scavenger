const db = require('../database/index');
const Sequelize = require('sequelize');

module.exports = {
  findUser: (req, res) => {
    console.log('findUser: req.query: ', req.query)
    db.User.find({
      where: {
        $or: [
          {email: {$eq: req.query.email}}
        ]
      }
    })
    .catch(err => res.status(500).send(`Error finding username! ${err}`))
    .then(user => res.status(200).send(user))
  },

  findAllUserPoints: (req, res) => {
    db.User.findAll()
    .catch(err => res.status(500).send(`Error finding data! ${err}`))
    .then(data => res.status(200).send(data))
  },

  findUserPoints: (req, res) => {
      db.User.find(
      {
      where: {email: req.query.email}
    })
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
  },

  updateRewardPoints: (req, res) => {
    console.log(req.body, 'this is req.body')
    db.User.update(
      {rewardPoints: req.body.rewardPoints},
      {where: {email: req.body.email}}
    )
    .then( user => {
      res.status(201).send(user)
    })
    .catch(err => res.status(500).send(`Error updating reward points to database! ${err}`))
  },

  updateFriendsList: (req, res) => {
    db.User.update(
      {'friends': Sequelize.fn('array_append', Sequelize.col('friends'), req.body.friends)},
      {where: {email: req.body.email}}
    )
    .then( user => {
      res.status(201).send(user)
    })
    .catch(err => res.status(500).send(`Error updating friend list to database! ${err}`))
  },
  updateRecentlyPlayedWithList: (req, res) => {
    db.User.update(
      {'RecentlyPlayedWith': Sequelize.fn('array_cat', Sequelize.col('RecentlyPlayedWith'), req.body.RecentlyPlayedWith)},
      {where: {email: req.body.email}}
    )
    .then( user => {
      res.status(201).send(user)
    })
    .catch(err => res.status(500).send(`Error updating recently play with list to database! ${err}`))
    
  }
} 