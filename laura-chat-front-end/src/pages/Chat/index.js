import React, { useState,useEffect} from 'react';
import {Container,
    Grid,
    Drawer,
    TextField ,
    Avatar,
    AppBar ,
    Toolbar ,
    ListItem,
    ListItemText,
    ListItemAvatar,
    IconButton} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import {getUserRooms,sendMessage} from '../../services/api/user';
import { getRoomsTasks,createTask } from '../../services/api/task';
import { getAnnotations, createAnnotation } from '../../services/api/annotation';
import {connectRooms} from '../../services/socket';
import Annotation from '../../components/Annotation';
import Task from '../../components/Task';
import socketclient, {disconnect}  from '../../services/socket';
import Room from '../../components/Room';
import Laura from '../../components/Laura';
import RoomsList from './RoomsList';
import { GiftedChat } from 'react-web-gifted-chat';
import { useSelector } from 'react-redux';
import './style.scss';
import { ROOM_TYPE } from '../../constants/room';

export default function Chat() {
    const [drawer,setDrawer] = useState(false);
    const [rooms,setRooms] = useState([]);
    const [selectedRoom,setSelectedRoom] = useState(false);
    const [socket,setSocket] = useState(false);
    const [tasks,setTasks] = useState(false);
    const [annotations,setAnnotations] = useState(false);
    const props_user = useSelector(state => state.user)

    function updateMessages(messages,updateMessage){
        return updateMessage;
    }

    function updateRooms(rooms,updateRoom) {
        
        let index = 0;
        let new_rooms = Object.values(rooms).map((room,key)=> {
            if(room._id === updateRoom.change._id){
                index = key
            } 
            return room;
        });
        new_rooms[index] = updateRoom.change;
        return new_rooms;
    }

    async function setupWebsocket(initial_rooms) {
        setSocket(true);
        connectRooms(initial_rooms);
    }

    async function fetchUserRooms(){
        let res = await getUserRooms(props_user._id);
        if(res.success){
            setRooms(res.payload.data)
            return res.payload.data;
        } else {
            return false
        }
    }

    async function loadTask(){
        let res = await getRoomsTasks(selectedRoom._id,{filter:'room'});
        if(res.success){
            setTasks(old_state => {
                return (res.success)?res.payload.data:false;
            })
        }
    }

    async function loadAnnotations(){
        let res = await getAnnotations(selectedRoom._id);
        if(res.success){
            setAnnotations(res.annotations);
        } else {
            setAnnotations([]);
        }
    }


    useEffect(async () =>{
        let initial_rooms = await fetchUserRooms();
        if(initial_rooms) setupWebsocket(initial_rooms);
        socketclient.on('newRoom', async (new_room) =>{
            Object.values(new_room.change.members).map((member)=>{
                if(member.user_id === props_user._id){
                    setRooms( (old_state) => {
                        let new_rooms = updateRooms(old_state,new_room)
                        return new_rooms 
                    });
                    setSocket(false);
                }
            })
        });
    },[]);

    useEffect(()=> {
        //SE SOCKET NÃO ESTIVER ATIVO
        if(!socket) { 
            socketclient.on('roomChange', async (fullDocument) =>{
                if(fullDocument.newmessage){
                    setSelectedRoom((old_state) => {
                        setRooms( (rooms) => {
                            let new_rooms = updateRooms(rooms,fullDocument)
                            return new_rooms 
                        });
                        //IF THE ROOM IS OPEN
                        if(old_state){
                            let teste = updateMessages(old_state,fullDocument.change) 
                            return teste
                        } 
                    })
                }else {
                    setRooms( (rooms) => {
                        let new_rooms = updateRooms(rooms,fullDocument)
                        return new_rooms 
                    });
                }
            })
        }
    },[rooms]);

    useEffect(()=> {
        setSelectedRoom(selectedRoom);
        if(selectedRoom){
            if(selectedRoom.room_type === ROOM_TYPE.ACOMPANHAMENTO){
                loadAnnotations();
            }else {
                setAnnotations(false)
            }
            loadTask();
        }
    },[selectedRoom]);

    useEffect(()=> {
        setTasks(tasks);
    },[tasks]);

    useEffect(()=> {
        setAnnotations(annotations);
    },[annotations]);

    useEffect(()=> {
        //SOCKET OFF
        console.log({VALIDASOCKET:socket,rooms})
        if(!socket && rooms.length){
            console.log({SOCKEEET:socket})
            disconnect();
            setupWebsocket(rooms)
        }
    },[socket]);

    async function onSend(message = []) {
        message[0].room_id = selectedRoom._id;
        sendMessage({message_body:message[0]});
    }

    function loadChat() {
        if(selectedRoom){
                return ( 
                <div style={{height:'90%'}}>
                <GiftedChat
                    renderAvatar={null}
                    renderBubble={(message)=>{ return (<>
        <ListItem alignItems="flex-start" >
        <ListItemAvatar>
          <Avatar style={{height:50,width:50 }} variant="rounded" src={message.currentMessage.user.avatar_url} />
        </ListItemAvatar>
                                <ListItemText
          primary={message.currentMessage.user.name}
          secondary={message.currentMessage.text}
        />
      </ListItem>
      </>)
                        }}
                    isAnimated={true} 
                    className="opera"
                    messages={selectedRoom.messages}
                    placeholder={'Enviar mensagem ...'}
                    user={{
                        id: props_user._id,
                        name:props_user.name,
                        avatar_url:props_user.avatar_url
                    }}
                    onSend={(messages) => onSend(messages)}
                    />
                    </div>)
        } else {
            
            return (
            <>
            <Laura/>
                <h1 style={{textAlign: 'center',fontSize: 80,color: '#f4a52f'}}>LAURA CHAT</h1>
                <h2 style={{textAlign: 'center',color: '#f4a52f',fontWeight:'900'}}>Conectando profissionais da saúde em um só lugar </h2>
                <h3 style={{textAlign: 'center',color: '#2988cb'}}>Crie grupos de discussão ou acompanhamento clínico</h3>
                <h3 style={{textAlign: 'center',color: '#28c4e3'}}>Organize e atribua tarefas para seus colegas ou grupos</h3>
                <h3 style={{textAlign: 'center',color: '#82e1f7'}}>Crie anotações sobre o quadro clínico dos pacientes nas salas de acompanhamento </h3>
            </> 
            )
        }
    }

    async function _handleKeyDown(e) {
        if (e.key === 'Enter') {
            let resp = await createTask({task_name: e.target.value,
                                       owner_name:props_user.name,
                                       owner_id:props_user._id,
                                       room_id: selectedRoom._id,
                                       room_name: selectedRoom.room_name
                                      })
            if (resp.success){
                loadTask()
            }                          
        }
    }

    async function _handleKeyDownAnnotation(e) {
        if (e.key === 'Enter') {
            let res = await createAnnotation({room_id:selectedRoom._id,
                                            text:e.target.value,
                                            owner_id:props_user._id,
                                            name:props_user.name});
                                            console.log(res);
            if(res.success){
                setAnnotations(res.annotations);
            } else {
                setAnnotations([]);
            }
            loadAnnotations()                      
        }
    }

    function loadDrawyer(tasks,annotations) {
        let drawer_content = [];
        drawer_content.push(<h3 style={{textAlign:'center'}} > Tarefas</h3>)
        if(tasks) {
            tasks.forEach((task)=>{
                drawer_content.push(<Task loadTask={loadTask} members={selectedRoom.members} task={task} />)
            })
        }
        drawer_content.push(<TextField id="outlined-task" label="Criar Tarefa" variant="outlined" onKeyDown={_handleKeyDown} />);
        if(annotations) {
            drawer_content.push(<h3 style={{marginTop:10,textAlign:'center'}}> Anotações</h3>)
            annotations.forEach((annotation)=>{
                drawer_content.push(<Annotation annotation={annotation}  />)
            })
            drawer_content.push(<TextField id="outlined-annotation" label="Criar Anotações" variant="outlined" onKeyDown={_handleKeyDownAnnotation} />);
        }
        return drawer_content;
    }

    return (
        <Container className="container" maxWidth style={{padding:0}} >
            <Grid container className="container" >
                <Grid item xs={4}  style={{ backgroundColor:'#f4a52f',height:'100%',maxHeight:'100%',padding:20}} >
                    <RoomsList rooms={rooms} setSocket={setSocket} setSelectedRoom={setSelectedRoom} fetchUserRooms={fetchUserRooms} />
                </Grid>
                <Grid item xs={8} style={{backgroundColor:'#FFF',height:'100%',maxHeight:'100%'}}>
                <AppBar elevation={0} position="static" style={{padding:0,backgroundColor:'#f4a52f'}}>
                    <Toolbar >
                    {selectedRoom?
                    <>
                    <Room key={selectedRoom._id} room={selectedRoom} user_id={props_user._id} />
                    <IconButton  edge="start" onClick={()=>setDrawer(true)} edge="end" color="inherit" aria-label="menu">
                      <MenuIcon />
                    </IconButton> 
                    </>     
                    :
                    false
                    }
                  </Toolbar>
                </AppBar>
                    {loadChat()}
                </Grid>
                <Drawer style={{padding:20}} className={"drawer"} anchor="right" open={drawer} onClose={()=>setDrawer(false)}>
                    {loadDrawyer(tasks,annotations)}
                </Drawer>
            </Grid>
        </Container>
    );
} 