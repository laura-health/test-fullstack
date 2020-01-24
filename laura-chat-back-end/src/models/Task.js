const mongoose = require('mongoose');
const chosenInfoSchema = require('./sub-docs/ChosenInfo');
const roomInfoSchema = require('./sub-docs/RoomInfo');

const TaskSchema = new mongoose.Schema({
    task_name  : String,
    owner_name : String,
    owner_id   :  {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    complete   : Boolean,
    room_info  : roomInfoSchema ,
    chosen_info: {type : chosenInfoSchema,default:{}} 
});

module.exports = mongoose.model('task',TaskSchema);