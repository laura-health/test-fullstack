const mongoose = require('mongoose');

const PatientInfoSchema = new mongoose.Schema({
    patient_id    : {type: mongoose.Schema.Types.ObjectId, ref: 'patient'},
    name          : String,
});

module.exports = PatientInfoSchema;