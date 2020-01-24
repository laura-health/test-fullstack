import React from 'react';
import {ListItem,Avatar,ListItemAvatar,ListItemText } from '@material-ui/core';
import {ROOM_TYPE} from '../../constants/room';
import './style.scss';

export default function Room (props){
    let title = props.room.room_name;
    let avatar_url = '';
    if(props.room.room_type === ROOM_TYPE.PRIVADO) {
        props.room.members.map((member) => {
            if(member.user_id !== props.user_id){
                title = member.name; 
                avatar_url = member.avatar_url
            }
        });
    }
    let var_props = props.setMessages? {button:true,onClick:()=>props.setMessages(),alignItems:"flex-start"}:{alignItems:"flex-start"};
    return (
        <>
        <ListItem {...var_props}>
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src={avatar_url} />
            </ListItemAvatar>
            <ListItemText primary={title}
                          secondary={props.room.last_message} />
        </ListItem>
        </>
    );
} 