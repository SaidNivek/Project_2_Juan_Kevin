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
    user: {
        required: [true, "A user is required to post a photo"],
        type: mongoose.Types.ObjectId,
        // type - configures 'product' field to only store MDB - Object Ids
        // when creating a new review - we absolutely need an object 
        ref: 'User',
        // reference is how mongoose will know where to look up documents
        // that match the current product's ObjectId
        // ref should store a string that matches the name of your related model
    },
    photo: {
        required: [true, "A photo is required to post a comment"],
        type: mongoose.Types.ObjectId,
        // type - configures 'product' field to only store MDB - Object Ids
        // when creating a new review - we absolutely need an object 
        ref: 'Photo',
        // reference is how mongoose will know where to look up documents
        // that match the current product's ObjectId
        // ref should store a string that matches the name of your related model
}},
    {
        timestamps: true
    },
);

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;