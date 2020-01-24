const mongoose = require('mongoose');
const messageSchema = require('./sub-docs/Message');
const membersRoomSchema = require('./sub-docs/MembersRoom');
const PatientInfoSchema = require('./sub-docs/PatientInfo');

const RoomSchema = new mongoose.Schema({
    room_name        : String,
    room_type        : String,
    owner_id         : {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    last_message     : {type:String, default:'Nenhuma mensagens foi escrita'} ,
    last_message_time: {type:Date, default: Date.now},
    members          : [membersRoomSchema] ,
    messages         : {type:[messageSchema], default:[]}, 
    patient          : {type:[PatientInfoSchema], default:{}} 
});

module.exports = mongoose.model('room',RoomSchema);