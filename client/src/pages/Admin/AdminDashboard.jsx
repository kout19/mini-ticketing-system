// src/pages/AdminDashboardPage.jsx
import {useContext, useEffect} from 'react';
import Sidebar from '../../components/SideBar/SideBar';
import TicketList from '../../components/TicketList/TicketList';
import Profile from '../../components/Profile/Profile';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/authContext';
import { TicketContext } from '../../contexts/TicketContext';
import axios from 'axios';
import url from '../../ServerUrl';

const AdminDashboardPage = () => {
 const {tickets, fetchTickets}=useContext(TicketContext);
 const {user}=useContext(AuthContext);
 const navigate =useNavigate();
  
 useEffect(()=>{
  fetchTickets();
 },[]);
 

  return (
    <div className="flex">
     <Sidebar />
       <main className="flex-1 p-5">
        <TicketList />
        <Profile /> 
      </main>
    </div>
  );
};

export default AdminDashboardPage;

