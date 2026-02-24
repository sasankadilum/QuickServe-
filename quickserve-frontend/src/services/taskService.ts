import API from './api';

export const createServiceRequest = async (requestData: any) => {
    return await API.post('/services/create', requestData);
};

export const getMyRequests = async () => {
    return await API.get('/services/my-requests');
};