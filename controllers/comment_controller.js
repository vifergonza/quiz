var model = require('../models/models.js');

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
