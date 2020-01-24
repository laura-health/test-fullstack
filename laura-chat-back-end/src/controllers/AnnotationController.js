const Annotation = require('../models/Annotation');

module.exports = {
    async createAnnotation(request,response) {
        const {room_id, text,owner_id,name } = request.body;
        const annotation = await Annotation.create({ room_id,text,owner_id,name });
        return response.send({success:true,annotation});
    },
    async getAnnotations(request,response) {
        const {room_id} = request.params;
        const annotations = await Annotation.find({room_id});
        if(annotations.length) {
            return response.send({success:true,annotations});
        } else {
            return response.send({success:false});
        }
    }
};