const {redisClient} = require('../config/redis');
const {sortMessages} = require('../helpers/sortMessages');
const Room = require('../models/Room');

//SETUP SOCKET
exports.setupWebsocket = (server) => {
    const io = require('socket.io').listen(server);
    io.set("transports", ['websocket', 'polling']); 
    io.set("polling duration", 10); 

    io.on('connection', socket => {
        console.log(`${socket.id} Connected`);
        
        //Saving socket id in Redis
        const {room_query} = socket.handshake.query;
        redisClient.set(socket.id,room_query);

        //Set Mongoose listener on Room collection
        let changeStream = Room.watch([],{ fullDocument : "updateLookup" });
        
        //Listen to changes as Room collection
        changeStream.on('change', (change) => {
            //Search room records by socket id
            redisClient.get(socket.id, function (error, result) {
                if (error) throw error;
                let client_rooms = result.split(',')
                //If the room register is found in the socket registers, triggers data output on emit function
                if(client_rooms.includes(String(change.documentKey._id))){
                    sortMessages(change.fullDocument.messages);
                    let response = change.updateDescription? {newmessage:true,change:change.fullDocument}:{newmessage:false,change:change.fullDocument};
                    socket.emit('roomChange',response) 
                }
            });
        });    

        //Listener for a new created room
        socket.on('addNewRoom', (data) => {
            socket.broadcast.emit('newRoom',{change:data}) 
        }); 

        socket.on('disconnect',(socket)=>{
            console.log(`Socket Disconnected`)
        })         
    })
}