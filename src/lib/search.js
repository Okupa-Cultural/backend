const User = require('../models/user');

const searchUserByUsername = async username => {
    try {
        const user = await User.findOne({ username });
        return user;
    } catch(exception) {
        return false;
    }
}

const searchUserByUsernameAndToken = async ( username , token ) => {
    try {
        const user = await User.findOne({ username, token });
        return user;
    } catch(exception) {
        return false;
    }
}

const userAlreadyExists = async username => {

    await searchUserByUsername(username)
        .then( user => user)
        .catch(err => err);
        
}

const generateUserLoginToken = user => {
    user.isLogged = true;
    user.token = user.generateToken();
    user.save();

    return user;
}

const deleteUserLoginToken = user => {
    user.isLogged = false;
    user.token = "";
    user.save();

    return user;
}

const passwordIsValid = (user = false, password) => {
    if(user && user.validatePassword(password)) {
        return true;
    }

    return false;
}

const createNewUser = data => {

    if(data.username && data.password && data.email) {
        try {
            const newUser = new User({ ...data });
            newUser.password = newUser.encryptPassword(newUser.password);
            newUser.save();
            success = true;
            return newUser;
        } catch(exception) {
            return exception;
        }
    }

    return false;
}

module.exports = {
    searchUserByUsername,
    searchUserByUsernameAndToken,
    userAlreadyExists,
    createNewUser,
    generateUserLoginToken,
    deleteUserLoginToken,
    passwordIsValid,
};