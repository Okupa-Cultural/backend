const mongoose = require('mongoose')
const { Schema } = mongoose;

const commentSchema = new Schema({
    comment_id: Number,
    user_id: {
        type: String,
        required: true
    },
    post_id: {
        type: String,
        required: true
    },
    image_url: String,
    content: String,
    replies: [{
        comment_id: String,
        user_id: String,
        content: String,
        image_url: String
    }],
    isReply: Boolean,
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: Date,
    deleted: Boolean
});

module.exports = mongoose.model('comment', commentSchema);