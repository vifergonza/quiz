var model = require('../models/models.js');

//Autoload por el parametro :quizId
exports.loadQuiz = function(req, res, next, quizId) {
    model.quiz.findById(quizId).then(function(quiz) {
        if (quiz) {
            req.quiz = quiz;
            next();
        } else {
            next(new Error("No se encontro la pregunta con el codigo: " + quizId));
        }
    }).catch(function(error) {
        next(error);
    });
};

///quizes
exports.index = function(req, res) {
    model.quiz.findAll().then(function(quizes) {
        res.render('quizes/index', {
            preguntas: quizes,
            title: 'Quizes'
        });
    }).catch(function(error) {
        next(error);
    });
};

///quizes/:quizId(\\d+)
exports.show = function(req, res) {
    res.render('quizes/show', {
        pregunta: req.quiz,
        title: 'Quizes'
    });
};

///quizes/:quizId(\\d+)/answer
exports.answer = function(req, res) {
    if (req.quiz.respuesta === req.query.respuesta) {
        res.render('quizes/answer', {
            pregunta: req.quiz,
            respuesta: 'Correcta',
            title: 'Quizes'
        });
    } else {
        res.render('quizes/answer', {
            pregunta: req.quiz,
            respuesta: 'Incorrecta',
            title: 'Quizes'
        });
    }

};
