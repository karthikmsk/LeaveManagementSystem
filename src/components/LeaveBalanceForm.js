import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createLeaveBalance, updateLeaveBalance, getLeaveBalanceById, getLeaveTypes, getEmployees } from '../api/leaveBalanceApi';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const LeaveBalanceForm = () => {
    const [leaveBalance, setLeaveBalance] = useState({
        employeeId: '',
        leaveTypeId: '',
        balance: 0,
        accrualDate: ''
    });

    const [leaveTypes, setLeaveTypes] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams(); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [types, emps] = await Promise.all([getLeaveTypes(), getEmployees()]);
                setLeaveTypes(types.data);
                setEmployees(emps.data);

                if (id) {
                    const response = await getLeaveBalanceById(id);
                    setLeaveBalance(response.data);
                }
            } catch (error) {
                setError('Error fetching data. Please try again later.');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLeaveBalance(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await updateLeaveBalance(id, leaveBalance);
            } else {
                await createLeaveBalance(leaveBalance);
            }
            navigate('/leave-balances');
        } catch (error) {
            setError('Error saving leave balance. Please try again later.');
            console.error('Error saving leave balance:', error);
        }
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error alert alert-danger">{error}</div>;

    return (
        <form onSubmit={handleSubmit} className="leave-balance-form">
            <label>
                Employee:
                <select name="employeeId" value={leaveBalance.employeeId} onChange={handleChange} required>
                    <option value="">Select Employee</option>
                    {employees.map(emp => (
                        <option key={emp.id} value={emp.id}>{emp.name}</option>
                    ))}
                </select>
            </label>

            <label>
                Leave Type:
                <select name="leaveTypeId" value={leaveBalance.leaveTypeId} onChange={handleChange} required>
                    <option value="">Select Leave Type</option>
                    {leaveTypes.map(type => (
                        <option key={type.leaveTypeId} value={type.leaveTypeId}>{type.leaveCategory}</option>
                    ))}
                </select>
            </label>

            <label>
                Balance:
                <input type="number" name="balance" value={leaveBalance.balance} onChange={handleChange} required />
            </label>

            <label>
                Accrual Date:
                <input type="date" name="accrualDate" value={leaveBalance.accrualDate} onChange={handleChange} required />
            </label>

            <button type="submit" className="btn-save">Save</button>
        </form>
    );
};

export default LeaveBalanceForm;
