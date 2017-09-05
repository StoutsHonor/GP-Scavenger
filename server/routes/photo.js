const router = require('express').Router();
const controller = require('../controllers/photoController');

router.get('/findPhoto', controller.findPhoto);
router.post('/addPhoto', controller.addPhoto);

module.exports = router;