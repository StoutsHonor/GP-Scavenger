const Sequelize = require('sequelize')
const db_url = require('./config')

const sequelize = new Sequelize(db_url, {
  dialect: 'postgres'
});

// sequelize
//   .authenticate()
//   .then( () => { 
//     console.log('Connection has been established successfully.')})
//   .catch( (err) => { console.error('Unable to connect to the database: ', err) })


const User = sequelize.define('user', {
  firstName: { type: Sequelize.STRING },
  lastName: { type: Sequelize.STRING },
  email: { type: Sequelize.STRING },
  username: { type: Sequelize.STRING },
  profilePicture: { type: Sequelize.STRING },
  profileDescription: { type: Sequelize.STRING },
  rewardPoints: {type: Sequelize.INTEGER },
  DOB: { type: Sequelize.DATEONLY },
  friends: {type: Sequelize.ARRAY(Sequelize.INTEGER), allowedNull: true}
});

const Game = sequelize.define('game', {
  name: { type: Sequelize.STRING, allowNull: false },
  duration: { type: Sequelize.INTEGER },
  private: { type: Sequelize.BOOLEAN},
  maxPlayers: { type: Sequelize.INTEGER, allowNull: false },
  rewardPoints: { type: Sequelize.INTEGER, allowNull: false},
  startLocation: { type: Sequelize.ARRAY(Sequelize.FLOAT), allowNull: false }
});

const Challenge = sequelize.define('challenge', {
  name: { type: Sequelize.STRING, allowNull: false },
  description: { type: Sequelize.STRING, allowNull: false },
  sequence: { type: Sequelize.INTEGER, allowNull: false },
  location: { type: Sequelize.ARRAY(Sequelize.FLOAT) },
  timeLimit: { type: Sequelize.INTEGER },
  questionId: { type: Sequelize.INTEGER }
});

const QuestionType = sequelize.define('questionType', {
  type: {type: Sequelize.STRING, allowNull: false},
  description: { type: Sequelize.STRING}
});

const Chat = sequelize.define('chat', {
  user_id: { type: Sequelize.INTEGER, allowNull: false },
  createdAt: { type: Sequelize.STRING, allowNull: false },
  _id: { type: Sequelize.STRING, allowNull: false },
  roomName:  { type: Sequelize.STRING, allowNull: false },
  text:  { type: Sequelize.STRING, allowNull: false },
  image:  { type: Sequelize.STRING, allowNull: false }
});

const Rating = sequelize.define('rating', {
  stars: { type: Sequelize.INTEGER, allowNull: false },
  comment: { type: Sequelize.STRING, allowNull: false }
});

const Camera = sequelize.define('camera', {
  prompt: { type: Sequelize.STRING, allowNull: false },
  default: {type: Sequelize.BOOLEAN },
  image_URL: { type: Sequelize.STRING }
});

const Compass = sequelize.define('compass', {
  prompt: { type: Sequelize.STRING, allowNull: false },
  default: { type: Sequelize.BOOLEAN }
});

const Riddle = sequelize.define('riddle', {
  title: { type: Sequelize.STRING, allowNull: false },
  question: { type: Sequelize.STRING, allowNull: false },
  answer: { type: Sequelize.STRING, allowNull: false },
  difficulty: { type: Sequelize.STRING },
  default: { type: Sequelize.BOOLEAN },
  imageURL: { type: Sequelize.STRING }
});

const LogicPuzzle = sequelize.define('logicPuzzle', {
  title: { type: Sequelize.STRING, allowNull: false },
  question: { type: Sequelize.STRING, allowNull: false },
  answer: { type: Sequelize.STRING, allowNull: false },
  difficulty: { type: Sequelize.STRING },
  default: { type: Sequelize.BOOLEAN },
  imageURL: { type: Sequelize.STRING }
});

const Photo = sequelize.define('photo', {
  title: { type: Sequelize.STRING, allowNull: false },
  instruction: { type: Sequelize.STRING, allowNull: false },
  difficulty: { type: Sequelize.STRING },
  default: { type: Sequelize.BOOLEAN }
});

const Video = sequelize.define('video', {
  title: { type: Sequelize.STRING, allowNull: false },
  question: { type: Sequelize.STRING, allowNull: false },
  link: { type: Sequelize.STRING, allowNull: false },
  answer: { type: Sequelize.STRING, allowNull: false },
  difficulty: { type: Sequelize.STRING },
  default: { type: Sequelize.BOOLEAN }
});

const GuessPhoto = sequelize.define('guessPhoto', {
  title: { type: Sequelize.STRING, allowNull: false },
  question: { type: Sequelize.STRING, allowNull: false },
  imageURL: { type: Sequelize.STRING, allowNull: false },
  answer: { type: Sequelize.STRING, allowNull: false },
  difficulty: { type: Sequelize.STRING },
  default: { type: Sequelize.BOOLEAN }
});


User.hasMany(Game);
Game.belongsTo(User);

User.hasMany(Chat);
Chat.belongsTo(User);

User.hasMany(Rating);
Rating.belongsTo(User);

Game.hasMany(Challenge);
Challenge.belongsTo(Game);

Game.hasMany(Rating);
Rating.belongsTo(Game);

QuestionType.hasMany(Challenge);
Challenge.belongsTo(QuestionType);


sequelize.sync( {force: false});

module.exports = {
  User,
  Game,
  Challenge,
  QuestionType,
  Riddle,
  LogicPuzzle,
  Camera,
  Compass,
  Rating,
  sequelize,
  Chat,
  Photo,
  Video,
  GuessPhoto
}