const router = require('express').Router();
const controller = require('../controllers/guessPhotoController');

router.get('/findPhoto', controller.findPhoto);
router.post('/addPhoto', controller.addPhoto);

module.exports = router;