var model = require('../models/models.js');

//Autoload por el parametro :quizId
exports.loadQuiz = function(req, res, next, quizId) {
    console.log("-------------- ENTRANDO EN loadQuiz");
    //En funcion de si el usuario esta logueado o no cargamos los comentarios publicados o todos
    //Con la clausula all nos aseguramos de que siempre hace un left outer join
    var includeModelComment = {
        model: model.comment,
        required: false
    };
    if (!req.session.user) {
        console.log("-------------- Solo comentarios publicados");
        includeModelComment.where = {
            publicado: Boolean(true)
        };
    }

    model.quiz.find({
        where: {
            id: Number(quizId)
        },
        include: [includeModelComment]
    }).then(function(quiz) {
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
            title: 'Quizes',
            errors: []
        });
    }).catch(function(error) {
        next(error);
    });
};

///quizes/:quizId(\\d+)
exports.show = function(req, res) {
    res.render('quizes/show', {
        pregunta: req.quiz,
        title: 'Quizes',
        errors: []
    });
};

///quizes/:quizId(\\d+)/answer
exports.answer = function(req, res) {
    if (req.quiz.respuesta === req.query.respuesta) {
        res.render('quizes/answer', {
            pregunta: req.quiz,
            respuesta: 'Correcta',
            title: 'Quizes',
            errors: []
        });
    } else {
        res.render('quizes/answer', {
            pregunta: req.quiz,
            respuesta: 'Incorrecta',
            title: 'Quizes',
            errors: []
        });
    }

};

///quizes/new
exports.new = function(req, res) {
    var tempQuiz = null;
    if (req.quiz) {
        //si quiz viene informado paso por el autoload y estamos en edicion
        tempQuiz = req.quiz;
    } else {
        //Creamos un objeto no persistente vacio para que no rompa el formulario y nos sirva
        //tambien para la edicion
        tempQuiz = model.quiz.build({
            pregunta: "Escriba la pregunta",
            respuesta: "Escriba la respuesta",
            tema: "otro"
        });
    }
    res.render('quizes/new', {
        quiz: tempQuiz,
        title: 'Nueva pregunta',
        errors: []
    });
};

///quizes/create
exports.create = function(req, res) {
    var newQuiz = null;
    if (req.quiz) {
        //Estamos modificando
        newQuiz = req.quiz;
        newQuiz.pregunta = req.body.quiz.pregunta;
        newQuiz.respuesta = req.body.quiz.respuesta;
        newQuiz.tema = req.body.quiz.tema;
    } else {
        //Creamos un objeto con los datos del formulario
        newQuiz = model.quiz.build(req.body.quiz);
    }
    //lo validamos y persistimos
    newQuiz.validate().then(function(error) {
        if (error) {
            res.render('quizes/new', {
                quiz: newQuiz,
                errors: error.errors
            });
        } else {
            newQuiz.save({
                fields: ["pregunta", "respuesta", "tema"]
            }).then(function() {
                res.redirect('/quizes');
            });
        }
    });
};

///quizes/:quizId Delete
exports.delete = function(req, res) {
    req.quiz.destroy().then(function() {
        res.redirect('/quizes');
    });
};
