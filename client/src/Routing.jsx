import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home';
import ProtectedRoute from './components/Protected/ProtectedRoute';
import UserDashboard from './pages/User/UserDashboard';
import AdminDashboard from './pages/Admin/AdminDashboard';
import Unauthorized from './pages/Unauthorized';
import TicketList from './components/TicketList/TicketList';
const Routing = () => (
  <Router>
  <Routes>
     <Route path="/" element={<HomePage/>} />
     <Route path="/user/dashboard" element={
      <ProtectedRoute allowedRoles={['user']}>
        <UserDashboard/>
        </ProtectedRoute>
        }/>
        <Route path='/admin/dashboard' element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard/>
        </ProtectedRoute>
        }/>
       <Route path='/admin/tickets' element={<TicketList/>}/>
        <Route path="/unauthorized" element={<Unauthorized/>}/>
  </Routes>
  </Router>
);

export default Routing;
