const Sequelize = require('sequelize')
const db_url = require('./config')

const sequelize = new Sequelize(db_url)

sequelize
  .authenticate()
  .then( () => { console.log('Connection has been established successfully.')})
  .catch( (err) => { console.error('Unable to connect to the database: ', err) })


const User = sequelize.define('user', {
  first_name: { type: Sequelize.STRING },
  last_name: { type: Sequelize.STRING },
  email: { type: Sequelize.STRING },
  username: { type: Sequelize.STRING },
  profile_description: { type: Sequelize.STRING },
  DOB: { type: Sequelize.DATEONLY },
  friends: {type: Sequelize.ARRAY(Sequelize.INTEGER) }
})


const Image = sequelize.define('image', {
  image_url: { type: Sequelize.STRING },
  image_description: { type: Sequelize.STRING },
  total_downloads: { type: Sequelize.INTEGER }
})


const Album = sequelize.define('album', {
  album_name: { type: Sequelize.STRING }
})


const Marker = sequelize.define('marker', {
  longitude: { type: Sequelize.FLOAT },
  latitude: { type: Sequelize.FLOAT }
  
})


const Like = sequelize.define('like', {
})


const Tag = sequelize.define('tag', {
  tag_name: { type: Sequelize.STRING }
})


const Comment = sequelize.define('comment', {
  comment: { type: Sequelize.STRING }
})


const FriendConnection = sequelize.define('friend_connection', {
})

Comment.belongsTo(User) 
Image.hasMany(Comment) 
Like.belongsTo(User) 
Marker.belongsTo(Image)
Image.hasOne(Marker)
Image.hasMany(Like)
Image.belongsTo(User)
Image.hasMany(Tag)
Image.hasMany(Album)

User.belongsToMany(User, { as: 'user', through: 'friend_connection', foreignKey: 'userId' })
User.belongsToMany(User, { as: 'my_friends', through: 'friend_connection', foreignKey: 'friends' })

sequelize.sync( { force: false} )

module.exports = {
  User,
  Image,
  Album,
  Marker,
  Like,
  Tag,
  Comment,
  FriendConnection,
  sequelize
}