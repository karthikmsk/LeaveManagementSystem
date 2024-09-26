import axios from 'axios';

const API_URL = 'http://localhost:9000/leave-types';

export const getLeaveTypes = () => axios.get(API_URL);
export const getLeaveTypeById = (id) => axios.get(`${API_URL}/${id}`);
export const createLeaveType = (leaveType) => axios.post(API_URL, leaveType);
export const updateLeaveType = (id, leaveType) => axios.put(`${API_URL}/${id}`, leaveType);
export const deleteLeaveType = (id) => axios.delete(`${API_URL}/${id}`);
export const getLeaveCategories = async () => {
    const response = await axios.get('http://localhost:9000/api/leave-categories');
    return response.data;
};
