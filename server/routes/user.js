const router = require('express').Router();
const controller = require('../controllers/userController');

router.get('/findUser', controller.findUser)
router.get('/findAllUserPoints', controller.findAllUserPoints)
router.post('/addUser', controller.addUser)

module.exports = router;