import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getLeaveBalances, deleteLeaveBalance } from '../api/leaveBalanceApi';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const LeaveBalanceList = () => {
    const [leaveBalances, setLeaveBalances] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLeaveBalances = async () => {
            try {
                const response = await getLeaveBalances();
                setLeaveBalances(response.data);
            } catch (error) {
                setError('Error fetching leave balances. Please try again later.');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchLeaveBalances();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this leave balance?')) {
            try {
                await deleteLeaveBalance(id);
                setLeaveBalances(leaveBalances.filter(balance => balance.leaveBalanceId !== id));
            } catch (error) {
                setError('Error deleting leave balance. Please try again later.');
                console.error(error);
            }
        }
    };

    if (loading) return <div className="text-center mt-5">Loading...</div>;
    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Leave Balances</h1>
            <Link to="/leave-balances/new" className="btn btn-primary mb-3">Add New Leave Balance</Link>
            <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th>Id</th>
                        <th>Employee</th>
                        <th>Leave Type</th>
                        <th>Balance</th>
                        <th>Accrual Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {leaveBalances.map(balance => (
                        <tr key={balance.id}>
                            <td>{balance.id}</td>
                            <td>{balance.employee?.name}</td>
                            <td>{balance.leaveType?.leaveCategory}</td>
                            <td>{balance.balance}</td>
                            <td>{balance.accrualDate}</td>
                            <td>
                                <Link to={`/leave-balances/${balance.leaveBalanceId}/edit`} className="btn btn-warning btn-sm me-2">Edit</Link>
                                <button onClick={() => handleDelete(balance.leaveBalanceId)} className="btn btn-danger btn-sm">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LeaveBalanceList;
