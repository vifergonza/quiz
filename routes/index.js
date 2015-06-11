var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller.js');
var creditosController = require('../controllers/creditos_controller.js');


console.log('VFG [router]');

/* GET home page. */
router.get('/', function(req, res) {
  console.log('VFG [router, get]');
  res.render('index', { title: 'Quiz' });
});

router.get('/quizes/question', quizController.question);
router.get('/quizes/answer', quizController.answer);

router.get('/author', creditosController.show);

module.exports = router;
