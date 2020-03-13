const { Router } = require('express');
const express = require('express');
const app = express();
const router = Router();
const passport = require('passport');
const User = require('../models/user');

router.get('/', (req, res, next) => {
    res.send("home");
});

router.get('/signup', (req, res, next) => {
    res.send("signup")
});

let postRoutes = require('./post');
let commentRoutes = require('./comment');

router.use('/post', postRoutes);
router.use('/comment', commentRoutes);

router.post('/test', (req, res) => {
    const { username, password, email } = req.body;

    if(username && password) {
        const newUser = new User({ ...req.body });
        newUser.password = newUser.encryptPassword(newUser.password);
        newUser.save();
        res.json(newUser);
    } else {
        res.send("Datos incorrectos!");
    }
});

router.post('/test-login', async ( req, res) => {
    const { username , password } = req.body;
    const userEngine = new User;
    let userFound;

    const encryptedPassword = userEngine.encryptPassword(password);
    userEngine.find({ username: username, password: encryptedPassword } ,'username', function (err, user) {
        if(err) return handleError(err);

        userFound = user;
    });

    if(userFound) {
        res.json("found!");
    } else {
        res.json("not found!");
    }
});

/*
router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    passReqToCallback: true
}));
*/
router.get('/login', (req, res, next) => {
    res.send('login');
});

router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    passReqToCallback: true
}));

router.get('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/');
});

router.use((req, res, next) => {
    isAuthenticated(req, res, next);
    next();
});

router.get('/profile', (req, res, next) => {
    res.send('profile');
});

router.get('/dashboard', (req, res, next) => {
    res.send('dashboard');
});

function isAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}

module.exports = router;