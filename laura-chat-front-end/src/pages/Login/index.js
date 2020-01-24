import React,{useState} from 'react';
import Laura from '../../components/Laura';
import {Container,Grid } from '@material-ui/core';
import Fade from '@material-ui/core/Fade';
import LoginForm from './LoginForm';
import SignInForm from './SignInForm';

import './style.scss';

export default function Login() {
    const [signIn,setSignIn] = useState(false);

    return (
        <Container className={"container"} maxWidth={false} fixed>
            <Grid container spacing={3}>
                <Grid item xs={12} >
                    <h1 style={{textAlign: 'center',fontSize: 80,color: '#f4a52f'}}>LAURA CHAT</h1>
                    <Laura />
                </Grid>
                <Grid item xs={12} >
                    {signIn?
                        <Fade in={true}>
                            <SignInForm setSignIn={setSignIn} />
                        </Fade>
                        :
                        <Fade in={true}>
                            <LoginForm setSignIn={setSignIn} />
                        </Fade>
                    }

                </Grid>
            </Grid>
        </Container>
    );
} 