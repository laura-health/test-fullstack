import React, { useState } from 'react';
import { Link } from 'react-router-dom'

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { ENDPOINT } from '../api';

import { useStyles } from '../makeStyles';


export default function Register() {
  const classes = useStyles();
  const [error, setError] = useState("");
  const [auth, setAuth] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(auth)
    fetch(ENDPOINT + "/register", {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(auth)
    })
    .then(response => {
      if ([400, 401, 500].includes(response.status)) {
        throw new Error('Response status was 400, 401, or 403!');
      }
    
      return response.json();
    })
    .then(json => console.log(json))
    .catch(error => console.error(error))
  };

  const handleChange = (e) => {
    e.persist();
    setAuth(auth => ({ ...auth, [e.target.name]: e.target.value }));
  };

  const handleClick = () => {

  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className="paper">
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                autoComplete="fname"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
                onChange={handleChange}
                value={auth.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleChange}
                value={auth.email}
              />
              <div>{error}</div>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
                value={auth.password}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
            onClick={handleClick}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/login" className="redirect-msg">
                <span>Already have an account? Sign in</span>
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}