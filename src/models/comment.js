const mongoose = require('mongoose')
const { Schema } = mongoose;

const commentSchema = new Schema({
    comment_id: Number,
    user_id: String,
    post_id: String,
    image_url: String,
    content: String,
    replies: [],
    isReply: Boolean,
    created_at: Date,
    updated_at: Date,
    deleted: Boolean
});

module.exports = mongoose.model('comment', commentSchema);