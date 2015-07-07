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
    var sqlOptions = {};
    if (null != req.query.search) {
        var filtro = "%" + req.query.search.replace(" ", "%") + "%";
        sqlOptions.where = ["upper(pregunta) like upper(?)", filtro];
        sqlOptions.order = [
            ["pregunta", "ASC"]
        ];
        console.log(sqlOptions);
    }
    model.quiz.findAll(sqlOptions).then(function(quizes) {
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

///quizes/new
exports.new = function(req, res) {
    //Creamos un objeto no persistente vacio para que no rompa el formulario y nos sirva
    //tambien para la edicion
    var newQuiz = model.quiz.build({
        pregunta: "Escriba la pregunta",
        respuesta: "Escriba la respuesta"
    });
    res.render('quizes/new', {
        quiz: newQuiz,
        title: 'Nueva pregunta'
    });
};

///quizes/create
exports.create = function(req, res) {
    //Creamos un objeto con los datos del formulario
    var newQuiz = model.quiz.build(req.body.quiz);
    //lo persistimos
    newQuiz.save({
        fields: ["pregunta", "respuesta"]
    }).then(function() {
        res.redirect('/quizes');
    });

};
