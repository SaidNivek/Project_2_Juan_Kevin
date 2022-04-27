const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema ({
    image: {
        type: String,
    },
    user: {
        type: User,
        required: true,
    },
},
    {
        timestamps: true
    },
);

const Photo = mongoose.model('Photo', photoSchema);
module.exports = Photo;