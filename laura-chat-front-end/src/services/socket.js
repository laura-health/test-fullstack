import socketio from 'socket.io-client';

//SETUP SOCKET CLIENT
const socketclient = socketio(process.env.REACT_APP_API_URL,{
    autoConnect:false,
    transports: ['websocket', 'polling']
})

//Register room's id's in socket future response 
function connectRooms(rooms) {
    let room_query = rooms.map((room)=>room._id);
    socketclient.io.opts.query = {
        room_query
    };
    socketclient.connect();
}

//DISCONNECT FROM CURRENT SOCKET 
function disconnect() {
    socketclient.disconnect();
}

export default socketclient;
export { connectRooms, disconnect };

