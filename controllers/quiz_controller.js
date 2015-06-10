//GET /quizes/question
exports.question = function (req, res) {
	console.log('VFG [exports.question]');
	res.render('quizes/question', {pregunta: '¿Capital de Italia?', title: 'Quizes'} );
};

//GET /quizes/answer
exports.answer = function (req, res) {
	console.log('VFG [exports.answer]');
	if ('Roma' === req.query.respuesta) {
		res.render('quizes/answer', {respuesta: 'Correcta', title: 'Quizes'});
	} else {
		res.render('quizes/answer', {respuesta: 'Incorrecta', title: 'Quizes'});
	}
};