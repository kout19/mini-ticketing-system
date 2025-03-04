import {createContext, useState,useEffect } from "react";
export const AuthContext=createContext(null);
const AuthProvider=({children})=>{
   const [user, setUser]=useState(null);
   const [authModal, setAuthModal]=useState(null);

useEffect(()=>{
    console.log("Current user",user);
},[user]);

   const login=(email, role)=>{
    const newUser={email, role};
    // console.log("Setting user in context",newUser);
    setUser(newUser);
   } ;
   
const logout=() =>{
    localStorage.removeItem("token");
    setUser(null);
};
return(
    <AuthContext.Provider value={{user, login, logout, authModal, setAuthModal}}>
        {children}
    </AuthContext.Provider>
);
};
export default AuthProvider;