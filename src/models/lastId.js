const mongoose = require('mongoose')
const { Schema } = mongoose;

const lastIdSchema = new Schema({
    module: String,
    lastId: String
});

module.exports = mongoose.model('lastId', lastIdSchema);