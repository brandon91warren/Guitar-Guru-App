const User = require('../models/User');
const passport = require('passport');

exports.registerForm = (req, res) => {
  res.render('auth/register');
};

exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      req.flash('error_msg', 'Email already registered');
      return res.redirect('/auth/register');
    }

    const newUser = new User({ username, email, password });
    await newUser.save();
    req.flash('success_msg', 'You are now registered and can log in');
    res.redirect('/auth/login');
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Something went wrong during registration');
    res.redirect('/auth/register');
  }
};

exports.loginForm = (req, res) => {
  res.render('auth/login');
};

exports.loginUser = passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/auth/login',
  failureFlash: true
});

exports.logoutUser = (req, res, next) => {
  req.logout(function (err) {
    if (err) return next(err);
    req.flash('success_msg', 'You are logged out');
    res.redirect('/auth/login');
  });
};
