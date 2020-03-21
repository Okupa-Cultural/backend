const { Router } = require('express');
const router = Router();
const User = require('../models/user');
const { 

    userAlreadyExists , 
    createNewUser , 
    generateUserLoginToken , 
    deleteUserLoginToken ,
    passwordIsValid , 
    searchUserByUsername ,
    searchUserByUsernameAndToken ,

} = require('../lib/search');


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

    const user = await searchUserByUsername(username);
    const validatePassword = passwordIsValid(user , password);

    if(validatePassword) {
         res.json(generateUserLoginToken(user));
    } else {
        res.json(user);
    }
    
});

router.post('/logout', async ( req, res ) => {
    const { username , token } = req.body;

    const user = await searchUserByUsernameAndToken( username , token );

    if(user) {
        res.json(deleteUserLoginToken(user));
    } else {
        res.json(user);
    }
});

module.exports = router;