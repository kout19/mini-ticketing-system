import React , {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import url from '../../ServerUrl';
import { TicketContext } from '../../contexts/TicketContext';

const UserDashboard =()=>{
    const {tickets, fetchTickets}=useContext(TicketContext);
    const [title, setTitle]=useState("");
    const [description, setDescription]=useState("");

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
    return(
        <div className="max-w-3xl mx-auto p-4">
          <h2  className="text-2xl font-bold mb-4">
          User Dashboard
          </h2>
          <form onSubmit={handleCreatTicket} 
          className='mb-4'>
            <input 
            type='text'
            placeholder='Title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='border p-2 w-full my-2'
            />
            <textarea
            placeholder='Description'
            value={description}
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
                {ticket.title}
              </h4>  
              <p> {ticket.description}</p>
              <span className='text-sm text-gray-500'>
                Status:{ticket.status}
              </span>
            </div>
            ))
            )}
          </div>

        </div>
    );
}

export default UserDashboard;