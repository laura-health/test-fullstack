const mongoose = require('mongoose');

const MembersRoomSchema = new mongoose.Schema({
    user_id    : {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    name       : String,
    avatar_url : String
});

module.exports = MembersRoomSchema;