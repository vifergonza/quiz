var path = require('path');

//Cargar modelo ORM	
var sequelizeOrm = require('sequelize');

//Configuracion de entorno
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var dbName = (url[6] || null);
var user = (url[2] || null);
var pwd = (url[3] || null);
var protocol = (url[1] || null);
var dialect = (url[1] || null);
var port = (url[5] || null);
var host = (url[4] || null);
var storage = process.env.DATABASE_STORAGE;

//Cargar base de datos en funcion del entorno
var sequelizeBd = new sequelizeOrm(dbName, user, pwd, {
    dialect: dialect,
    protocol: protocol,
    port: port,
    host: host,
    storage: storage, //solo SqlLite
    omitNull: true //solo posrtgree
});

//Importar la definicion de la tabla Quiz en quiz.js
var quizTabla = sequelizeBd.import(path.join(__dirname, 'quiz'));

//exportar la definicion de la tabla
exports.quiz = quizTabla;

//sequelize.sync() crea e inicializa tabla de preguntas en DB
sequelizeBd.sync().then(function() {
    //Ejecuta el manejador una vez creada la tabla
    quizTabla.count().then(function(count) {
        if (0 === count) {
            quizTabla.create({
                    pregunta: '¿Capital de Italia?',
                    respuesta: 'Roma'
                });
            quizTabla.create({
                    pregunta: '¿Capital de Portugal?',
                    respuesta: 'Lisboa'
                });
            quizTabla.create({
                    pregunta: '¿En que lenguaje esta programado esto?',
                    respuesta: 'Node'
                });
            quizTabla.create({
                    pregunta: '¿Cual es el control de versiones que usamos?',
                    respuesta: 'Git'
                });
            quizTabla.create({
                    pregunta: '¿En que plataforma hemos desplegado la aplicacion?',
                    respuesta: 'Heroku'
                });
            quizTabla.create({
                    pregunta: '¿Capital de Francia?',
                    respuesta: 'Paris'
                });
        }
    });
});
