// src/components/TicketList.jsx
import React, { useContext, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import url from '../../ServerUrl';
import { AuthContext } from '../../contexts/authContext';
const TicketList = () => {
 const{user}=useContext(AuthContext);
 const [tickets, setTicket]=useState([]);
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
if(user?.role==="admin"){
  fetchAlltickets();
}
useEffect(()=>{
  fetchAlltickets();
},[]);

  //Deleting tickets
   const deleteTicket= async(ticketId)=>{
    const token=localStorage.getItem("token");
    try{
        const response= await axios.delete(`${url}/api/tickets/${ticketId}`,
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
        const response= await axios.put(`${url}/api/tickets/${ticketId}`,updatedData,{
         headers: {Authorization: `Bearer ${token}`}
        });
        fetchAlltickets();
    }catch(error){
        console.log("error updating tickets", error);
    }
   };
   const viewTicketDetails =(ticketId)=>{
    navigate(`/admin/ticket/${ticketId}`);
   };

  // useEffect(() => {
  //   fetchTickets();
  // }, [fetchTickets]);

  return (

     <div>
      <h2 className="text-2xl font-bold mb-5">All Tickets</h2>
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
            <tr key={ticket._id}>
              <td className="px-4 py-2 border">{ticket._id}</td>
              <td className="px-4 py-2 border">{ticket.title}</td>
              <td className="px-4 py-2 border">{ticket.status}</td>
              <td className="px-4 py-2 border">
                <button
                  onClick={() => updateTicket(ticket._id, { status: "resolved" })}
                  className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                >
                  Update
                </button>
                <button
                  onClick={() => deleteTicket(ticket._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                >
                  Delete
                </button>
                <button
                  onClick={() => viewTicketDetails(ticket._id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TicketList;
