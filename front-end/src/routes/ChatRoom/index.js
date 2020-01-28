import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import SendButton from '../../components/SendButton';
import { ENDPOINT, SOCKET } from '../api';
import '../../Styles.css';
import ModalRight from '../../components/Modal';



const ChatRoom = () => {
    const [listMessages, setListMessages] = useState([""])
    const [message, setMessage] = useState("");
    const [send, setSend] = useState(false);

    const [users, setUser] = useState([""]);
    const [channels, setChannels] = useState(["General", "Product"])

    async function fetchData() {
        const res = await fetch(ENDPOINT + "/users");
        res
            .json()
            .then(res => setUser(res))
    }

    useEffect(() => {
        getMessages()
        fetchData();
    }, [listMessages.length])


    const getMessages = () => {
        SOCKET.on("message", msg => {
            setListMessages([...listMessages, msg]);
        });
    };

    const handleChange = e => {
        setMessage(e.target.value);
    };

    const handleClick = () => {
        if (message !== "") {
            SOCKET.emit("message", message)
            setMessage("");
            setSend(true)
        }
    };

    const onEnterPress = (e) => {
        if (e.keyCode == 13 && e.shiftKey == false) {
            e.preventDefault();
            SOCKET.emit("message", message)
            setMessage("");
            setSend(true)
        }
    };

    return (
        <Grid container>
            <Grid item xs={2} className="sidenav">
                <div className="user-sidenav">Vivian}</div>
                <div className="menu">
                    <div style={{ marginBottom: 20 }}>
                        <span className="menu-itens">Rooms</span>
                        {channels.map(channel =>
                            <div className="channels"># {channel}</div>
                        )}
                    </div>
                    <div>
                        <span className="menu-itens">Users</span>
                        {users.map(user =>
                            <div className="users">{user.name}</div>
                        )}
                    </div>
                </div>

            </Grid>
            <Grid item xs={10} className="chat-room">
                <ModalRight/>
                <div className="h-line" />
                <div className="box-message">
                    {listMessages.length > 0 &&
                        listMessages.map(msg => (
                            <div>
                                {send == true && <span className="text-title">Vivian:</span>}
                                <div className="text">{msg}</div>
                            </div>
                        ))}
                    <div style={{ display: 'flex' }}>
                        <textarea
                            className="input-message"
                            onChange={handleChange}
                            value={message}
                            name="message"
                            onKeyDown={onEnterPress}
                        >
                        </textarea>
                        <SendButton
                            onClick={handleClick}
                        />

                    </div>
                </div>
            </Grid>
        </Grid>
    );
}

export default ChatRoom;
