import React from 'react';
import Routes from './routes/routes';
import {Provider} from 'react-redux';
import {useRoutes,useRedirect,usePath} from 'hookrouter';
import NotFound from './components/NotFound';
import store from './store';
import {loadState,saveState} from './store/localStorage';
import {userLogged} from './routes/auth';
import './App.scss';

//Set litener in redux store to update localstorage
store.subscribe(()=>{
  saveState(store.getState());
});

const App = () => {
  const routeResult = useRoutes(Routes)
  /*let logged = userLogged();
  useRedirect(logged?'/':'/dashboard',logged?'/dashboard':'/')*/
  return ( 
            <Provider store={store}>
              {routeResult || <NotFound />}
            </Provider>)
};

export default App;
