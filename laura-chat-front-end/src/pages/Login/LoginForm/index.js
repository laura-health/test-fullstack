import React,{useState} from 'react';
import {TextField,Grid,Button,Snackbar,Divider } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import {doLogin} from '../../../services/api/user';
import {useDispatch} from 'react-redux';
import {navigate} from 'hookrouter';
import addUserInfo from '../../../store/actions/User';

import './style.scss';

export default function LoginForm(props) {
    const [login,setLogin] = useState('');
    const [password,setPassword] = useState('');
    const [open,setOpen] = useState(false);
    const [message,setMessage] = useState('');
    const dispatch = useDispatch();

    async function handleLogin() {
        const res = await doLogin({login,password})
        if(res.success){
            dispatch(addUserInfo(res.payload.data.user))
            sessionStorage.setItem('user', JSON.stringify(res.payload.data.user));
            setMessage('success')
            setOpen(true);
            navigate('/dashboard');
        }else {
            setMessage('error')
            setOpen(true);
        }
    }

    function handleClose (event, reason) {
        if (reason === 'clickaway') {
          return setOpen(false);
        }
        setOpen(false);
      };

    return (
        <Grid container direction="column" justify="space-between" alignItems="center">
                <TextField id="Login" 
                           onChange={(e)=>setLogin(e.target.value)} 
                           required  
                           label="Login" />
                <TextField id="Password"
                           onChange={(e)=>setPassword(e.target.value)}
                           required  
                           label="Senha" 
                           autoComplete="current-password" 
                           type="password"

                           />
                <div style={{marginTop:20}}>
                <Button style={{width:'100%'}} onClick={()=> handleLogin()}
                        className="loginButton" variant="contained" color="#f4a029">
                    Login
                </Button>
                <Divider />
                <Button onClick={()=> props.setSignIn(true)}
                        className="loginButton" variant="contained" color="#f4a029">
                    Cadastrar
                </Button>
                </div>
                <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                    <MuiAlert elevation={6}
                              variant="filled"
                              onClose={handleClose}
                              severity={message}>
                        {message === 'error'?'As informações para fazer o login estão incorretas!':'Login efetuado com sucesso'} 
                    </MuiAlert >
                </Snackbar>
        </Grid>
    );
} 