import api from '../../constants/api';

export const getAnnotations = async (params) => {
    try {
        const response = await api.get(`/annotations/${params}`)
        return response.data;            
    } catch (error) {
        return {success: false, message: 'Ocorreu um erro interno!'};
    } 
}

export const createAnnotation = async (params) => {
    try {
        const response = await api.post(`/annotations/create`,params)
        return response.data;           
    } catch (error) {
        return {success: false, message: 'Ocorreu um erro interno!'};
    } 
}