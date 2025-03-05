// src/pages/AdminDashboardPage.jsx
import {useContext, useEffect} from 'react';
import Sidebar from '../../components/SideBar/SideBar';
import TicketList from '../../components/TicketList/TicketList';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/authContext';

const AdminDashboardPage = () => {
 const navigate=useNavigate();
 const {user,logout}=useContext(AuthContext);
 console.log("user from admin dashboard",user);

 const handleLogout=()=>{
  logout();
  navigate('/');
}
const handleCreateAccount=()=>{
  navigate('create/account')
}
  return (
    <div className='flex flex-col w-full' >
    <header className="flex justify-between items-center bg-gray-800 text-white p-4">
  <h1 className="text-xl font-bold">Admin Dashboard</h1>
  <div className='flex items-center gap-8'>
    <button 
    onClick={handleCreateAccount}
    >Create Account</button>
  <div className="flex items-center gap-1">
    <small className="py-1 rounded text-[11px]">{user?.role}</small>
    <button 
      onClick={handleLogout} 
      className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
    >
      Logout
    </button>
  </div>
  </div>
</header>

    <div className="flex">
     {/* <Sidebar /> */}
       <main className="flex-1 p-5">
        <TicketList />
        {/* <Profile />  */}
      </main>
    </div>
    </div>
  );
};

export default AdminDashboardPage;

