import React, { useState } from 'react';
import {
    List ,
    ListItemText, 
    TextField ,
    InputAdornment,
    Fab} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import CancelIcon from '@material-ui/icons/Cancel';
import {findUserRooms} from '../../../services/api/room';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Room from '../../../components/Room';
import {ROOM_TYPE} from '../../../constants/room';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useSelector,useDispatch } from 'react-redux';
import {navigate} from 'hookrouter';
import addUserInfo from '../../../store/actions/User';
import RoomDialog from '../../../components/RoomDialog';
import './style.scss';

export default function RoomsList (props){

    const [filter,setFilter] = useState(false);
    const [open,setOpen] = useState(false);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();


    async function _handleUserSearchKeyDown(e) {
        if (e.key === 'Enter') {
            let resp = await findUserRooms(user._id,{filter:e.target.value})
            console.log(resp)
            if (resp.success){
                setFilter(resp.payload.data.rooms)
            }                          
        }
    }


    function loadRooms(rooms) {
        //Assemble an array with rooms filtered by their types
        let room_filter = 
        Object.keys(ROOM_TYPE).map(function(type){
            let filtered_room  = [];
            filtered_room[type] = [];
            let room_type = Object.values(rooms).filter(function (room) { return room.room_type === ROOM_TYPE[type]? room:false})
            if(room_type.length){
                filtered_room[type].push(room_type)
            }else {
                filtered_room[type] = false;
            };
            return filtered_room;
        })
        //Assemble room content based on filtered rooms
        let content = room_filter.map((rooms)=>{
            let room_list = [];
            let room_content = [];
            let key = Object.keys(rooms)[0];
            
            if(rooms[key]){
                Object.values(rooms[key][0]).forEach(function (room){
                    if(room){
                        room_content.push(<Room setMessages={()=> props.setSelectedRoom((old_state) => room)} 
                                                key={room._id} 
                                                room={room} 
                                                user_id={user._id} />)
                    }
                })
            }
            room_list.push( <List  key={key} 
                                   primary={key}
                            >
                                <ListItemText primary={key} />
                            {room_content}
                            </List>)
            return room_list;
        });
        return content;
    }


    async function logout() {
        dispatch(addUserInfo({}))
        //navigate("/")
    }
//Logout que não deu certo
//<Fab  variant='extended' onClick={()=>logout()} size="small" color="#fff" ><ExitToAppIcon /></Fab>
    return (
        <>
            <div style={{textAlign:'center'}}>
               
                {filter?<Fab onClick={()=>setFilter(false)} size="small" color="#fff" ><CancelIcon /></Fab>:false}
                <TextField  id="outlined-basic" 
                            label="Pesquisar" 
                            onKeyDown={_handleUserSearchKeyDown}
                            variant="outlined"
                            InputProps={{startAdornment: (
                                            <InputAdornment position="start">
                                            <SearchIcon />
                                            </InputAdornment>
                                        )}}
                />
                <Fab onClick={()=>setOpen(true)} size="small" color="#fff" ><AddCircleOutlineIcon /></Fab>
            </div>
            {filter?loadRooms(filter):loadRooms(props.rooms)}
            <RoomDialog open={open} setSocket={props.setSocket} setOpen={setOpen} fetchUserRooms={props.fetchUserRooms} />
        </>
    );
} 

