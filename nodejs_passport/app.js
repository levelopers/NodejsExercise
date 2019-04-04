var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require("express-session");
var passport = require('passport');
var mongoose = require('mongoose');
var MongoStore = require('connect-mongo')(session)
mongoose.connect('mongodb://localhost/loginapp', {
  useCreateIndex: true,
  useNewUrlParser: true
})
var db = mongoose.connection;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var app = express();

//view engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({ defaultLayout: 'layout' }));
app.set('view engine', 'handlebars');

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//express session
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true,
  store: new MongoStore({ mongooseConnection: db }),
  cookie: { maxAge: 120 * 60 * 1000 } // 2 hours later experies the session
}));

// Passport initialize
app.use(passport.initialize());
app.use(passport.session());

//express validator
app.use(expressValidator())

app.use(function(req, res, next) {
  res.locals.session = req.session;
  next();
});

//connect flash
app.use(flash())

// Flash - Global variables
app.use(function(req, res, next){
  res.locals.success_msg  = req.flash('success_msg');
  res.locals.error_msg    = req.flash('error_msg');
  res.locals.error        = req.flash('error'); // Pasport error message
  res.locals.user         = req.user || null;
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
