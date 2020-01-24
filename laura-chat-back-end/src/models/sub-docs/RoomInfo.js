const mongoose = require('mongoose');

const RoomInfoSchema = new mongoose.Schema({
    room_id   : {type: mongoose.Schema.Types.ObjectId, ref: 'room'},
    room_name : String,
});

module.exports = RoomInfoSchema;