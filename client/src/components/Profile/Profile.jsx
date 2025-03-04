// src/components/Profile.jsx
import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/authContext';
const Profile = () => {
    const {user, logout}=useContext(AuthContext);
  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Admin Profile</h3>
      <div className="bg-white p-5 shadow-md rounded-lg">
        <p className="mb-2"><strong>Name:</strong> Admin Name</p>
        <p className="mb-2"><strong>Email:</strong> admin@example.com</p>
        <p className="mb-2"><strong>Role:</strong> Admin</p>
        <button  onClick={logout}
        className="bg-green-500 text-white px-4 py-2 mt-4">Logout</button>
      </div>
    </div>
  );
};

export default Profile;
