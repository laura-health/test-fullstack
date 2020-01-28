import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import ListAltIcon from '@material-ui/icons/ListAlt';
import CloseIcon from '@material-ui/icons/Close';
import Tooltip from '@material-ui/core/Tooltip';
import CustomInput from '../CustomInput';


const useStyles = makeStyles(() =>
    createStyles({
        paper: {
            float: 'right',
            minWidth: 285,
            minHeight: '100%',
            backgroundColor: '#7a1dd0',
            border: 'none',
            padding: '20px 20px',
            overflowY: 'auto',
            boxShadow: '0 0 10px black',
        },
    }),
);

const ModalRight = props => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="modal-container">
            <div onClick={handleOpen} className="clickable">
                <Tooltip title="Tasks" arrow>
                    <ListAltIcon />
                </Tooltip>
            </div>
            <Modal hideBackdrop
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                onClose={handleClose}
            >
                <div className={classes.paper}>
                    <div>
                        <div className="float-right clickable">
                            <CloseIcon onClick={handleClose}/>
                        </div>
                        <span className="modal-title">Tasks</span>
                    </div>
                    <CustomInput/>
                    <div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default ModalRight;
