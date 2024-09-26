import React, { useEffect, useState } from 'react';
import { getLeaveTypes, deleteLeaveType } from '../api/leaveTypeApi'; // API methods for fetching and deleting leave types
import LeaveTypeForm from './LeaveTypeForm'; // Form component for adding/editing leave types
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const LeaveTypeList = () => {
    const [leaveTypes, setLeaveTypes] = useState([]);
    const [editingLeaveType, setEditingLeaveType] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false); // Toggle form visibility

    // Fetch the leave types when the component mounts
    useEffect(() => {
        const fetchLeaveTypes = async () => {
            try {
                const response = await getLeaveTypes();
                setLeaveTypes(response.data);
            } catch (error) {
                setError('Error fetching leave types. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        fetchLeaveTypes();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this leave type?")) {
            try {
                await deleteLeaveType(id);
                setLeaveTypes(prevTypes => prevTypes.filter(leaveType => leaveType.leaveTypeId !== id));
            } catch (error) {
                setError('Error deleting leave type. Please try again later.');
            }
        }
    };

    const handleEdit = (leaveType) => {
        setEditingLeaveType(leaveType);
        setShowForm(true); // Show the form with the selected leave type for editing
    };

    const handleFormSubmit = (newLeaveType) => {
        if (editingLeaveType) {
            // Update the leave type
            setLeaveTypes(prevTypes => prevTypes.map(lt => 
                (lt.leaveTypeId === newLeaveType.leaveTypeId ? newLeaveType : lt)
            ));
        } else {
            // Add a new leave type
            setLeaveTypes(prevTypes => [...prevTypes, newLeaveType]);
        }
        setEditingLeaveType(null); // Clear the form
        setShowForm(false); // Hide the form
    };

    const handleCancelEdit = () => {
        setEditingLeaveType(null);
        setShowForm(false); // Hide the form without saving
    };

    if (loading) return <div className="text-center">Loading...</div>;
    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <div className="container mt-4">
            <h1 className="mb-4 text-center">Leave Type List</h1>

            {/* Conditionally render the form */}
            {showForm ? (
                <LeaveTypeForm
                    leaveType={editingLeaveType}
                    onFormSubmit={handleFormSubmit}
                    onCancel={handleCancelEdit} // Optional cancel button handling
                    editing={!!editingLeaveType} // Check if in editing mode
                />
            ) : (
                <button className="btn btn-success mb-4" onClick={() => setShowForm(true)}>
                    Add New Leave Type
                </button>
            )}

            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Accrual Rate</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {leaveTypes.map(leaveType => (
                        <tr key={leaveType.leaveTypeId}>
                            <td>{leaveType.leaveTypeId}</td>
                            <td>{leaveType.leaveCategory}</td>
                            <td>{leaveType.accrualRate}</td>
                            <td>
                                <button
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() => handleEdit(leaveType)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(leaveType.leaveTypeId)}
                                >
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

export default LeaveTypeList;
