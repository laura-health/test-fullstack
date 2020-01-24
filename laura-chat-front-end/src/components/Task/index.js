import React ,{useState}from 'react';
import {ListItem,Menu ,MenuItem ,Button,Avatar,ListItemAvatar,ListItemText,Checkbox,ListItemIcon ,ListItemSecondaryAction } from '@material-ui/core';
import {completeTask} from '../../services/api/task';
import MemberSelector from './MemberSelector';
import './style.scss';

export default function Task (props){
    const [complete,setComplete] = useState(props.task.complete);

    async function operateTask(e) {
        if(e.target.checked){
            setComplete(e.target.checked)
            let response = await completeTask({task_id: props.task._id});
            if(response.success){
                props.loadTask()
            }
        }
    }

    return (
        <ListItem  divider alignItems="flex-start">
            <ListItemIcon>
                <Checkbox
                    edge="start"
                    checked={complete}
                    tabIndex={-1}
                    disableRipple
                    onClick={(e) => operateTask(e)}
                  />
            </ListItemIcon>
            <ListItemText primary={props.task.task_name} />
            <ListItemSecondaryAction>
                <MemberSelector members={props.members} task={props.task} />
            </ListItemSecondaryAction>
        </ListItem>
    );
} 