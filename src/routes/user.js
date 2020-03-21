const { Router } = require('express');
const router = Router();
const User = require('../models/user');
const { userAlreadyExists , createNewUser , generateUserLoginToken, passwordIsValid , searchUserByUsername} = require('../lib/search');


router.post('/signup', async (req, res, next) => {

    const alreadyExists = await userAlreadyExists(req.body.username);

    if(alreadyExists) {
        res.json("username already in use");
        next();
    } else {
        let newUser = createNewUser(req.body);
        res.json(newUser);
    }

});

router.post('/login', async ( req, res ) => {

    const { username , password } = req.body;

    await userAlreadyExists(username)
        .then(user => {
            if(passwordIsValid(user , password)) {
                res.json(generateUserLoginToken(user));
            }
        }).catch(err => console.log(err));
});

router.post('/logout', ( req, res ) => {
    const { username , token } = req.body;

    if(username && token) {
        User.findOne({ username , token }, 'token', function (err, user) {
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