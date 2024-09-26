import axios from 'axios';

// Base API URL (Consider using environment variables)
const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:9000';

// Endpoints
const API_URL = `${BASE_URL}/leave-balances`;
const LEAVE_TYPE_URL = `${BASE_URL}/leave-types`;
const EMPLOYEE_URL = `${BASE_URL}/employees`;

// API Request functions
export const getLeaveBalances = async () => {
    try {
        return await axios.get(API_URL);
    } catch (error) {
        handleAxiosError(error);
    }
};

export const getLeaveBalanceById = async (id) => {
    try {
        return await axios.get(`${API_URL}/${id}`);
    } catch (error) {
        handleAxiosError(error);
    }
};

export const createLeaveBalance = async (leaveBalance) => {
    try {
        const response = await axios.post(API_URL, leaveBalance);
        console.log('Created Leave Balance:', response.data); 
        return response;
    } catch (error) {
        handleAxiosError(error);
    }
};

export const updateLeaveBalance = async (id, leaveBalance) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, leaveBalance);
        console.log('Updated Leave Balance:', response.data);
        return response;
    } catch (error) {
        handleAxiosError(error);
    }
};

export const deleteLeaveBalance = async (id) => {
    try {
        return await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        handleAxiosError(error);
    }
};

export const getLeaveTypes = async () => {
    try {
        return await axios.get(LEAVE_TYPE_URL);
    } catch (error) {
        handleAxiosError(error);
    }
};

export const getEmployees = async () => {
    try {
        return await axios.get(EMPLOYEE_URL);
    } catch (error) {
        handleAxiosError(error);
    }
};

// Helper to handle axios errors
const handleAxiosError = (error) => {
    if (error.response) {
        console.error('Server responded with a non 2xx status:', error.response.status, error.response.data);
    } else if (error.request) {
        console.error('Request was made but no response received:', error.request);
    } else {
        console.error('Error setting up the request:', error.message);
    }
    throw error;
};
