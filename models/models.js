var path = require('path');

//Cargar modelo ORM	
var sequelizeOrm = require('sequelize');

//usar BBDD SQLite:
var sequelizeBd = new sequelizeOrm(null, null, null, {
    dialect: 'sqlite',
    storage: 'quiz.sqlite'
});

//Importar la definicion de la tabla Quiz en quiz.js
var quizTabla = sequelizeBd.import(path.join(__dirname, 'Quiz'));

//exportar la definicion de la tabla
exports.quiz = quizTabla;

//sequelize.sync() crea e inicializa tabla de preguntas en DB
sequelizeBd.sync().then(function (){
	//Ejecuta el manejador una vez creada la tabla
	quizTabla.count().then(function(count){
		if (0 === count) {
			quizTabla.create({
				pregunta: '¿Capital de Italia?',
				 respuesta: 'Roma'
			})
			.then(function(){
				console.log('Tabla Quiz inicializa');
			});
		}
	});
});
