const User = require('../models/user');

async function searchUserByUsername(username) {
    try {
        const user = await User.find({ username });
        if(user) {
            return user;
        } else {
            return false;
        }
    } catch(errors) {
        console.log(errors);
        return false;
    }
}

async function userAlreadyExists(username) {

    let alreadyExists = false;

    await searchUserByUsername(username)
        .then( res => alreadyExists = res);

    return alreadyExists;
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
    createNewUser
};