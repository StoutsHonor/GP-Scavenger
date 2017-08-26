const router = require('express').Router();

router.use('/images', require('./images'))

module.exports = router;