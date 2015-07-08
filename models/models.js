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

//Importar la definicion de las tablas Quiz y Comment
var quizTabla = sequelizeBd.import(path.join(__dirname, 'quiz'));
var quizComment = sequelizeBd.import(path.join(__dirname, 'comment'));

//Relaciones entre tablas
quizComment.belongsTo(quizTabla);
quizTabla.hasMany(quizComment);

//exportar la definicion de la tabla
exports.quiz = quizTabla;
exports.comment = quizComment;

//sequelize.sync() crea e inicializa tabla de preguntas en DB
sequelizeBd.sync().then(function() {
    //Ejecuta el manejador una vez creada la tabla
    console.log("INICIALIZANDO LA BASE DE DATOS")
    quizTabla.count().then(function(count) {
        console.log("Numero de preguntas: " + count)
        if (0 === count) {
            quizTabla.create({
                pregunta: '¿Capital de Italia?',
                respuesta: 'Roma',
                tema: 'humanidades'
            });
            quizTabla.create({
                pregunta: '¿Capital de Portugal?',
                respuesta: 'Lisboa',
                tema: 'humanidades'
            });
            quizTabla.create({
                pregunta: '¿En que lenguaje esta programado esto?',
                respuesta: 'Node',
                tema: 'tecnologia'
            });
            quizTabla.create({
                pregunta: '¿Cual es el control de versiones que usamos?',
                respuesta: 'Git',
                tema: 'tecnologia'
            });
            quizTabla.create({
                pregunta: '¿En que plataforma hemos desplegado la aplicacion?',
                respuesta: 'Heroku',
                tema: 'tecnologia'
            });
            quizTabla.create({
                pregunta: '¿Capital de Francia?',
                respuesta: 'Paris',
                tema: 'humanidades'
            });
        }
    });
});
