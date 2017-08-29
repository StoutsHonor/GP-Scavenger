const Sequelize = require('sequelize')
const db_url = require('./config')

const sequelize = new Sequelize(db_url)

sequelize
  .authenticate()
  .then( () => { console.log('Connection has been established successfully.')})
  .catch( (err) => { console.error('Unable to connect to the database: ', err) })


const User = sequelize.define('user', {
  firstName: { type: Sequelize.STRING },
  lastName: { type: Sequelize.STRING },
  email: { type: Sequelize.STRING },
  username: { type: Sequelize.STRING },
  profileDescription: { type: Sequelize.STRING },
  DOB: { type: Sequelize.DATEONLY },
  friends: {type: Sequelize.ARRAY(Sequelize.INTEGER) }
})

const Game = sequelize.define('game', {
  name: { type: Sequelize.STRING, allowNull: false },
  duration: { type: Sequelize.INTEGER },
  private: { type: Sequelize.BOOLEAN},
  maxPlayers: { type: Sequelize.INTEGER, allowNull: false },
  rewardPoints: { type: Sequelize.INTEGER, allowNull: false}
})

const Challenge = sequelize.define('challenge', {
  name: { type: Sequelize.STRING, allowNull: false },
  description: { type: Sequelize.STRING, allowNull: false },
  sequence: { type: Sequelize.INTEGER, allowNull: false },
  location: { type: Sequelize.STRING, allowNull: false },
  timeLimit: { type: Sequelize.INTEGER },
  questionId: { type: Sequelize.INTEGER, allowNull: false }
})

const QuestionType = sequelize.define('questionType', {
  description: { type: Sequelize.STRING, allowNull: false }
})

const Riddle = sequelize.define('riddle', {
  question: { type: Sequelize.STRING, allowNull: false },
  answer: { type: Sequelize.STRING, allowNull: false },
  difficulty: { type: Sequelize.STRING },
  image_URL: { type: Sequelize.STRING }
})

const Camera = sequelize.define('camera', {
  prompt: { type: Sequelize.STRING, allowNull: false }
})

const Compass = sequelize.define('compass', {
  prompt: { type: Sequelize.STRING, allowNull: false }
})

const Rating = sequelize.define('rating', {
  stars: { type: Sequelize.INTEGER, allowNull: false },
})

const Review = sequelize.define('review', {
  comment: { type: Sequelize.STRING, allowNull: false },
})


// const FriendConnection = sequelize.define('friend_connection', {
// })

User.hasMany(Game);
Game.belongsTo(User);

User.hasMany(Rating);
Rating.belongsTo(User);

User.hasMany(Review);
Review.belongsTo(User);

Game.hasMany(Challenge);
Challenge.belongsTo(Game);

Game.hasMany(Rating);
Rating.belongsTo(Game);

Game.hasMany(Review);
Review.belongsTo(Game);

QuestionType.hasOne(Challenge);

// User.belongsToMany(User, { as: 'user', through: 'friend_connection', foreignKey: 'userId' })
// User.belongsToMany(User, { as: 'my_friends', through: 'friend_connection', foreignKey: 'friends' })

sequelize.sync( { force: false} )

module.exports = {
  User,
  Game,
  Challenge,
  QuestionType,
  Riddle,
  Camera,
  Compass,
  Rating,
  Review,
  //FriendConnection,
  sequelize
}