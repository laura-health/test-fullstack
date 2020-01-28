import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import SendIcon from '@material-ui/icons/Send';


const useStyles = makeStyles(theme => ({
  button: {
    backgroundColor: 'blueviolet',
    borderRadius: 40,
    fontSize: 12,
    padding: 10,
    boxShadow: "0 0 20px solid"
  },
}));

export default function SendButton(props) {
  const classes = useStyles();

  return (
    <div>
      <Button
        variant="contained"
        className={classes.button}
        endIcon={<SendIcon>send</SendIcon>}
        onClick={props.onClick}
      >
        Enviar
      </Button>
    </div>
  );
}
