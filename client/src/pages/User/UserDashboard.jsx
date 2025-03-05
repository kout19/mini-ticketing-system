import React , {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import url from '../../ServerUrl';
import { TicketContext } from '../../contexts/TicketContext';
import { AuthContext } from '../../contexts/authContext';
import { useNavigate } from 'react-router-dom';
const UserDashboard =()=>{
    const {tickets, fetchTickets}=useContext(TicketContext);
    const {user, logout} =useContext(AuthContext);
    const [title, setTitle]=useState("");
    const [description, setDescription]=useState("");
    const navigate=useNavigate();
    useEffect(()=>{
        fetchTickets();
    },[]);
    const handleCreatTicket= async (e)=>{
        e.preventDefault();
        const token= localStorage.getItem("token");
        try{
           await axios.post(`${url}/api/ticket`,{
            title,
            description,
           },
           {headers :{Authorization: `Bearer ${token}`}}
        );
        setTitle("");
        setDescription("");
        fetchTickets();
        }catch(error){
            console.log("error creating tickets", error);
        }
    };
  const handleLogout=()=>{
    logout();
    navigate('/');
  }
    return(
      <div className="flex flex-col w-full">
        <header className="flex justify-between items-center bg-gray-800 text-white p-4">
        <h1 className="text-xl font-bold">User Dashboard</h1>
        <div className="flex items-center gap-1">
          <small className="py-1 rounded">{user?.role}</small>
          <button 
            onClick={handleLogout} 
            className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
          </div>
          </header>
          <div className='flex items-center justify-center'>
            <div>
          <h2 className="text-lg font-bold text-gray-700">
            Welcome, {user?.email || "User"}
          </h2>
          <form onSubmit={handleCreatTicket} 
          className='mb-4'>
          <input 
            type='text'
            placeholder='Title'
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
            className='border p-2 w-full my-2'
            />
            <textarea
            placeholder='Description'
            value={description}
            required
            onChange={(e)=> setDescription(e.target.value)}
            className='border p-2 w-full my-'
            ></textarea>
            <button 
            className='bg-blue-500 text-white px-4 py-2 rounded'>
                Create Ticket
            </button>
          </form>
          {/* Ticket List */}
          <h3 className='text-xl font-bold mb-2'>
            My tickets
          </h3>
          <div >
            {tickets.length===0 ? (
            <p> No tickets found</p>
            ):(
            tickets.map((ticket)=>(
            <div key={ticket._id}  
             className='border p-3 my-2'>
              <h4 className='font-semibold'>
               Title: {ticket.title}
              </h4>  
              <p>Description: {ticket.description}</p>
              <span className='text-sm text-green-500'>
                Status: {ticket.status}
              </span>
            </div>
            ))
            )}
          </div>
        </div>
        </div>
      </div>
    );
}

export default UserDashboard;