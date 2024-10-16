import logo from "./logo.svg";

import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import Collections from "./pages/Collections";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import Navbar from "./components/Navbar";
import NotFound from "./pages/NotFound";

function App() {
  // State to control the visibility of the login page
  const [showLogin, setShowLogin] = useState(false);

  // Function to hide the login page
  const handleHideLogin = () => {
    setShowLogin(false);
  };
  return (
    <div className=" px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <Navbar onLoginClick={() => setShowLogin(true)} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />

        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {showLogin && <Login onClose={handleHideLogin} />}
    </div>
  );
}

export default App;
