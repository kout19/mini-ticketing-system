import React from 'react';
import ProtectedRoute from '../components/Protected/ProtectedRoute';
const Unauthorized = () => {
    console.log("Rendering unauthorized");
  return (
   
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="text-center p-6 border border-red-500 bg-white rounded">
        <h2 className="text-3xl font-bold text-red-500">Unauthorized Access</h2>
        <p className="text-lg text-blue-700 mt-4">
          You do not have permission to access this page.
          <ProtectedRoute/>
        </p>
      </div>
    </div>
  );
};

export default Unauthorized;
