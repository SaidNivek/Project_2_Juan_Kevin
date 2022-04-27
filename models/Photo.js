const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema ({
    image: {
        type: String,
        required: [true, 'Please add a photo.'],
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
    caption: {
        type: String,
    },
},
    {
        timestamps: true
    },
);

const Photo = mongoose.model('Photo', photoSchema);
module.exports = Photo;