// INITIALIZE DB FIRST WITH "node ./db/index"
// THEN run "node ./db/seed"

const db = require("./index");
const userSeed = require("./seed/user");
const gameSeed = require("./seed/game");
const challengeSeed = require("./seed/challenge");
const questionTypeSeed = require("./seed/questionType");
const ratingSeed = require("./seed/rating");


const riddleSeed = require("./seed/questionType/riddle");
const logicPuzzleSeed = require("./seed/questionType/logicPuzzle");
const photoSeed =  require("./seed/questionType/photo");
const videoSeed =  require("./seed/questionType/video");
const guessPhoto =  require("./seed/questionType/guessPhoto");


// db.sequelize.sync({ force: true }).then(() => {
//   db.Riddle.bulkCreate(riddleSeed).then(() => {
//     db.LogicPuzzle.bulkCreate(logicPuzzleSeed).then(() => {
//       db.Photo.bulkCreate(photoSeed).then(() => {
//         db.User.bulkCreate(userSeed).then(() => {
//           db.QuestionType.bulkCreate(questionTypeSeed).then(() => {
//             db.Game.bulkCreate(gameSeed).then(() => {
//               db.Challenge.bulkCreate(challengeSeed).then(() => {
//                 db.Rating.bulkCreate(ratingSeed);
//               });
//             });
//           });
//         });
    
//       });
//     });
//   });
// }).catch(err => console.log(`Error seeding database!, ${err}`));

db.sequelize.sync({ force: true })
.then(() => db.User.bulkCreate(userSeed))
.then(() => db.Game.bulkCreate(gameSeed))
.then( () => db.Riddle.bulkCreate(riddleSeed))
.then( () => db.LogicPuzzle.bulkCreate(logicPuzzleSeed))
.then(() => db.Photo.bulkCreate(photoSeed))
.then(() => db.Video.bulkCreate(videoSeed))
.then(() => db.GuessPhoto.bulkCreate(guessPhoto))
.then(() => db.QuestionType.bulkCreate(questionTypeSeed))
.then(() => db.Rating.bulkCreate(ratingSeed))
.then(() => db.Challenge.bulkCreate(challengeSeed))
.catch(err => console.log(err))
