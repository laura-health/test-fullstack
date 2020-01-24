import React from 'react';
import Paper from '@material-ui/core/Paper';
import './style.scss';

export default function Annotation(props) {
    return (
        <>
        <h4> {props.annotation.name}</h4>
        <Paper className="annotation" elevation={2} > {props.annotation.text} </Paper>
        </>
    );
}