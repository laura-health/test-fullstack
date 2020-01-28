import React, { useState, useEffect } from 'react';
import io from "socket.io-client";
import Grid from '@material-ui/core/Grid';
import SendButton from '../../componentes/SendButton';
import '../../Styles.css';



const ENDPOINT = "http://localhost:5000";
const SOCKET = io.connect(`${ENDPOINT}`)


const ChatRoom = () => {
    const [listMessages, setListMessages] = useState([""])
    const [message, setMessage] = useState("");
    const [user, setUser] = useState("");
    const [channels, setChannels] = useState(["General", "Product"])

    useEffect(() => {
        getMessages();
    }, [listMessages.length]);

    const getMessages = () => {
        SOCKET.on("message", msg => {
            setListMessages([...listMessages, msg]);
        });
    };

    const handleChange = e => {
        setMessage(e.target.value);
    };

    const handleClick = () => {
        setUser({ user: "Vivian" })
        if (message !== "") {
            SOCKET.emit("message", message)
            setMessage("");
        }
    }

    return (
        <Grid container>
            <Grid item xs={2} className="sidenav">
                <div className="user-sidenav">{user}</div>
                <div className="menu">
                    <div style={{ marginBottom: 20 }}>
                        <span className="menu-itens">Rooms</span>
                        {channels.map(channel =>
                            <div className="channels"># {channel}</div>
                        )}
                    </div>
                    <div>
                        <span className="menu-itens">Users</span>
                        <div className="users">{users}</div>
                    </div>
                </div>

            </Grid>
            <Grid item xs={10} className="chat-room">
                <div className="h-line" />
                <div className="box-message">
                    {listMessages.length > 0 &&
                        listMessages.map(msg => (
                            <div>
                                <span className="text-title">{user}:</span>
                                <div className="text">{msg}</div>
                            </div>
                        ))}
                    <div style={{ display: 'flex' }}>
                        <textarea className="input-message"
                            onChange={handleChange}
                            value={message}
                            name="message"
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
