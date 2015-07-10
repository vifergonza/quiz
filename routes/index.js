var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller.js');
var creditosController = require('../controllers/creditos_controller.js');
var commentController = require('../controllers/comment_controller.js');
var sessionController = require('../controllers/session_controller.js');

console.log('VFG [router]');

/* GET home page. */
router.get('/', function(req, res) {
    console.log('VFG [router, get]');
    res.render('index', {
        title: 'Quiz',
        errors: []
    });
});

//Autoload de preguntas en funcion del parametro :quizId
router.param('quizId', quizController.loadQuiz);
router.param('commentId', commentController.loadComment);

router.get('/quizes', quizController.index);
router.get('/quizes/new', sessionController.isLogged, quizController.new);
router.post('/quizes/new', sessionController.isLogged, quizController.create);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/:quizId(\\d+)/edit', sessionController.isLogged, quizController.new);
router.put('/quizes/:quizId(\\d+)/edit', sessionController.isLogged, quizController.create);
router.delete('/quizes/:quizId(\\d+)/delete', sessionController.isLogged, quizController.delete);

router.get('/quizes/:quizId(\\d+)/comments', commentController.new);
router.post('/quizes/:quizId(\\d+)/comments', commentController.create);
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish', sessionController.isLogged, commentController.publish);

router.get('/author', creditosController.show);

//Enrutamiento de la gestion de session
router.get('/login', sessionController.new);
router.post('/login', sessionController.create);
router.get('/logout', sessionController.destroy);

module.exports = router;
