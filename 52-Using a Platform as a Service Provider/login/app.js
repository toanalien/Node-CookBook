/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express(),
  dev = app.get('env') === 'development';


app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger(dev 
  ? 'dev' 
  : {stream: require('fs').createWriteStream('log')}));
app.use(express.bodyParser());
app.use(express.methodOverride());

app.use(express.cookieParser('kooBkooCedoN'));
app.use(express.session());

app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

if (dev) { app.use(express.errorHandler()); }

app.get('/', routes.index);
app.get('/users', user.list);

app.post('/', routes.login, routes.index);
app.del('/', routes.logout, routes.index);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});