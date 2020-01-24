const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
    name     : String
});

module.exports = mongoose.model('patient',PatientSchema);