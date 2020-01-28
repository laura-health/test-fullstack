import React from 'react';
import { Switch, Route } from 'react-router';

import Register from './routes/Register';
import Login from './routes/Login';
import ChatRoom from './routes/ChatRoom';

export default() => {
    return (
        <Switch>
            <Route exact path="/" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/chat-room" component={ChatRoom} />
        </Switch>
    )
}