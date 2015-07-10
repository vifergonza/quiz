var model = require('../models/models.js');

//Autoload :coomentId
exports.loadComment = function(req, res, next, commentId) {
    model.comment.find({
        where: {
            id: Number(commentId)
        }
    }).then(function(comment) {
        if (comment) {
            req.comment = comment;
            next();
        } else {
            next(new Error("No existe comentario con el id " + commentId));
        }
    }).catch(function(error) {
        next(error)
    })
}

//GET /quizes/:quizId/comments
exports.new = function(req, res) {
    res.render('comments/new', {
        quiz: req.quiz,
        title: 'Nuevo comentario',
        errors: []
    });
};

//POST /quizes/:quizId/comments
exports.create = function(req, res) {
    var newComment = model.comment.build({
        texto: req.body.comment.texto,
        QuizId: req.params.quizId
    });

    //lo validamos y persistimos
    newComment.validate().then(function(error) {
        if (error) {
            res.render('comments/new', {
                comment: newComment,
                quizId: req.params.quizId,
                errors: error.errors
            });
        } else {
            newComment.save().then(function() {
                res.redirect('/quizes/' + req.params.quizId);
            });
        }
    }).catch(function(error) {
        next(error)
    });
};

//GET /quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish
exports.publish = function(req, res) {
    req.comment.publicado = true;
    req.comment.save({
        fields: ["publicado"]
    }).then(function() {
        res.redirect('/quizes/' + req.params.quizId);
    }).catch(function(error) {
        next(error)
    });
}
