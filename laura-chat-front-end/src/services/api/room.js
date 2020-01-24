
import api from '../../constants/api';

export const findUserRooms = async (user_id,params) => {
    try {
        const response = await api.get(`/rooms/find/user/${user_id}`,{params:params})
        return {success: true, payload: response};            
    } catch (error) {
        return {success: false, message: 'Ocorreu um erro interno!'};
    } 
}

export const findRooms = async (user_id,params) => {
    try {
        const response = await api.get(`/rooms/find/room/${user_id}`,{params:params})
        return {success: true, payload: response};            
    } catch (error) {
        return {success: false, message: 'Ocorreu um erro interno!'};
    } 
}

export const getPossibilities = async(user_id,params) => {
    try {
        const response = await api.get(`/rooms/find/possibilities/${user_id}`,{params:params})
        return response.data;            
    } catch (error) {
        return {success: false, message: 'Ocorreu um erro interno!'};
    } 
}

export const createRoom = async(params) => {
    try {
        const response = await api.post(`/rooms/create`,params)
        return {success: true, payload: response};            
    } catch (error) {
        return {success: false, message: 'Ocorreu um erro interno!'};
    } 
}

export const joinRoom = async(params) => {
    console.log(params)
    try {
        const response = await api.put(`/rooms/join`,params)
        return {success: true, payload: response};            
    } catch (error) {
        return {success: false, message: 'Ocorreu um erro interno!'};
    } 
}