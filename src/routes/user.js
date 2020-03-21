const { Router } = require('express');
const router = Router();
const User = require('../models/user');
const { userAlreadyExists , createNewUser } = require('../lib/search');


router.post('/signup', async (req, res, next) => {

    const alreadyExists = await userAlreadyExists(req.body.username);

    if(alreadyExists) {
        res.send("username already in use");
        next();
    }

    if(!alreadyExists) {
        let newUser = createNewUser(req.body);
        res.json(newUser);
    } else {
        res.send("Datos incorrectos!");
    }

});

router.post('/login', async ( req, res ) => {
    const { username , password } = req.body;
    let theUser;

    if(username && password) {
        await User.findOne({ username: username } , function (err, user) {
            if(err) return handleError(err);

            if(user) {
                if(user.validatePassword(password)) {
                    theUser = user;
                    let token = theUser.generateToken();
                    theUser.token = token;
                    theUser.save();
                }
            }
        });
    }

    if(theUser) {
        res.json(theUser);
    } else {
        res.json("not found!");
    }
});

router.post('/logout', async ( req, res ) => {
    const { username , token } = req.body;

    if(username && token) {
        await User.findOne({ username , token }, 'token', function (err, user) {
            if(err) return handleError(err);

            if(user) {
                user.deleteToken();
                user.save();
                res.json(user);
            } else {
                res.send("invalid user or token provided");
            }
        });
    }
});

module.exports = router;