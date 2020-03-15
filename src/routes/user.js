const { Router } = require('express');
const router = Router();
const User = require('../models/user');


router.post('/signup', async (req, res, next) => {
    const { username, password, email } = req.body;
    let alreadyExists = false;

    await User.findOne({ username }, function (err, user) {
        if(err) return handleError(err);

        if(user) {
            alreadyExists = true;
            res.send("username already in use");
            next();
        }
    });

    if(!alreadyExists) {
        if(username && password && email) {
            const newUser = new User({ ...req.body });
            newUser.password = newUser.encryptPassword(newUser.password);
            newUser.save();
            res.json(newUser);
        } else {
            res.send("Datos incorrectos!");
        }
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
        await User.findOne({ username : username , token : token }, 'token', function (err, user) {
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