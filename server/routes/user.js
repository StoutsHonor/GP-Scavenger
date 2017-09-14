const router = require('express').Router();
const controller = require('../controllers/userController');

router.get('/findUser', controller.findUser)
router.get('/findAllUserPoints', controller.findAllUserPoints)
router.get('/findUserPoints', controller.findUserPoints)
router.post('/addUser', controller.addUser)
router.post('/updateRewardPoints', controller.updateRewardPoints)
router.put('/updateFriendsList', controller.updateFriendsList)
router.put('/updateRecentlyPlayedWithList', controller.updateRecentlyPlayedWithList)

module.exports = router;