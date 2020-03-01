const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
    user_id: String,
    post_type: Number,
    title: String,
    post_image_url: String,
    created_at: String,
    comments: Number,
    claps: Number,
});

module.exports = mongoose.model('post', postSchema);