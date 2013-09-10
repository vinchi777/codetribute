
/**
 * Module dependencies.
 */

var express = require('express');
var mongoose = require('mongoose');
var http = require('http');
var path = require('path');
var fs = require('fs');
var engine = require('ejs-locals');
var passport = require('passport')
var flash = require('connect-flash');
var _ = require('underscore');


var uristring =
process.env.MONGOLAB_URI ||
process.env.MONGOHQ_URL ||
'mongodb://localhost/codetribute';

mongoose.connect(uristring);
var app = express();

// load models
var models_path = __dirname + '/app/models'
fs.readdirSync(models_path).forEach(function (file){
	require( models_path + '/' + file);
});

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/app/views');
app.set('view engine', 'ejs');
app.engine('ejs', engine);



app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({ secret: 'keyboard cat'}));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

// user helper in views
app.use(function(req, res, next) {
	res.locals.user = req.user	
	res.locals._ = _ //unerscore.js
	next();
})

app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// set routes
require('./config/routes')(app, passport)
// set authentication
require('./config/passport')(passport)

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
