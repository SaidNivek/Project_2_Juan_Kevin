// This is connecting the models, which connects to the db, into the controllers
// require('../models')

module.exports = {
    user: require('./user_controller.js'),
    photo: require('./photo_controller.js'),
    comment: require('./comment_controller.js'),
}