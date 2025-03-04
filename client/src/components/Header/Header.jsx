import React,{useContext} from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";

const Header= () => {
   const {user,logout,setAuthModal}=useContext(AuthContext);
   return (
      <header className="flex justify-between p-4 bg-gray-800 text-white">
       <Link to='/'>
       <h1 className="text-lg font-bold">Mini Ticketing System</h1>
       </Link> 
        <nav>
          {user ? (
            <button onClick={logout} className="bg-red-500 px-4 py-2 rounded">Logout</button>
          ) : (
            <>
              <button onClick={() => setAuthModal("login")} className=" px-4 py-2 rounded mx-2">
                Login
              </button>
              <button onClick={() => setAuthModal("signup")} className="bg-green-500 px-4 py-2 rounded">
                Sign Up
              </button>
            </>
          )}
        </nav>
      </header>
    );
    
};

export default Header;