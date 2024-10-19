import logo from "./logo.svg";
import "./App.css";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom"; // Changed Router to BrowserRouter
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

import { UserProvider } from "./context/UserContext";
import { ProductProvider } from "./context/ProductContext";
import Footer from "./components/Footer";

function App() {
  // State to control the visibility of the login page
  const [visible, setVisible] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  // Function to hide the login page
  const handleHideLogin = () => {
    setShowLogin(false);
  };

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
      <UserProvider>
        <ProductProvider>
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
          {showLogin && <Login onClose={handleHideLogin} />}{" "}
        <Footer/>
        </ProductProvider>
      </UserProvider>
      {/* Render Login when showLogin is true */}
    </div>
  );
}

export default App;
