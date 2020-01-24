const Task = require('../models/Task');

module.exports = {
    async findFilterTasks(request,response) {
        const {id} = request.params;
        let {filter} = request.query;
        let query = {};
        switch (filter) {
            case 'room':
                filter = "room_info.room_id"; 
                break;
            case 'user':
                filter = 'chosen_info.chosen_id';
                break;
            case 'owner':
                filter = "owner_id";
                break;
            default:
                break;
        }
        query[filter] = id;
        const tasks = await Task.find(query);
        if(tasks.length) {
            return response.send(tasks);
        } else {
            return response.status(401).send({error:'Tasks not found'});
        }
    },

    async createTask(request,response) {
        const {task_name,owner_name,owner_id,room_id,room_name} = request.body;
        const task = await Task.create({
            task_name,
            owner_name,
            owner_id,
            complete:false,
            room_info :{ room_id  ,
                         room_name }
        });
        if(task) {
            return response.send(task);
        } else {
            return response.status(401).send({error:'Error creating task'});
        }
    },

    async assignTask(request,response) {
        const {task_id,chosen_id,chosen_name,avatar_url} = request.body;
        const task = await Task.findOneAndUpdate({_id:task_id},{chosen_info:{chosen_id,chosen_name,avatar_url}},{new: true});
        if(task) {
            return response.send({task});
        }else {
            return response.status(400).send({error:'Task not found'});
        }
    },

    async completeTask(request,response) {
        const {task_id} = request.body;
        try {
            const task = await Task.findOneAndUpdate({_id:task_id},{complete:true},{new: true});
            if(task) {
                return response.send({task});
            }else {
                return response.status(400).send({error:'Task not found'});
            }
        } catch (error) {
            return response.status(500).send({error:'Task not found'});
        }
    },
};