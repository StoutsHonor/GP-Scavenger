const router = require('express').Router();
const controller = require('../controllers/videoController');

router.get('/findVideo', controller.findVideo);
router.post('/addVideo', controller.addVideo);

module.exports = router;