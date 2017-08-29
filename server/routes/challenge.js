const router = require('express').Router();
const controller = require('../controllers/challengeController');

router.get('/findChallengeByGameId', controller.findChallengeByGameId)
router.post('/addChallenge', controller.addChallenge)

module.exports = router;