var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var partials = require('express-partials');
var session = require('express-session');
var methodOverride = require('method-override');

var routes = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(partials());

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/images/toySoldier.png'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser('Quiz 2015'));
app.use(session());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
    if (!req.path.match(/\/login|\/logout/)) {
        //si no estamos entrando en las paginas de login
        //guardamos la ruta accedida para poder volver despues de un login o logout
        req.session.redir = req.path;
    }
    //hacer la session visible en las vistas
    res.locals.session = req.session;
    next();
});

app.use(function(req, res, next) {
    if (req.session.user) {
        console.log("Validando sesion: ");
        console.log(req.session.user);
        var newTime = (new Date()).getTime();
        var lastTime = (new Date(req.session.user.lastAccess)).getTime();

        console.log("Tiempo: " + newTime + " - " + lastTime + " = " + (newTime - lastTime));
        if ((newTime - lastTime) > (2 * 60 * 1000)) {
            console.log("Tiempo expirado!");
            delete req.session.user;
        } else {
            req.session.user.lastAccess = new Date();
            console.log("Nuevo lastAccess: " + req.session.user.lastAccess);
        }
    }
    next();
});

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
            errors: []
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
        errors: []
    });
});


module.exports = app;
