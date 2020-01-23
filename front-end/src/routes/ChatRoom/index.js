import React from 'react';
import Grid from '@material-ui/core/Grid';
import '../../Styles.css';

class ChatRoom extends React.Component {

    render() {
        return (
            <Grid container>
                <Grid item xs={2} className="sidenav">
                    <div className="user-sidenav">Vivian Polli</div>
                    <div className="menu">
                        <div style={{marginBottom: 20}}>
                            <span className="menu-itens">Rooms</span>
                            <div className="channels"># General</div>
                            <div className="channels"># Product</div>
                        </div>
                        <div>
                            <span className="menu-itens">Users</span>
                            <div className="users">Vivian</div>
                        </div>           
                    </div>

                </Grid>
                <Grid item xs={10} className="chat-room">
                    <div className="h-line"/>
                    <textarea className="box-message">                      

                    </textarea>
                </Grid>

            </Grid>

        );

    }
}

export default ChatRoom;
