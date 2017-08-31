const router = require('express').Router();
const controller = require('../controllers/chatController');

router.get('/findChat', controller.findChat);
router.post('/addChat', controller.addChat);

module.exports = router;