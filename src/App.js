import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './components/HomePage'; 
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';
import LeaveRequestList from './components/LeaveRequestList';
import LeaveRequestForm from './components/LeaveRequestForm';
import LeaveTypeList from './components/LeaveTypeList';
import LeaveTypeForm from './components/LeaveTypeForm';
import LeaveBalanceList from './components/LeaveBalanceList';
import LeaveBalanceForm from './components/LeaveBalanceForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min'; 

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <Link to="/" className="navbar-brand">Management System</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to="/" className="nav-link">Home</Link>
                </li>
                
                {/* Employees Dropdown */}
                <li className="nav-item dropdown">
                  <Link to="#" className="nav-link dropdown-toggle" id="employeeDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Employees
                  </Link>
                  <ul className="dropdown-menu" aria-labelledby="employeeDropdown">
                    <li><Link to="/employees" className="dropdown-item">Employee List</Link></li>
                    <li><Link to="/employees/new" className="dropdown-item">Add New Employee</Link></li>
                  </ul>
                </li>

                {/* Leave Requests Dropdown */}
                <li className="nav-item dropdown">
                  <Link to="#" className="nav-link dropdown-toggle" id="leaveRequestDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Leave Requests
                  </Link>
                  <ul className="dropdown-menu" aria-labelledby="leaveRequestDropdown">
                    <li><Link to="/leave-requests" className="dropdown-item">Leave Request List</Link></li>
                    <li><Link to="/leave-requests/new" className="dropdown-item">Add New Leave Request</Link></li>
                  </ul>
                </li>

                {/* Leave Types Dropdown */}
                <li className="nav-item dropdown">
                  <Link to="#" className="nav-link dropdown-toggle" id="leaveTypeDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Leave Types
                  </Link>
                  <ul className="dropdown-menu" aria-labelledby="leaveTypeDropdown">
                    <li><Link to="/leave-types" className="dropdown-item">Leave Type List</Link></li>
                    <li><Link to="/leave-types/new" className="dropdown-item">Add New Leave Type</Link></li>
                  </ul>
                </li>

                {/* Leave Balances Dropdown */}
                <li className="nav-item dropdown">
                  <Link to="#" className="nav-link dropdown-toggle" id="leaveBalanceDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Leave Balances
                  </Link>
                  <ul className="dropdown-menu" aria-labelledby="leaveBalanceDropdown">
                    <li><Link to="/leave-balances" className="dropdown-item">Leave Balance List</Link></li>
                    <li><Link to="/leave-balances/new" className="dropdown-item">Add New Leave Balance</Link></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/employees" element={<EmployeeList />} />
            <Route path="/employees/new" element={<EmployeeForm />} />
            <Route path="/employees/edit/:id" element={<EmployeeForm />} />
            <Route path="/leave-requests" element={<LeaveRequestList />} />
            <Route path="/leave-requests/new" element={<LeaveRequestForm />} />
            <Route path="/leave-requests/edit/:id" element={<LeaveRequestForm />} />
            <Route path="/leave-types" element={<LeaveTypeList />} />
            <Route path="/leave-types/new" element={<LeaveTypeForm />} />
            <Route path="/leave-types/edit/:id" element={<LeaveTypeForm />} />
            <Route path="/leave-balances" element={<LeaveBalanceList />} />
            <Route path="/leave-balances/new" element={<LeaveBalanceForm />} />
            <Route path="/leave-balances/edit/:id" element={<LeaveBalanceForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
