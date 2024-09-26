import axios from 'axios';

const API_URL = 'http://localhost:9000/leave-requests';

export const getLeaveRequests = () => axios.get(API_URL);
export const getLeaveRequestById = (id) => axios.get(`${API_URL}/${id}`);
export const createLeaveRequest = (leaveRequest) => axios.post(API_URL, leaveRequest);
export const updateLeaveRequest = (id, leaveRequest) => axios.put(`${API_URL}/${id}`, leaveRequest);
export const deleteLeaveRequest = (id) => axios.delete(`${API_URL}/${id}`);
