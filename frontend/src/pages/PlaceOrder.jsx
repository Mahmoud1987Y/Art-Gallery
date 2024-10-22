import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Login from "./Login";
import { UserContext } from "../context/UserContext";

const PlaceOrder = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const{isLogin} = useContext(UserContext)
  const navigate = useNavigate()
  /* const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      // If the user is not authenticated, show the login modal
      navigate('/login')
    }
  }, [isAuthenticated]); */

  // Custom function to handle modal close and navigate to the cart page
  
  return (
    <>
    {isLogin && (
      
      <div className="container mx-auto p-6">
    <h1 className="text-2xl font-bold">Checkout Page</h1>
    
    
    
    
    </div>
  )}
  
  
  {!isLogin&&(
    <div className="text-center">

    <p className="text-2xl text-center text-blue-500">To Proceed to checkout page you must Login Or create User</p>
    <button className="w-44 bg-orange-500 h-10 mt-5 rounded-md text-white font-semibold hover:transition hover:bg-orange-800" onClick={()=>navigate('/login')}>Login Or Register</button>
    </div>
  )}
  </>
  );
};

export default PlaceOrder;
