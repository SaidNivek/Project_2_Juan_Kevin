const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema ({
    comment: {
        type: string,
        required: true,
    },
    image: {
        type: String,
    },
    username: {
        type: String,
        required: true,
    },
},
    {
        timestamps: true
    },
);

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;