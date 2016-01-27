 var bodyParser   = require('body-parser');
 var cookieParser = require('cookie-parser');
 var express      = require('express');
 var compression  = require('compression');
 var favicon      = require('serve-favicon');
 var fs           = require('fs');
 var http         = require('http');
 var logger       = require('morgan');
 var path         = require('path');
 var session      = require('express-session');

/*//Create error log Stream
var errorLogStream = fs.createWriteStream(__dirname + '/logs/error.log', {flags: 'a'});

//Error handling, avoiding crash
process.on('uncaughtException', function (err) {
   var date = new Date();
   console.error(("+++++++ "+ date + " error found, logging event +++++++ ").red);
   errorLogStream.write(date+ '\n'+ err.stack+'\n\n');
});*/


var index = require('./routes/index');
var login = require('./routes/login');
var api   = require('./routes/api');

var app = express();
app.use(compression());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

/*var accessLogStream = fs.createWriteStream(__dirname + '/logs/access.log', {flags: 'a'});
app.use(logger('short', {stream: accessLogStream}));*/

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser('yetuuriu04989'));
app.use(session({
  name: 'ecosquared',
  secret: 'Y$734yuhdd',
  saveUninitialized: true,
  resave: true,
  cookie: {maxAge: 1000*60*60*2}
}));


app.use('/', index);
app.use('/', login);
app.use('/', api);


//Disable server banner
app.disable('x-powered-by');


// error handlers
//=======================================================================
// catch 404 and forward to error handler
app.use( function(req, res, next) {
   var err = new Error('');
   err.status = 404;
   next(err);
});

// production error handler
app.use(function(err, req, res, next) {
   res.status(err.status || 500);
   res.render('404', {
      msg: err.message,
      error: {}
   });
});


app.set('port', process.env.PORT || 5050);

http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});


module.exports = app;
