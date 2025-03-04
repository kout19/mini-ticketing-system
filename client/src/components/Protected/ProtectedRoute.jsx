import {  useContext } from "react";
import { AuthContext } from "../../contexts/authContext";
import { Navigate } from "react-router-dom";
const ProtectedRoute =({children,allowedRoles})=>{
    const {user}=useContext(AuthContext);
 console.log(user);
if(!user|| !allowedRoles.includes(user.role)){
    return <Navigate to="/unauthorized"/>;
} 
return children;
}
export default ProtectedRoute;