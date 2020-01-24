const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    id      : String,
    text      : String,
    created_at: { type: Date, default: Date.now },
    user:{
            user_id    : {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
            name:       String,
            avatar_url: String

    }
});

module.exports = MessageSchema;