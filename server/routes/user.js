const router = require('express').Router();
const controller = require('../controllers/userController');

router.get('/getUser', controller.getUser)
router.post('/postUser', controller.addUser)

module.exports = router;