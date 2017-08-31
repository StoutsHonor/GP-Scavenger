const router = require('express').Router();
const controller = require('../controllers/reviewController');

router.get('/findReview', controller.findReview)
router.post('/addReview', controller.addReview)

module.exports = router;