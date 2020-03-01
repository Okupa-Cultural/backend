const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const moment = require('moment');

const User = require('../models/user');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser( async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});

passport.use('local-signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, email, done) => {

    const userValidation = await User.findOne({ username: username });
    if(userValidation) {
        return done(null, false, req.flash('signupMessage', 'The username is already in use'));
    } else {
        const newUser = new User();
        newUser.username = username;
        newUser.password = newUser.encryptPassword(password);
        newUser.email = email;
        newUser.created_at = moment().format();
        newUser.user_type = 1;
        await newUser.save();
        done(null, newUser);
    }
    
}));

passport.use('local-login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {

    const user = await User.findOne({username:username});
    if(!user) {
        return done(null, false, req.flash('loginMessage', 'User not found'));
    }
    if(!user.validatePassword(password)) {
        return done(null, false, req.flash('loginMessage', 'Incorrect password'));
    }
    done(null, user);
}));