const Room = require('../models/Room');
const User = require('../models/User');
const Patient = require('../models/Patient');
const {sortMessages} = require('../helpers/sortMessages');
const {ROOM_TYPE} = require('../constants/room');

module.exports = {
    async findUserRoom(request,response) {
        const {id} = request.params;
        let {filter} = request.query;
        const rooms = await Room.find({
            $and:[
                {$or:[
                    { owner_id: id },
                    {"members.user_id": id}
                ]},
                {$or:[
                    { room_name:{$regex:`.*${filter}.*`}},
                    {$and:[
                            {"members.name":{$regex:`.*${filter}.*`}},
                            {room_type: ROOM_TYPE.PRIVADO},
                        ]}
                ]}
            ],
        });
        if(rooms.length){
            return response.send({rooms});
        } else {
            return response.status(401).send("There was no result for the search");
        }
    },    
    async findRoom(request,response) {
        const {id} = request.params;
        let {filter} = request.query;
        
        const rooms = await Room.find({ 
        room_name:{$regex:`.*${filter}.*`},
        $and:[
            {owner_id:{ $ne: id }},
            {"members.user_id": {$ne:id }}
        ]},
        );
        if(rooms.length){
            return response.send({success:true,rooms});
        } else {
            return response.send({success:false});
        }
    },  

    async findPossibilities(request,response) {
        const {id} = request.params;
        let {filter} = request.query;
        //Find all rooms that user participates
        const participating_rooms = await Room.find({ 
            room_type: filter,
            $or:[
                {owner_id:id},
                {members:{$elemMatch:{user_id:id}}}
            ]},
        );
        //Extract users id's based on filter
        let users = {}
        participating_rooms.map((room)=>{
            if(filter === ROOM_TYPE.PRIVADO){
                room.members.map((member)=>{
                    users[member.user_id] = member;
                })
            }else {
                room.patient.map((patient)=>{
                    users[patient.patient_id] = patient;
                })
            }
        })

        //Get all id's
        let knownUsers = Object.keys(users);

        if(filter === ROOM_TYPE.PRIVADO) {
            let userPossibilities = await User.find({$and:[{_id:{$nin:knownUsers}},
                                                           {_id:{$ne:id}} 
                                                        ]});
            if(userPossibilities.length){
                return response.send({success:true,possibilities:userPossibilities});

            }else {
                return response.send({success:false});
            }
        } else {
            let patientPossibilities = await Patient.find({_id:{$nin:knownUsers}});
            if(patientPossibilities.length){
                return response.send({success:true,possibilities:patientPossibilities});
            }else {
                return response.send({success:false});
            }
        }
    },  

    async createRoom(request,response) {
        const {room_name,owner_id,room_type,members,patient} = request.body;
        const room = await Room.create({
            room_name,
            room_type,
            owner_id,
            members ,
            patient
        });
        if(room) {
            return response.send(room);
        } else {
            return response.status(401).send({error:'Error creating room'});
        }
    },

    async joinRoom(request,response) {
        const {room_id,user_id,user_name} = request.body;
        const room = await Room.findOneAndUpdate({_id:room_id},{ $push:{members:{user_id, name:user_name}}})
        if(room){
                return response.send(room);
        }else {
            return response.status(401).send({error:'Room not found'});
        }
    },
    async receiveMessage(request,response) {
        const {message_body} = request.body;
        const room = await Room.findOneAndUpdate({_id:message_body.room_id},
                                                 { 
                                                    last_message:message_body.text,
                                                    last_message_time: Date.now(),
                                                    $push:{
                                                        messages:{id:message_body.id,
                                                                  text:message_body.text,
                                                                  user:{user_id   :message_body.user.id,
                                                                        name      :message_body.user.name,
                                                                        avatar_url:message_body.user.avatar_url}}
                                                    }
                                                 },
                                                {new: true})
        if(room){
                return response.send(room.messages);
        }else {
            return response.status(401).send({error:'Room not found'});
        }
    },
    async getUserRooms(request,response) {
        const {id} = request.params;
        const rooms = await Room.find({ $or:[
                                                {owner_id:id},
                                                {members:{$elemMatch:{ user_id: id}}}
                                            ]},
                                        );
        rooms.map((room)=>sortMessages(room.messages));
        if(rooms){
                return response.send(rooms);
        }
    },
};