// src/components/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-5">
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
      <ul>
        <li className="mb-4">
          <Link to="/admin/dashboard" className="hover:text-gray-400">Dashboard</Link>
        </li>
        <li className="mb-4">
          <Link to="/admin/tickets" className="hover:text-gray-400">Tickets</Link>
        </li>
        <li className="mb-4">
          <Link to="/admin/users" className="hover:text-gray-400">Users</Link>
        </li>
        <li>
          <Link to="/admin/profile" className="hover:text-gray-400">Profile</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
