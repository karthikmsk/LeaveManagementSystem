import React, { useEffect, useState } from 'react';
import { getLeaveRequests, deleteLeaveRequest } from '../api/leaveRequestApi'; // Update import path if needed
import LeaveRequestForm from './LeaveRequestForm'; // Ensure you create this component
import 'bootstrap/dist/css/bootstrap.min.css';

const LeaveRequestList = () => {
    const [leaveRequests, setLeaveRequests] = useState([]);
    const [editingRequest, setEditingRequest] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false); // Controls form visibility

    useEffect(() => {
        const fetchLeaveRequests = async () => {
            try {
                const response = await getLeaveRequests();
                setLeaveRequests(response.data);
            } catch (error) {
                setError('Error fetching leave requests. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        fetchLeaveRequests();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteLeaveRequest(id);
            setLeaveRequests(leaveRequests.filter(req => req.requestId !== id));
        } catch (error) {
            setError('Error deleting leave request. Please try again later.');
        }
    };

    const handleEdit = (request) => {
        setEditingRequest(request);
        setShowForm(true); // Show the form when an entry is being edited
    };

    const handleFormSubmit = (updatedRequest) => {
        if (editingRequest) {
            // Update the specific leave request in the list
            setLeaveRequests(leaveRequests.map(req => (req.requestId === updatedRequest.requestId ? updatedRequest : req)));
        } else {
            // Add new request to the list
            setLeaveRequests([...leaveRequests, updatedRequest]);
        }
        setEditingRequest(null); // Clear editing request
        setShowForm(false); // Hide form after saving
    };

    const handleAddRequest = () => {
        setEditingRequest(null); // Clear any existing editing state
        setShowForm(true); // Show the form to add a new request
    };

    const handleCancelEdit = () => {
        setEditingRequest(null);
        setShowForm(false); // Hide the form without saving
    };

    if (loading) return <div className="text-center">Loading...</div>;
    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <div className="container mt-4">
            <h2 className="text-center">Leave Requests</h2>

            {/* Conditionally render the form only if showForm is true */}
            {showForm ? (
                <LeaveRequestForm
                    leaveRequest={editingRequest}
                    onFormSubmit={handleFormSubmit}
                    onCancel={handleCancelEdit} // Optional cancel button handling
                    editing={!!editingRequest} // Check if in editing mode
                />
            ) : (
                <button className="btn btn-success mb-4" onClick={handleAddRequest}>
                    Add New Leave Request
                </button>
            )}

            <table className="table table-striped table-hover">
                <thead className="thead-dark">
                    <tr>
                        <th>ID</th>
                        <th>Employee ID</th>
                        <th>Leave Category</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Status</th>
                        <th>Reason</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {leaveRequests.map(req => (
                        <tr key={req.requestId}>
                            <td>{req.requestId}</td>
                            <td>{req.employee?.name}</td>
                            <td>{req.leaveType?.leaveCategory}</td>
                            <td>{req.startDate}</td>
                            <td>{req.endDate}</td>
                            <td>{req.status}</td>
                            <td>{req.reason}</td>
                            <td>
                                <button className="btn btn-primary mr-2" onClick={() => handleEdit(req)}>
                                    Edit
                                </button>
                                <button className="btn btn-danger" onClick={() => handleDelete(req.requestId)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LeaveRequestList;
