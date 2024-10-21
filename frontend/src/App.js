import logo from "./logo.svg";
import "./App.css";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom"; // Changed Router to BrowserRouter
import { useContext, useState } from "react";
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
import AdminProducts from "./admin/ManageProducts";
import AdminOrders from "./admin/ManageOrders";

import { UserContext, UserProvider } from "./context/UserContext";
import { ProductProvider } from "./context/ProductContext";
import { AuthProvider } from "./context/AuthContext";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";

function App() {
  // State to control the visibility of the login page
  const { handleHideLogin, showLogin, setShowLogin, visible, setVisible,userRole  } =
    useContext(UserContext);

  // Function to hide the login page

  return (
    <div
      className={`px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] ${
        visible ? "overflow-hidden" : ""
      }`}
    >
      <Navbar
        onLoginClick={() => setShowLogin(true)}
        visible={visible}
        setVisible={setVisible}
      />
      <SearchBar />
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
        <Route path="/404" element={<NotFound />} />

        {/* Admin Routes (Protected) */}
        {userRole === "admin" && (
          <>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
          </>
        )}
      </Routes>
      {showLogin && <Login onClose={handleHideLogin} />} <Footer />
      {/* Render Login when showLogin is true */}
    </div>
  );
}

export default App;
