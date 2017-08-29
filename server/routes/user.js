const router = require('express').Router();
const controller = require('../controllers/userController');

router.get('/getUser', controller.getUser)
router.post('/addUser', controller.addUser)

module.exports = router;