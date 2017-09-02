// INITIALIZE DB FIRST WITH "node ./db/index"
// THEN run "node ./db/seed"

const db = require("./index");
const userSeed = require("./seed/user");
const gameSeed = require("./seed/game");
const challengeSeed = require("./seed/challenge");
const questionTypeSeed = require("./seed/questionType");
const riddleSeed = require("./seed/riddle");
const ratingSeed = require("./seed/rating");
const logicPuzzleSeed = require("./seed/logicPuzzle");
//const friendConnectionSeed = require('./seed/friendConnection')

// db.sequelize.sync({force: true}).then( () => {
//   db.User.bulkCreate(userSeed).then( () => {
//     db.QuestionType.bulkCreate(questionTypeSeed).then(() => {
//       db.Riddle.bulkCreate(riddleSeed).then(() => {
//         db.Game.bulkCreate(gameSeed).then(() => {
//           db.Challenge.bulkCreate(challengeSeed).then(() => {
//             db.Rating.bulkCreate(ratingSeed).then(() => {
//               db.Review.bulkCreate(reviewSeed).then(() => {
//                 db.LogicPuzzle.bulkCreate(logicPuzzleSeed)
//               })
//             })
//           })
//         })
//       })
//     })
//   })
// }).catch(err => console.log(`Error seeding database!, ${err}`))

db.sequelize.sync({ force: true }).then(() => {
    db.User.bulkCreate(userSeed).then(() => {
      db.QuestionType.bulkCreate(questionTypeSeed).then(() => {
        db.Challenge.bulkCreate(challengeSeed).then(() => {
          db.Game.bulkCreate(gameSeed).then(() => {
            db.Rating.bulkCreate(ratingSeed).then(() => {
              db.Riddle.bulkCreate(riddleSeed).then(() => {
                db.LogicPuzzle.bulkCreate(logicPuzzleSeed);
              });
            });
          });
        });
      });
    });
  })
  .catch(err => console.log(`Error seeding database!, ${err}`));
