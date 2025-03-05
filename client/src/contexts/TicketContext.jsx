import { createContext, useState, useEffect, useContext } from "react";
import {AuthContext} from './authContext';
import axios from 'axios';
import url from '../ServerUrl';

 export const  TicketContext =createContext();

export const  TicketProvider =({children})=>{
    const [tickets, setTickets] =useState([]);
    const {user}=useContext(AuthContext);
    const fetchTickets = async ()=>{
        const token= localStorage.getItem("token");
        try{
        const response= await axios.get(`${url}/api/ticket`,{
            headers:{Authorization: `Bearer ${token}`}
        });
         setTickets(response.data);  
        }catch(error){
            console.log("Error fetching Tickets", error);
        }
    }
    useEffect(()=>{
        fetchTickets();
    },[user]);

    return(
        <TicketContext.Provider value={{tickets,fetchTickets}}>
            {children}
        </TicketContext.Provider>
    )
};
export const useTickets = () => {
    return useContext(TicketContext);
};
