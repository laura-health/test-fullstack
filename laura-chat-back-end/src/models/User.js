const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name       : String,
    login      : { type: String, unique: true },
    password   : String,
    user_type  : String,
    avatar_url : String,
});

module.exports = mongoose.model('user',UserSchema);