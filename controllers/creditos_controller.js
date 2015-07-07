//GET /quizes/credios
exports.show = function(req, res) {
    console.log('VFG [exports.creditos]');
    res.render('author', {
        errors: []
    });
};
