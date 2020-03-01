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
    bio: String,
    phone_number: String,
    address: String,
    created_at: String
});

userSchema.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model( 'user' , userSchema );