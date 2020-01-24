const Patient = require('../models/Patient');

module.exports = {
    async createPatient(request,response) {
        const {name} = request.body;
        const patient = await Patient.create({ name });
        return response.send({success:true,patient});
    },
    async getPatient(request,response){
        const {patient_id} = request.params;
        const patient = await Patient.findOne({_id:patient_id});
        if(patient) {
            return response.send(patient);
        } else {
            return response.send("Paciente não encontrado");
        }
    }
};