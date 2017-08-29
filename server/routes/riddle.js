const router = require('express').Router();
const controller = require('../controllers/riddleController');

router.get('/findRiddle', controller.findRiddle)
router.post('/addRiddle', controller.addRiddle)

module.exports = router;