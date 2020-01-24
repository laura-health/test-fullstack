import React from 'react';
import {Menu ,
        MenuItem ,
        Avatar,
        ListItemAvatar,
        ListItemText } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { assignTask } from '../../../services/api/task';
import './style.scss';

export default function MemberSelector(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selected, setSelected] = React.useState(props.task.chosen_info.chosen_id?props.task.chosen_info:false);


  function handleClick (event) {
    console.log({event});
    setAnchorEl(event.currentTarget);
  };

  function handleClose() {
    setAnchorEl(null);
  };

  async function assignUserTask(params) {    
    let response = await assignTask(params);
    if(response.success){
      setSelected(response.payload.data.task.chosen_info)
      setAnchorEl(null);
    }
  }

  const StyledMenu = withStyles({
      paper: {
        border: '1px solid #d3d4d5',
      },
    })(props => (
      <Menu
        elevation={2}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        {...props}
      />
  ));

    const StyledMenuItem = withStyles(theme => ({
      root: {
        '&:focus': {
          backgroundColor: theme.palette.primary.main,
          '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
            color: theme.palette.common.white,
          },
        },
      },
    }))(MenuItem);

    let members = props.members;

    let memberoptions = [];
    members.map((member=>{
        memberoptions.push(<StyledMenuItem key={member._id} onClick={()=> assignUserTask({
          task_id: props.task._id,
          chosen_id:member._id,
          chosen_name:member.name,
          avatar_url:member.avatar_url
         })}>
            <ListItemAvatar>
              <Avatar fontSize="small" src={member.avatar_url} />
            </ListItemAvatar>
            <ListItemText primary={member.name} />
          </StyledMenuItem>);
    }))
    return (
      <>
      {selected?
    <MenuItem onClick={handleClick}>
        <ListItemAvatar>
          <Avatar fontSize="small" src={selected.avatar_url} />
        </ListItemAvatar>
        <ListItemText primary={selected.chosen_name} />
      </MenuItem>
    :<button aria-controls="customized-menu"
    aria-haspopup="true"
    variant="contained"
    color="primary"
    onClick={handleClick}
>
Atribuir Tarefa
</button>}
                <StyledMenu id="customized-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                >
        {memberoptions}
      </StyledMenu>
      </>
    );
} 