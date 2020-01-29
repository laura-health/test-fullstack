import React from 'react';
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

import Register from './routes/Register';
import Login from './routes/Login';
import ChatRoom from './routes/ChatRoom';

export default () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Register} />
                <Route path="/login" component={Login} />
                <Route path="/chat-room" component={ChatRoom} />
            </Switch>
        </Router>
    )
}