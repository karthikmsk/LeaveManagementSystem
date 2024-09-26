import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { createLeaveRequest, updateLeaveRequest, getLeaveRequestById } from '../api/leaveRequestApi'; 
import { getEmployees } from '../api/employeeApi'; 
import { getLeaveTypes } from '../api/leaveTypeApi'; 
import 'bootstrap/dist/css/bootstrap.min.css';

const LeaveRequestForm = ({ leaveRequest: initialLeaveRequest, onFormSubmit, onCancel }) => {
    const { id } = useParams();

    const [leaveRequest, setLeaveRequest] = useState({
        employee: { employeeId: '' },
        leaveType: { leaveTypeId: '' },
        startDate: '',
        endDate: '',
        status: 'PENDING',
        reason: ''
    });
    const [employees, setEmployees] = useState([]);
    const [leaveTypes, setLeaveTypes] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id) {
            const fetchLeaveRequest = async () => {
                try {
                    const response = await getLeaveRequestById(id);
                    setLeaveRequest(response.data);
                } catch (error) {
                    setError('Error fetching leave request data. Please try again later.');
                }
            };
            fetchLeaveRequest();
        } else {
            setLeaveRequest(initialLeaveRequest || {});
        }
    }, [id, initialLeaveRequest]);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await getEmployees();
                setEmployees(response.data);
            } catch (error) {
                setError('Error fetching employees. Please try again later.');
            }
        };

        const fetchLeaveTypes = async () => {
            try {
                const response = await getLeaveTypes();
                setLeaveTypes(response.data);
            } catch (error) {
                setError('Error fetching leave types. Please try again later.');
            }
        };

        fetchEmployees();
        fetchLeaveTypes();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        if (name.startsWith('employee')) {
            setLeaveRequest(prevState => ({
                ...prevState,
                employee: { employeeId: value }
            }));
        } else if (name.startsWith('leaveType')) {
            setLeaveRequest(prevState => ({
                ...prevState,
                leaveType: { leaveTypeId: value }
            }));
        } else {
            setLeaveRequest(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await updateLeaveRequest(id, leaveRequest);
            } else {
                await createLeaveRequest(leaveRequest);
            }
            onFormSubmit(leaveRequest);
        } catch (error) {
            setError('Error saving leave request data. Please try again later.');
        }
    };

    return (
        <div className="container mt-4" style={{ maxWidth: '600px' }}>
            <h3 className="mb-4">{id ? 'Edit Leave Request' : 'Add Leave Request'}</h3>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                    <label htmlFor="employeeId">Employee ID:</label>
                    <select
                        id="employeeId"
                        name="employeeId"
                        value={leaveRequest.employee?.employeeId || ''}
                        onChange={handleChange}
                        className="form-control"
                        required
                    >
                        <option value="">Select Employee</option>
                        {employees.map(emp => (
                            <option key={emp.employeeId} value={emp.employeeId}>
                                {emp.employeeId}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {emp.name} 
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="leaveTypeId">Leave Type:</label>
                    <select
                        id="leaveTypeId"
                        name="leaveTypeId"
                        value={leaveRequest.leaveType?.leaveTypeId || ''}
                        onChange={handleChange}
                        className="form-control"
                        required
                    >
                        <option value="">Select Leave Type</option>
                        {leaveTypes.map(leave => (
                            <option key={leave.leaveTypeId} value={leave.leaveTypeId}>
                                {leave.leaveTypeId}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {leave.leaveCategory}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="startDate">Start Date:</label>
                    <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        value={leaveRequest.startDate || ''}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="endDate">End Date:</label>
                    <input
                        type="date"
                        id="endDate"
                        name="endDate"
                        value={leaveRequest.endDate || ''}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="status">Status:</label>
                    <select
                        id="status"
                        name="status"
                        value={leaveRequest.status || 'PENDING'}
                        onChange={handleChange}
                        className="form-control"
                    >
                        <option value="PENDING">PENDING</option>
                        <option value="APPROVED">APPROVED</option>
                        <option value="REJECTED">REJECTED</option>
                    </select>
                </div>
                <div className="form-group mb-4">
                    <label htmlFor="reason">Reason:</label>
                    <textarea
                        id="reason"
                        name="reason"
                        value={leaveRequest.reason || ''}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary" style={{ maxWidth: '600px' }}>
                    {id ? 'Save' : 'Save'}
                </button>
                {onCancel && (
                    <button type="button" className="btn btn-secondary ml-2" onClick={onCancel}>
                        Cancel
                    </button>
                )}
            </form>
        </div>
    );
};

export default LeaveRequestForm;
