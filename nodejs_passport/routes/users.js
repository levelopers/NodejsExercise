var express = require('express');
var router = express.Router();
var User = require('../models/User')
var passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

//GET /singup
router.get('/signup', function (req, res) {
  res.render('signup')
})

//GET /login
router.get('/login', function (req, res) {
  res.render('login')
})

//POST /signup
router.post('/signup', function (req, res, next) {
  let username = req.body.username
  let email = req.body.email
  let password = req.body.password
  let confirmedPassword = req.body.confirmPassword

  //validation
  req.checkBody('username', 'name is required').notEmpty()
  req.checkBody('email', 'email is required').notEmpty()
  req.checkBody('email', 'email is not valid').isEmail()
  req.checkBody('password', 'password is required').notEmpty()
  req.checkBody('confirmPassword', 'password is not matched').equals(req.body.password)

  let errors = req.validationErrors()

  if (errors) {
    res.render('signup', { errors: errors })
  } else {
    var newUser = new User({
      username: username,
      email: email,
      password: password
    })
    User.createUser(newUser, function (err, user) {
      if (err) throw err
      console.log(user);
    })
    req.flash('success_msg', 'You are registered');
    res.redirect('/users/login')
  }
});

//passport authentication
//localstrategy parameters option
passport.use(new LocalStrategy({usernameField: 'email'},function (username, password, done) {
  User.getUserByEmail(username, function (err, user) {
    if (err) throw err;
    if (!user) {
      return done(null, false, { message: 'Unknown User' });
    }
    User.comparePassword(password, user.password, function (err, isMatch) {
      if (err) throw err;
      if (isMatch) {
        return done(null, user);
      }
      else {
        return done(null, false, { message: 'Invalid password' });
      }
    });
  });
}));

// Serialize user
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// Deserialize user
passport.deserializeUser(function (id, done) {
  User.getUserById(id, function (err, user) {
    done(err, user);
  });
});

router.post('/login',
  passport.authenticate('local', { failureRedirect: '/users/login', failureFlash: true }),
  function (req, res) {
    // `req.user` contains the authenticated user.
    req.flash('success_msg', `Welcome ${req.user.username}`)
    res.redirect('/users/login')
  })

module.exports = router;
