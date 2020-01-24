import React ,{useState,useEffect} from 'react';
import {ListItem,
        Dialog ,
        List,
        MenuItem ,
        DialogTitle,
        DialogContent,
        DialogContentText,
        ListItemText,
        ExpansionPanel,
        ListItemIcon,
        Typography,
        ExpansionPanelSummary,
        TextField,
        Fab,
        Paper,
        ExpansionPanelDetails,
        Select,
        Grid } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import socketclient  from '../../services/socket';
import {
    findRooms,
    getPossibilities,
    createRoom,
    joinRoom } from '../../services/api/room';
import Loader from 'react-loader-spinner';
import { ROOM_TYPE } from '../../constants/room';
import './style.scss';
import { useSelector } from 'react-redux';

export default function RoomDialog (props){
    const [loading,setLoading] = useState(false);
    const [loadingUser,setLoadingUser] = useState(false);
    const [possibilities,setPossibilities] = useState(false);
    const [roomCreateName,setRoomCreateName] = useState(false);
    const [roomCreateType,setRoomCreateType] = useState(ROOM_TYPE.GRUPOS);
    const [roomCreatePossibilities,setRoomCreatePossibilities] = useState(false);
    const [roomsJoin,setRoomsJoin] = useState(false);
    const user = useSelector(state => state.user);

    useEffect(()=> {
        if(roomCreateType === ROOM_TYPE.PRIVADO || roomCreateType === ROOM_TYPE.ACOMPANHAMENTO) {
            setLoadingUser(true)
            loadPossibilities();
        }else {
            setLoadingUser(false)
            setPossibilities(false)
        }
    },[roomCreateType]);

    async function loadPossibilities(){
        let res = await getPossibilities(user._id,{filter:roomCreateType});
        setPossibilities(old_state => res.success ? res.possibilities : [] );
        setLoadingUser(false)
    }

    async function joinInRoom(room) {
        let response = await joinRoom({room_id  : room._id,
                                       user_id  : user._id,
                                       user_name: user.name
        });
        if(response.success) {
            let resp = await props.fetchUserRooms();
            props.setOpen(false);
            socketclient.connect()
            socketclient.emit('addNewRoom',response.payload.data)
            props.setSocket(false)
        }
    }

    async function createNewRoom() {
        let patient = {};
        let possibilitie_user = roomCreatePossibilities?
        Object.values( possibilities ).find( possibilitie => possibilitie._id === roomCreatePossibilities) : false;
        //Set default user member room
        let members = [{user_id:user._id,name:user.name,avatar_url:user.avatar_url}];
        if(possibilitie_user) {
            if(roomCreateType === ROOM_TYPE.PRIVADO){
                members.push({user_id:possibilitie_user._id,name:possibilitie_user.name,avatar_url:possibilitie_user.avatar_url})
            }
            if(roomCreateType === ROOM_TYPE.ACOMPANHAMENTO){
                patient = {patient_id:possibilitie_user._id,name:possibilitie_user.name};
            }
        }
        let response = await createRoom({
            owner_id: user._id,
            room_name: roomCreateType === ROOM_TYPE.PRIVADO?"Sala Privada":roomCreateType === ROOM_TYPE.ACOMPANHAMENTO? `Acompanhamento Clínico de ${possibilitie_user.name}`:roomCreateName ,
            room_type: roomCreateType,
            members,
            patient
        });

        if(response.success){
            let resp = await props.fetchUserRooms();
            props.setOpen(false);
            socketclient.connect()
            socketclient.emit('addNewRoom',response.payload.data)
            props.setSocket(false)
            setRoomCreateType(ROOM_TYPE.GRUPOS)
        }
    }

    async function _handleRoomSearchKeyDown(e) {
        if (e.key === 'Enter') {
            setLoading(true)
            let resp = await findRooms(user._id,{filter:e.target.value})
            setRoomsJoin(resp.payload.data.success?resp.payload.data.rooms:[])
            setLoading(false)
            
        }
    }

    return (
        <Dialog open={props.open} onClose={()=>props.setOpen(false)} aria-labelledby="search-room">
        <DialogTitle id="search-room">Encontrar nova sala</DialogTitle>
        <DialogContent>
            <DialogContentText>
            Você pode criar uma nova sala ou participar de alguma. 
            </DialogContentText>
            <ExpansionPanel style={{width:'100%',padding: 0}}>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  id="panel1a-header"
                >
                <ListItemIcon>
                    <AddCircleOutlineIcon />
                </ListItemIcon>
                <Typography >Criar uma nova sala</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                        {possibilities?
                        false                        
                        :
                        loadingUser?
                        false
                        :
                        <TextField
                                style={{width:'100%'}}
                                margin="dense"
                                id="name-create"
                                label="Nome da Sala"
                                fullWidth
                                onChange={(value)=>setRoomCreateName(value.target.value)}
                                />
                        }
                        </Grid>
                        <Grid item xs={6} sm={4}>                     
                            <Select
                              style={{maxWidth:'100%'}}
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={roomCreateType}
                              onChange={(value)=>{setRoomCreateType(value.target.value)}}
                              >
                                {Object.values(ROOM_TYPE).map((type)=>{ 
                                return <MenuItem value={type}>{type}</MenuItem>
                                })}
                            </Select>
                        </Grid>
                        <Grid item xs={4} sm={6}>
                            {loadingUser?            
                                <Loader
                                        style={{textAlign:'center'}}
                                        type="ThreeDots"
                                        color="#f49d06"
                                        height={50}
                                        width={50}
                                        visible={loadingUser}
                                /> 
                                :
                                possibilities?   
                                    possibilities.length?
                                    <Select
                                       labelId="demo-simple-select-label"
                                       id="demo-simple-select"
                                       value={roomCreatePossibilities}
                                       onChange={(value)=>{ setRoomCreatePossibilities(value.target.value)}}
                                       >
                                         {Object.values(possibilities).map((possibilitie)=>{ 
                                             return <MenuItem value={possibilitie._id} >{possibilitie.name}</MenuItem>
                                         })}
                                     </Select>
                                     :
                                     <span>Você ja tem todos os usuários cadastrados no privado</span>
                                :
                                false
                            }
                        </Grid>
                        <Grid item xs={2} sm={2}>
                            {loadingUser?
                                false
                            :
                            possibilities?
                                possibilities.length?
                                    <Fab onClick={()=>createNewRoom()} size="small" color="#fff" ><AddCircleOutlineIcon /></Fab>
                                :
                                    false
                            :
                            <Fab onClick={()=>createNewRoom()} size="small" color="#fff" ><AddCircleOutlineIcon /></Fab>
                            }
                        </Grid>
                    </Grid>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <div style={{fontSize:20,fontWeight:'800',marginTop:10,textAlign:'center'}}>
                OU
            </div>
            
            <TextField
                        onKeyDown={_handleRoomSearchKeyDown}
                        margin="dense"
                        id="name"
                        label="Buscar salas"
                        fullWidth
                        />
            <Loader
                    style={{textAlign:'center'}}
                    type="RevolvingDot"
                    color="#f49d06"
                    height={100}
                    width={100}
                    visible={loading}
            />                                    
            <List component="nav" aria-label="main mailbox folders">
            {roomsJoin?
            roomsJoin.length?
            roomsJoin.map((room)=>{
                return(
                        <ListItem button onClick={()=>joinInRoom(room)}>
                        <ListItemText primary={room.room_name} />
                        </ListItem>)
            })
            :loading?false:<Paper style={{textAlign:'center',fontWeight: 700}} elevation={0} >Não encontrou salas com este nome.</Paper >
            :false}
            </List>
        </DialogContent>
    </Dialog>

    );

}