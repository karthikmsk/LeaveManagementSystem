import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { getEmployeeById, createEmployee, updateEmployee } from '../api/employeeApi';

const EmployeeForm = ({ employee: initialEmployee, onFormSubmit, editing }) => {
    const { id } = useParams();

    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        city: ''
    });
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    // Use memoization to prevent unnecessary re-renders when initialEmployee is unchanged
    const initialEmployeeMemo = useMemo(() => initialEmployee || { name: '', email: '', city: '' }, [initialEmployee]);

    useEffect(() => {
        if (id) {
            const fetchEmployee = async () => {
                try {
                    const response = await getEmployeeById(id);
                    setEmployee(response.data);
                } catch (error) {
                    setError('Error fetching employee data. Please try again later.');
                }
            };
            fetchEmployee();
        } else {
            setEmployee(initialEmployeeMemo);
        }
    }, [id, initialEmployeeMemo]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let updatedEmployee;
            if (editing) {
                // Update existing employee
                updatedEmployee = await updateEmployee(id || initialEmployee.employeeId, employee);
                setSuccessMessage('Employee updated successfully!');
            } else {
                // Create new employee
                updatedEmployee = await createEmployee(employee);
                setSuccessMessage('Employee created successfully!');
            }
            onFormSubmit(updatedEmployee.data || updatedEmployee); // Pass the updated employee to parent component
        } catch (error) {
            setError('Error saving employee data. Please try again later.');
        }
    };

    return (
        <div className="container mt-4" style={{ maxWidth: '600px' }}>
            {error && <div className="alert alert-danger">{error}</div>}
            {successMessage && <div className="alert alert-success">{successMessage}</div>}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={employee.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={employee.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="city">City:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="city"
                        name="city"
                        value={employee.city}
                        onChange={handleChange}
                        required
                    />
                </div>
                <br />
                <button type="submit" className="btn btn-primary">
                    {editing ? 'Save' : 'Add Employee'}
                </button>
            </form>
        </div>
    );
};

export default EmployeeForm;
