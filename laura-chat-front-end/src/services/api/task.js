import api from '../../constants/api';
export const getRoomsTasks = async (params,query_params) => {
    try {
        const response = await api.get(`/tasks/${params}`,{params:query_params})
        return {success: true, payload: response};            
    } catch (error) {
        return {success: false, message: 'Ocorreu um erro interno!'};
    } 
}

export const createTask = async (params) => {
    try {
        const response = await api.post(`/tasks/create`,params)
        return {success: true, payload: response};            
    } catch (error) {
        return {success: false, message: 'Ocorreu um erro interno!'};
    } 
}

export const assignTask = async (params) => {
    try {
        const response = await api.put(`/tasks/assign`,params)
        return {success: true, payload: response};            
    } catch (error) {
        return {success: false, message: 'Ocorreu um erro interno!'};
    } 
}

export const completeTask = async (params) => {
    try {
        const response = await api.put(`/tasks/complete`,params)
        return {success: true, payload: response};            
    } catch (error) {
        return {success: false, message: 'Ocorreu um erro interno!'};
    } 
}