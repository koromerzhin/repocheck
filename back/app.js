var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

var indexRouter = require('./routes/index');
var gistsRouter = require('./routes/gists');
var userRouter = require('./routes/user');
var repositoriesRouter = require('./routes/repositories');
var starredRepositoriesRouter = require('./routes/starredRepositories');

var app = express();
var whitelist = ['http://repocheck.traefik.me', 'http://build-repocheck.traefik.me'];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by cors'));
    }
  },
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/back/', indexRouter);
app.use('/back/repositories/', repositoriesRouter);
app.use('/back/user/', userRouter);
app.use('/back/gists/', gistsRouter);
app.use('/back/starredRepositories/', starredRepositoriesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  console.log(req)
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
