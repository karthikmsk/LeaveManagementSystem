import React, { useState, useEffect } from 'react';
import { createLeaveType, updateLeaveType, getLeaveCategories } from '../api/leaveTypeApi';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import '../index.css'; // Import your custom CSS file

const LeaveTypeForm = ({ leaveType, onFormSubmit }) => {
    const [formData, setFormData] = useState({
        leaveTypeId: '',
        leaveCategory: '',
        accrualRate: ''
    });
    const [leaveCategories, setLeaveCategories] = useState([]); // State to hold categories
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch leave categories from the backend
        const fetchLeaveCategories = async () => {
            try {
                const categories = await getLeaveCategories();
                setLeaveCategories(categories); // Set the fetched categories
            } catch (error) {
                console.error('Error fetching leave categories:', error);
                setError('Error fetching leave categories. Please try again later.');
            }
        };

        fetchLeaveCategories();
    }, []);

    useEffect(() => {
        if (leaveType) {
            setFormData({
                leaveTypeId: leaveType.leaveTypeId,
                leaveCategory: leaveType.leaveCategory,
                accrualRate: leaveType.accrualRate
            });
        } else {
            setFormData({
                leaveTypeId: '',
                leaveCategory: '',
                accrualRate: ''
            });
        }
    }, [leaveType]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formData.leaveTypeId) {
                await updateLeaveType(formData.leaveTypeId, formData);
            } else {
                await createLeaveType(formData);
            }
            onFormSubmit(formData);
            setFormData({ leaveTypeId: '', leaveCategory: '', accrualRate: '' });
        } catch (error) {
            console.error('Error saving leave type:', error);
            setError('Error saving leave type. Please try again later.');
        }
    };

    return (
        <div className="container mt-4" style={{ maxWidth: '600px' }}>
            <h1 className="mb-4 text-center">
                {formData.leaveTypeId ? 'Edit Leave Type' : 'New Leave Type'}
            </h1>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                    <label htmlFor="leaveCategory">Leave Type Name:</label>
                    <select
                        id="leaveCategory"
                        name="leaveCategory"
                        value={formData.leaveCategory}
                        onChange={handleChange}
                        className="form-control"
                        required
                    >
                        <option value="">Select Leave Category</option>
                        {leaveCategories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="accrualRate">Accrual Rate:</label>
                    <input
                        type="number"
                        id="accrualRate"
                        name="accrualRate"
                        value={formData.accrualRate}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>

                <div className="text-center">
                    <button type="submit" className="btn btn-primary">
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LeaveTypeForm;
