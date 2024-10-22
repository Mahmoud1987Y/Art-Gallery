import React, { useContext, useState } from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
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
import AdminDashboard from "./admin/AdminDashboard";
import ManageProducts from "./admin/ManageProducts";

import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import Logout from "./pages/Logout";
import { UserContext } from "./context/UserContext";
import ManageOrders from "./admin/ManageOrders";
import Register from "./pages/Register";

function App() {
  const { userRole } = useContext(UserContext); // Ensure userRole is correctly fetched
  const [visible, setVisible] = useState(false);

  return (
    <div className={`px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] ${visible ? "overflow-hidden" : ""}`}>
      <Navbar visible={visible} setVisible={setVisible} />
      <SearchBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/register" element={<Register/>}/>
        <Route path="/orders" element={<Orders />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/404" element={<NotFound />} />

        {/* Admin Routes (Protected) */}

        {userRole === ("moderator"||"admin") ? (
          
          <>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/products" element={<ManageProducts/>} />
            <Route path="/admin/orders" element={<ManageOrders />} />
          </>
        ) : (
          <Route path="/admin" element={<NotFound />} /> // Redirecting to NotFound if not authorized
        )}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
