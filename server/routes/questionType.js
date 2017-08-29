const router = require('express').Router();
const controller = require('../controllers/questionTypeController');

router.get('/findQuestionType', controller.findQuestionType)
router.post('/addQuestionType', controller.addQuestionType)

module.exports = router;