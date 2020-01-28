import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const CssTextField = withStyles({
    root: {
        fontSize: 12,
        '& label.Mui-focused': {
            color: 'purple',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'purple',
        },
    },
})(TextField);

export default function CustomInput() {
    return (
        <form className="search-input" noValidate>
            <CssTextField id="custom-css-standard-input" label="Search Tasks" />
        </form>
    );
}