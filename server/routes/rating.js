const router = require('express').Router();
const controller = require('../controllers/ratingController');

router.get('/findRating', controller.findRating)
router.post('/addRating', controller.addRating)

module.exports = router;