const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema ({
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

const Photo = mongoose.model('Photo', photoSchema);
module.exports = Photo;