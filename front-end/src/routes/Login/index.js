import React, { useState } from 'react';
import { Link } from 'react-router-dom'

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import { useStyles } from '../makeStyles';


export default function SignIn() {
  const classes = useStyles();
  const [auth, setAuth] = useState({});

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    console.log(auth)
  };

  const handleChange = (e) => {
    e.persist();
    setAuth(auth => ({ ...auth, [e.target.name]: e.target.value }));
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className="paper">
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className="form" onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={auth.name}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={auth.password}
            onChange={handleChange}

          />
          <FormControlLabel
            control={<Checkbox value="remember" color="" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/" className="redirect-msg">
                <div>Forgot password?</div>
              </Link>
            </Grid>
            <Grid item>
              <Link to="/" className="redirect-msg">
                <div>Don't have an account? Sign Up</div>
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}