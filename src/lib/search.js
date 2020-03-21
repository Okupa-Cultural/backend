const User = require('../models/user');

const searchUserByUsername = async username => {
  await User.findOne({ username })
    .then(user => Promise.resolve(user))
    .catch(err => Promise.reject(err));
}

const userAlreadyExists = async username => {

    searchUserByUsername(username)
        .then( user => Promise.resolve(user))
        .catch(err => Promise.reject(err));
        
}

const generateUserLoginToken = user => {
    user.token = user.generateToken();
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
        const newUser = new User({ ...data });
        newUser.password = newUser.encryptPassword(newUser.password);
        newUser.save();
        success = true;
        return newUser;
    }

    return false;
}

module.exports = {
    searchUserByUsername,
    userAlreadyExists,
    createNewUser,
    generateUserLoginToken,
    passwordIsValid
};