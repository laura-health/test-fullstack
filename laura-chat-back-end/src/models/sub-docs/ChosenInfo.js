const mongoose = require('mongoose');

const ChosenInfoSchema = new mongoose.Schema({
    chosen_id   : {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    chosen_name : String,
    avatar_url  : String
});

module.exports = ChosenInfoSchema;