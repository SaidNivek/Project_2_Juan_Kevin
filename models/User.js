const mongoose = require('mongoose');

const userSchema = new mongoose.Schema ({
    first_name: {
        type: String,
        required: [true, 'Enter Name'],
    },
    last_name: {
        type: String,
        required: [true, 'Enter Name'],
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },

});

const User = mongoose.model('User', userSchema);
module.exports = User;