import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/authContext";
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import url from '../../ServerUrl';

const AuthModal=()=>{
const {authModal, setAuthModal, login}=useContext(AuthContext);
const [role, setRole]=useState("user");
const [email, setEmail]=useState("");
const [password, setPassword]=useState("");
const [name, setFullname]=useState("");
const navigate=useNavigate();


if(!authModal) return null;
// Handling login
const handleLogin= async (e)=>{
e.preventDefault();
try{
   const response= await axios.post(`${url}/api/users/login`,{
      email, 
      password,
   });
const {token, lUser}=response.data;
console.log("Token", token);
console.log(lUser);
localStorage.setItem("token", token);
console.log(lUser.role);
login(lUser.email, lUser.role);
if(lUser.role==="admin"){
   navigate("/admin/dashboard");
}else{
   navigate("/user/dashboard");
}

} catch(error){
   console.log("error loging ",error.response?.data?.message || error.message);
}
setAuthModal(null);
};

//Handling signup
const handleSignup = async(e)=>{
e.preventDefault();
try{
 const response =await axios.post(`${url}/api/users/signup`,{
   name,
   email, 
   password,
 });
 console.log("signing up response", response.data);
 const {token, newUser}=response.data;
 localStorage.setItem("token", token);
 login(newUser.email, newUser.role);
  navigate('/dashboard');
}catch(error){
   console.log("error signingup",error.response?.data?.message|| error.message);
}
setAuthModal(null);
};
return(
<div className="fixed inset-0 bg-black bg-opacity-50 flex 
    justify-center items-center">
    <div className="bg-white p-6 rounded shadow-lg mt-[60px]">
    <h2 className="text-lg font-bold">
        {authModal==="login" ? "Login" : "SignUp"}
    </h2> 
    {authModal==="signup" &&(
         <input 
       type="text"
       placeholder="Full Name"
       value={name}
       onChange={(e)=>setFullname(e.target.value)}
       className="border p-2 w-full my-2"
       />
       )}
       <input 
       type="email"
       placeholder="Email"
       value={email}
       onChange={(e)=>setEmail(e.target.value)}
       className="border p-2 w-full my-2"
       />
       <input 
       type="password"
       placeholder="Password"
       value={password}
       onChange={(e)=>setPassword(e.target.value)}
       className="border p-2 w-full my-2"
       />
       {/* <select
        value={role}
        onChange={(e)=>setRole(e.target.value)}
        className="border p-2 w-full my-2">
           <option value="user">User</option>
           {authModal==="login" && <option value="admin">Admin</option>}
        </select> */}

     <button
     onClick={authModal==="login" ? handleLogin : handleSignup}
     className="bg-blue-500 text-white px-4 rounded w-full">
        {authModal==="login"? "Login" : "Sign Up"}
     </button>
     <button 
     onClick={()=>setAuthModal(null)}
     className="text-red-800 mt-2">
        Close
     </button>
    </div>

</div>
)
}

export default AuthModal;