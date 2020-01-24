import api from '../../constants/api';
export const doLogin = async (params) => {
    try {
        const response = await api.post(`/users/login`,params)
        return {success: true, payload: response};            
    } catch (error) {
        return {success: false, message: 'Ocorreu um erro interno!'};
    } 
}

export const getUserRooms = async (params) => {
    try {
        const response = await api.get(`/rooms/${params}`);
        return {success: true, payload: response};            
    } catch (error) {
        return {success: false, message: 'Ocorreu um erro interno!'};
    } 
}

export const sendMessage = async (params) => {
    try {
        const response = await api.put(`/rooms/sendMessage`,params);
        return {success: true, payload: response};            
    } catch (error) {
        return {success: false, message: 'Ocorreu um erro interno!'};
    }
}

export const createUser = async (params) => {
    try {
        const response = await api.post(`/users/create`,params);
        return {success: response.data.success, payload: response.data};            
    } catch (error) {
        return {success: false, message: 'Ocorreu um erro interno!'};
    }
}