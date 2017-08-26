// INITIALIZE DB FIRST WITH "node ./db/index" 
// THEN run "node ./db/seed"

const db = require('./index')
const userSeed = require('./seed/user')
const imageSeed = require('./seed/image')
// const albumSeed = require('./seed/album')
// const markerSeed = require('./seed/marker')
// const likeSeed = require('./seed/tag')
// const tagSeed = require('./seed/tag')
// const commentSeed = require('./seed/comment')
// const friendConnectionSeed = require('./seed/friendConnection')


db.sequelize.sync({force: false}).then( () => {
  db.User.bulkCreate(userSeed).then( () => {
    db.Image.bulkCreate(imageSeed)
  })
})