const { Router } = require('express');
const router = Router();

router.get('/', (req, res, next) => {
    res.send("home");
});

router.get('/signup', (req, res, next) => {
    res.send("signup")
});

let postRoutes = require('./post');
let commentRoutes = require('./comment');
let signInUpOutRoutes = require('./user');

router.use('/post', postRoutes);
router.use('/comment', commentRoutes);
router.use('/', signInUpOutRoutes);

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