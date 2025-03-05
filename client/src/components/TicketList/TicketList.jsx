// src/components/TicketList.jsx
import React, { useContext, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import url from '../../ServerUrl';
import { AuthContext } from '../../contexts/authContext';
const TicketList = () => {
 const{user}=useContext(AuthContext);
 const [tickets, setTicket]=useState([]);
 const [view, setView]=useState(null);
  const navigate=useNavigate();
//Fetching all tickets
const fetchAlltickets= async ()=>{
  const token=localStorage.getItem("token");
  try{
     const response =await axios.get(`${url}/api/admin/all`,{
      headers: {Authorization:`Bearer ${token}`},
     });
     console.log("response from All tickets",response.data);
     setTicket(response.data.tickets);
     console.log(tickets);
  }catch(error){
    console.log("error fetching tickets",error);
  }
};
useEffect(()=>{
  if(user?.role==="admin"){
  fetchAlltickets();
}
  // fetchAlltickets();
},[user]);

  //Deleting tickets
   const deleteTicket= async(ticketId)=>{
    const token=localStorage.getItem("token");
    try{
        await axios.delete(`${url}/api/tickets/${ticketId}`,
            {headers: {Authorization: `Bearer ${token}`},
        });
        fetchAlltickets();

    }catch(error){
        console.log("Error deleting tickets",error);
    }
   };

   //Updating tickets
   const updateTicket= async(ticketId,updatedData)=>{
    const token=localStorage.getItem("token");
    try{
        await axios.put(`${url}/api/tickets/${ticketId}`,updatedData,{
         headers: {Authorization: `Bearer ${token}`}
        });
        fetchAlltickets();
    }catch(error){
        console.log("error updating tickets", error);
    }
   };
   //View details of tickets
   const viewTicketDetails =(ticketId)=>{
   setView(view=== ticketId ? null: ticketId);
   };

  // useEffect(() => {
  //   fetchTickets();
  // }, [fetchTickets]);

  return (
    <div>
      {tickets.length > 0 && <h2 className="text-2xl font-bold mb-5">All Tickets</h2>}
  
      {tickets.length > 0 ? (
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Ticket ID</th>
              <th className="px-4 py-2 border">Title</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
          {tickets.map((ticket) => (
    <React.Fragment key={ticket._id}>
      <tr>
        <td className="px-4 py-2 border">{ticket._id}</td>
        <td className="px-4 py-2 border">{ticket.title}</td>
        <td className="px-4 py-2 border">{ticket.status}</td>
        <td className="px-4 py-2 border flex flex-col md:flex-row md:gap-2 ">
          <button
            onClick={() => updateTicket(ticket._id, { status: "approved" })}
            className="bg-yellow-500 text-white px-4 py-1 rounded my-1 md:my-0"
          >
            Update
          </button>
          <button
            onClick={() => deleteTicket(ticket._id)}
            className="bg-red-500 text-white px-4 py-1 rounded my-1 md:my-0"
          >
            Delete
          </button>
          <button
            onClick={() => viewTicketDetails(ticket._id)}
            className={`px-4 py-1 rounded ${
              view === ticket._id ? "bg-gray-500" : "bg-blue-500"
            } text-white my-1 md:my-0 `}
          >
            {view === ticket._id ? "Hide" : "View"}
          </button>
        </td>
      </tr>

      {/* Ticket Details (Only show when view === ticket._id) */}
      {view === ticket._id && (
        <tr>
          <td colSpan="4" className="p-4 bg-gray-100 border">
            <strong>Description:</strong> {ticket.description} <br />
            <strong>Created By:</strong> {ticket.user?.name || "N/A"} <br />
            <strong>Email:</strong> {ticket.user?.email || "N/A"} <br />
            <strong>Created At:</strong> {new Date(ticket.createdAt).toLocaleString()} <br />
          </td>
        </tr>
      )}
    </React.Fragment>
  ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-500">No tickets available.</p>
      )}
    </div>
  );  
};

export default TicketList;
