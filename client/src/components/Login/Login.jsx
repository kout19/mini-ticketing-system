import { useContext,useState } from "react";
import  {AuthContext}  from "../../contexts/authContext";
const Login = () => {
    const {login, user, logout}=useContext(AuthContext);
    const [username, setUsername]=useState("");
    const [role, setRole] =useState("user");

return(
    <div>
      {user ? (
        <div>
        <h2>Welcome, {user.username}({user.role})</h2>
        <button onClick={logout} 
        className="bg-red-500 text-white px-4 py-2 rounded">
         Logout
        </button>

        </div>
      ):(
        <div>
        <h2>Login</h2>
        <input
         type="text"
         placeholder="Username"
         value={username}
         onChange={(e)=> setUsername(e.target.value)}
         className=" border p-2"
         />
         <select 
         value={role} onChange={(e)=>setRole(e.target.value)}
         className="border p-2 ml-2">
         <option value="user">User</option>
         <option value="admin">Admin</option>
         </select>
         <button onClick={()=>login(username, role)}
         className="bg-blue-500 text-white px-4 py-2 rounded">
            Login
         </button>
        </div>
      )}
    </div>
)};
export default Login;