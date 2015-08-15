var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var session = require('express-session');
var flash = require('express-flash');
var csrf = require('csrf');

var routes = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(methodOverride());
app.use(cookieParser());
app.use(session({secret:'koobkooC edoN'}));
app.use(csrf());
app.use(flash());
app.use(require('stylus').middleware({
  src: __dirname + '/views',
  dest: __dirname + '/public'
}));
app.use(require('./login'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(function (req, res, next) {
  res.locals.flash = req.flash();
  res.locals._csrf = req.session._csrf;
  next();
});

app.use('/', routes);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.render('error', {
        message: err.message,
        error: {}
    });
});






module.exports = app;
