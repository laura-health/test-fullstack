const mongoose = require('mongoose');

const AnnotationSchema = new mongoose.Schema({
    room_id  : String,
    text     : String,
    owner_id : String,
    name     : String,
});

module.exports = mongoose.model('annotations',AnnotationSchema);