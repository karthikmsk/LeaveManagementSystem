import React, { useState, useEffect } from 'react';
import { getEmployees, deleteEmployee } from '../api/employeeApi';
import EmployeeForm from './EmployeeForm';
import 'bootstrap/dist/css/bootstrap.min.css';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [editingEmployee, setEditingEmployee] = useState(null);
    const [showForm, setShowForm] = useState(false); // State to toggle form visibility

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await getEmployees();
                setEmployees(response.data);
            } catch (error) {
                console.error('Error fetching employees', error);
            }
        };
        fetchEmployees();
    }, []); // Fetch employees once on component mount

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this employee?")) {
            try {
                await deleteEmployee(id);
                setEmployees(prevEmployees => prevEmployees.filter(employee => employee.employeeId !== id));
            } catch (error) {
                console.error('Error deleting employee', error);
            }
        }
    };

    const handleEdit = (employee) => {
        setEditingEmployee(employee);
        setShowForm(true); // Show the form when editing
    };

    const handleFormSubmit = (updatedEmployee) => {
        if (editingEmployee) {
            // Update the employee list with the edited employee
            setEmployees(prevEmployees =>
                prevEmployees.map(emp => 
                    emp.employeeId === updatedEmployee.employeeId ? updatedEmployee : emp
                )
            );
        } else {
            // Add new employee to the list
            setEmployees(prevEmployees => [...prevEmployees, updatedEmployee]);
        }
        setEditingEmployee(null); // Clear form after submission
        setShowForm(false); // Hide the form after submission
    };

    const handleAddEmployee = () => {
        setEditingEmployee(null); // Reset editing state
        setShowForm(true); // Show the form for adding a new employee
    };

    return (
        <div className="container mt-4">
            <h1 className="mb-4 text-center">Employee List</h1>
            <div className="mb-4">
                {/* Add Employee Button */}
                <button 
                    className="btn btn-primary mb-3" 
                    onClick={handleAddEmployee}
                >
                    Add Employee
                </button>

                {/* Conditionally render the form */}
                {showForm && (
                    <EmployeeForm
                        employee={editingEmployee}
                        onFormSubmit={handleFormSubmit}
                        editing={!!editingEmployee}
                    />
                )}
            </div>
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>City</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(employee => (
                        <tr key={employee.employeeId}>
                            <td>{employee.employeeId}</td>
                            <td>{employee.name}</td>
                            <td>{employee.email}</td>
                            <td>{employee.city}</td>
                            <td>
                                <button
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() => handleEdit(employee)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(employee.employeeId)}
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

export default EmployeeList;
