import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Login from "./Login";
import { UserContext } from "../context/UserContext";

const PlaceOrder = () => {
  const { showLogin, setShowLogin, handleHideLogin } = useContext(UserContext);
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      // If the user is not authenticated, show the login modal
      setShowLogin(true);
    }
  }, [isAuthenticated, setShowLogin]);

  // Custom function to handle modal close and navigate to the cart page
  const handleCloseAndNavigate = () => {
    handleHideLogin(); // Hide the login modal
    navigate("/cart"); // Navigate to the cart page
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold">Checkout Page</h1>
      
      {/* Show login modal if the user is not authenticated */}
      {!isAuthenticated && (
        <button 
          onClick={() => setShowLogin(true)} 
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Login to Proceed
        </button>
      )}

      {/* Render checkout content here if the user is logged in */}
      {isAuthenticated && (
        <div>
          {/* Your checkout form or cart summary */}
          <p>Proceed with your purchase here.</p>
        </div>
      )}

      {/* Show the Login modal only when showLogin is true */}
      {showLogin && <Login onClose={handleCloseAndNavigate} />}
    </div>
  );
};

export default PlaceOrder;
