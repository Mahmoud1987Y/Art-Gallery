import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
import { ProductContext } from "../context/ProductContext";
import { UserContext } from "../context/UserContext";

const Navbar = ({ onLoginClick, setVisible, visible }) => {
  const { userRole } = useContext(UserContext); // Access user role from UserContext
  const [isLogin, setIsLogin] = useState(false);
  const { showSearch, setShowSearch, cartItems } = useContext(ProductContext);

  return (
    <div className={`flex justify-between items-center py-5 font-medium`}>
      <Link to="/">
        <img src={assets.logo} className="w-36" alt="logo" />
      </Link>
      
      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-5 text-sm text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>Home</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/collections" className="flex flex-col items-center gap-1">
          <p>Collections</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>About Us</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <Link to="/contact" className="flex flex-col items-center gap-1">
          <p>Contact Us</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </Link>

        {/* Admin Links - Only visible if user is an admin */}
        {userRole === "admin" && (
          <>
            <NavLink to="/admin" className="flex flex-col items-center gap-1">
              <p>Admin Dashboard</p>
              <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
            </NavLink>
            <NavLink to="/admin/products" className="flex flex-col items-center gap-1">
              <p>Manage Products</p>
              <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
            </NavLink>
            <NavLink to="/admin/orders" className="flex flex-col items-center gap-1">
              <p>Manage Orders</p>
              <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
            </NavLink>
          </>
        )}
      </ul>
      
      {/* Mobile and utility options */}
      <div className="flex items-center gap-6">
        <img
          onClick={() => setShowSearch(true)}
          src={assets.search_icon}
          className="w-5 cursor-pointer"
          alt="search"
        />
        {isLogin ? (
          <ProfileMenu imgIcon={assets.profile_icon} />
        ) : (
          <div>
            <button
              onClick={onLoginClick}
              className="flex flex-col items-center gap-1"
            >
              <p>Login</p>
              <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
            </button>
          </div>
        )}
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-7 min-w-5" alt="cart" />
          <p className="absolute right-[-5px] bottom-[-5px] text-center leading-4 bg-red-600 text-white aspect-square rounded-full px-1 text-[10px]">
            {cartItems.length}
          </p>
        </Link>
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-7 cursor-pointer md:hidden"
          alt="menu"
        />
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          visible ? "w-full h-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <img src={assets.back_icon} className="w-7" alt="back" />
            <p>Back</p>
          </div>
          <NavLink
            onClick={() => setVisible(false)}
            to="/"
            className="flex flex-col items-center gap-4 py-5 hover:bg-gray-400"
          >
            <p>Home</p>
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            to="/collections"
            className="flex flex-col items-center gap-4 py-5 hover:bg-gray-400"
          >
            <p>Collections</p>
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            to="/about"
            className="flex flex-col items-center gap-4 py-5 hover:bg-gray-400"
          >
            <p>About Us</p>
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            to="/contact"
            className="flex flex-col items-center gap-4 py-5 hover:bg-gray-400"
          >
            <p>Contact Us</p>
          </NavLink>

          {/* Admin Links in Mobile Menu */}
          {userRole === "admin" && (
            <>
              <NavLink
                onClick={() => setVisible(false)}
                to="/admin"
                className="flex flex-col items-center gap-4 py-5 hover:bg-gray-400"
              >
                <p>Admin Dashboard</p>
              </NavLink>
              <NavLink
                onClick={() => setVisible(false)}
                to="/admin/products"
                className="flex flex-col items-center gap-4 py-5 hover:bg-gray-400"
              >
                <p>Manage Products</p>
              </NavLink>
              <NavLink
                onClick={() => setVisible(false)}
                to="/admin/orders"
                className="flex flex-col items-center gap-4 py-5 hover:bg-gray-400"
              >
                <p>Manage Orders</p>
              </NavLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
