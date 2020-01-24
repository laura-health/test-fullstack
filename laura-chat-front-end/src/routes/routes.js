import React from 'react';
import Login from '../pages/Login';
import Chat from '../pages/Chat';

const Routes = {
    "/": () =>  <Login />,
    "/dashboard": () => <Chat />,
  };

export default Routes;

