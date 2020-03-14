const { Router } = require('express');
const router = Router();
const User = require('../models/user');


router.post('/signup', (req, res) => {
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

router.post('/login', async ( req, res ) => {
    const { username , password } = req.body;
    let theUser;

    await User.findOne({ username: username } , function (err, user) {
        if(err) return handleError(err);

        if(user.validatePassword(password)) {
            theUser = user;
            let token = theUser.generateToken();
            theUser.token = token;
            theUser.save();
        }
    });

    if(theUser) {
        res.json(theUser);
    } else {
        res.json("not found!");
    }
});

router.post('/logout', async ( req, res ) => {
    const { username , token } = req.body;

    await User.findOne({ username : username , token : token }, 'token', function (err, user) {
        if(err) return handleError(err);

        user.deleteToken();
        user.save();
        res.json(user);
    });
});

module.exports = router;