var model = require('../models/models.js');

///quizes
exports.index = function(req, res) {
    model.quiz.findAll().then(function(quizes) {
        console.log("Entrando en quiz_controller.index,");
        for ( i=0; i<quizes.length; i++) {
            console.log("---------------------------------------------------------");
            console.log(i+"--------------------------------------------------------");
            console.log("---------------------------------------------------------");
            console.log(quizes[i].id+" - "+quizes[i].pregunta+" - "+quizes[i].respuesta);    
        }
        res.render('quizes/index', {
            preguntas: quizes,
            title: 'Quizes'
        });
    });
};

///quizes/:quizId(\\d+)
exports.show = function(req, res) {
    model.quiz.findById(req.params.quizId).then(function(quiz) {
        res.render('quizes/show', {
            pregunta: quiz,
            title: 'Quizes'
        });
    });
};

///quizes/:quizId(\\d+)/answer
exports.answer = function(req, res) {
    model.quiz.findById(req.params.quizId).then(function(quiz) {
        if (quiz.respuesta === req.query.respuesta) {
            res.render('quizes/answer', {
                pregunta: quiz,
                respuesta: 'Correcta',
                title: 'Quizes'
            });
        } else {
            res.render('quizes/answer', {
                pregunta: quiz,
                respuesta: 'Incorrecta',
                title: 'Quizes'
            });
        }
    });
};
