import API from './api';

export const registerUser = async (userData: any) => {
    return await API.post('/auth/register', userData);
};

export const loginUser = async (credentials: any) => {
    return await API.post('/auth/login', credentials);
};