const passport = require('passport');
const LocalStrategy = require('passport-local');

const Users = require('../model/userModel');

passport.use(new LocalStrategy({
  usernameField: 'user[email]',
  passwordField: 'user[password]',
}, (email, password, done) => {
  Users.findOne({email})
      .then((user) => {
        if (!user || !user.validatePassword(password)) {
          return done('wrong email or password');
        }

        return done(null, user);
      }).catch(done);
}));
