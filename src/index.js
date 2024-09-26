import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min'; 

// Import APIs explicitly only when needed
import * as EmployeeApi from './api/employeeApi';
import * as LeaveRequestApi from './api/leaveRequestApi';
import * as LeaveTypeApi from './api/leaveTypeApi';
import * as LeaveBalanceApi from './api/leaveBalanceApi';

// Re-export APIs for centralized access
export { 
  EmployeeApi,
  LeaveRequestApi,
  LeaveTypeApi,
  LeaveBalanceApi 
};

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Optional: Log performance metrics if needed
reportWebVitals(console.log);
