import React, {useContext} from "react";
import { AuthContext } from "../contexts/authContext";
const LandingPage = () => {
    const {setAuthModal}=useContext(AuthContext);
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gray-800 text-white flex flex-col justify-center items-center text-center p-8">
        <h1 className="text-3xl font-bold mb-4">Welcome to Mini Ticket System</h1>
        <p className="text-lg mb-8">
          Simplifying your ticket management system. 
        </p>
        <a href="#signup"
        className="bg-yellow-500 text-black px-6 py-3 rounded hover:bg-yellow-600">
          Get Started
        </a>
      </section>

      {/* Features Section */}
      <section className="p-16 bg-white text-center">
        <h2 className="text-2xl font-bold mb-8">Why Choose Mini Ticket?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Easy Ticket Management</h3>
            <p>Manage all your tickets in one place with simple and intuitive navigation.</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Real-Time Updates</h3>
            <p>Get instant updates on ticket status, whether open, pending, or resolved.</p>
          </div>
        </div>
      </section>

      {/* Call-to-Action (CTA) Section */}
      <section className="bg-gray-800 text-white text-center p-8">
        <h2 className="text-2xl font-bold mb-4">Start Using Mini Ticket Now</h2>
        <p className="mb-8">
          Sign up to get started. It's free to start!
        </p>
        <button onClick={()=>setAuthModal("signup")}
        id="signup"
        className="bg-yellow-500 text-black px-6 py-3 rounded hover:bg-yellow-600">
          Sign Up Now
        </button>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white text-center p-8">
        <p>&copy; 2025 Mini Ticket System By Kefyalew. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
