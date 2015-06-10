var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller.js');

console.log('VFG [router]');

/* GET home page. */
router.get('/', function(req, res) {
  console.log('VFG [router, get]');
  res.render('index', { title: 'Quiz' });
});

router.get('/quizes/question', quizController.question);
router.get('/quizes/answer', quizController.answer);

module.exports = router;
