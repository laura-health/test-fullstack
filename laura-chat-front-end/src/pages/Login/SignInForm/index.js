import React,{ useState} from 'react';
import {TextField,Grid,Button,Snackbar,Divider,Select,MenuItem } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import {doLogin,createUser} from '../../../services/api/user';
import {USER_TYPE} from '../../../constants/user';
import {useDispatch} from 'react-redux';
import {navigate} from 'hookrouter';
import addUserInfo from '../../../store/actions/User';

import './style.scss';

export default function SignInForm(props) {
    const [name,setName] = useState('');
    const [login,setLogin] = useState('');
    const [password,setPassword] = useState('');
    const [open,setOpen] = useState(false);
    const [message,setMessage] = useState('');
    const [image,setImage] = useState(null);
    const [image_URL,setImageURL] = useState(false);
    const [user_type,setUsertype] = useState('');
    const dispatch = useDispatch();

    function handleClose (event, reason) {
        if (reason === 'clickaway') {
          return setOpen(false);
        }
        setOpen(false);
    };

    async function createUserAccount() {

        const data = new FormData() 
        data.append('name', name)
        data.append('login', login)
        data.append('password', password)
        data.append('user_type', user_type)
        data.append('file', image)

        let res = await createUser(data);
        console.log(res);
        if(res.success){
            dispatch(addUserInfo(res.user))
            setMessage('success');
            setOpen(true);
            navigate('/dashboard');
        } else {
            setMessage('error');
            setOpen(true);
        }
    }

    function onFileInputChange(e){
        setImage(e.target.files[0]);
        setImageURL(URL.createObjectURL(e.target.files[0]));
        console.log(e.target.files[0])
    }

    return (
        <Grid container direction="column" justify="space-between" alignItems="center">
                {image_URL? <img style={{width:'100px',height:'100px',borderRadius:50}} src={image_URL}/>:false}
                <input
                     accept="image/*"
                     name="file"
                      onChange={onFileInputChange}
                     style={{display:'none'}}
                     id="contained-button-file"
                     multiple
                     type="file"
                />
                <label htmlFor="contained-button-file">
                  <Button variant="contained" color="primary" component="span">
                  {image_URL?'Alterar Avatar':'Imagem Avatar'}
                  </Button>
                </label>
                <TextField id="create-name" 
                           variant="outlined"
                           onChange={(e)=>setName(e.target.value)} 
                           required  
                           label="Nome" />
                           
                <TextField id="create-login" 
                           variant="outlined"
                           onChange={(e)=>setLogin(e.target.value)} 
                           required  
                           label="Login" />
                <TextField id="create-password"
                           variant="outlined"
                           onChange={(e)=>setPassword(e.target.value)}
                           required  
                           label="Senha" 
                           type="password"
                           />
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={user_type}
                  onChange={(value)=>{setUsertype(value.target.value)}}
                  >
                    {Object.keys(USER_TYPE).map((type)=>{ 
                        return <MenuItem value={USER_TYPE[type]}>{USER_TYPE[type]}</MenuItem>
                    })}
                </Select>
                <div style={{marginTop:20}}>
 
                <Divider />
                <Button onClick={()=> createUserAccount()}
                        className="loginButton" variant="contained" color="#f4a029">
                    Cadastrar
                </Button>
                </div>
                <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                    <MuiAlert elevation={6}
                              variant="filled"
                              onClose={handleClose}
                              severity={message}>
                              {message === 'error'?'Houve um erro no cadastro !':'Cadastro efetuado com sucesso'} 
                    </MuiAlert >
                </Snackbar>
        </Grid>
    );
} 