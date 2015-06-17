var model = require('../models/models.js');

//GET /quizes/question
exports.question = function(req, res) {
    model.quiz.findAll().then(function(quizes) {
        res.render('quizes/question', {
            pregunta: quizes[0].pregunta,
            title: 'Quizes'
        });
    });
};

//GET /quizes/answer
exports.answer = function(req, res) {
    model.quiz.findAll().then(function(quizes) {
        if (quizes[0].respuesta === req.query.respuesta) {
            res.render('quizes/answer', {
                respuesta: 'Correcta',
                title: 'Quizes'
            });
        } else {
            res.render('quizes/answer', {
                respuesta: 'Incorrecta',
                title: 'Quizes'
            });
        }
    });
};
