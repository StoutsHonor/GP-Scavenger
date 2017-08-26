const router = require('express').Router();
const controller = require('../controllers/imageController');

router.get('/getImages', controller.getImages)
router.post('/postImages', controller.postImages)

module.exports = router;