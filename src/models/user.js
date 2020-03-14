const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const { Schema } = mongoose;

const userSchema = new Schema({
    username: String,
    password: String,
    email: String,
    user_type: Number,
    project_name: String,
    foundation_date: String,
    isLogged: Boolean,
    bio: String,
    phone_number: String,
    address: String,
    token : String,
    created_at: String
});

userSchema.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateToken = function () {
    let token = Math.floor( Math.random() * 1000000 );
    return bcrypt.hashSync( token , bcrypt.genSaltSync(10) );
};

userSchema.methods.deleteToken = function () {
    this.token = "";
};

module.exports = mongoose.model( 'user' , userSchema );