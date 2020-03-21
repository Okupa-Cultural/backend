const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const { Schema } = mongoose;

const userSchema = new Schema({
    username: { 
        type: String,
        required: true,
        unique: true
    },
    password: { 
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    user_type: {
        type: Number,
        default: 1
    },
    project_name: String,
    foundation_date: String,
    isLogged: {
        type: Boolean,
        default: false,
    },
    bio: String,
    phone_number: String,
    address: String,
    token : String,
    created_at: {
        type: Date,
        default: Date.now
    }
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