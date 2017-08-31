const router = require('express').Router();
const controller = require('../controllers/gameController');

router.get('/findGameByUserId', controller.findGameByUserId)
router.post('/addGame', controller.addGame)
router.get('/getAllGames', controller.getAllGames)

module.exports = router;