import React, { useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
const Navbar = () => {
  const [visible, setVisible] = useState(false);
  return (
    <div className=" flex justify-between items-center py-5 font-medium">
      <img src={assets.logo} className="w-36" alt="logo" />
      <ul className=" hidden md:flex gap-5 text-sm text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>Home</p>
          <hr className=" w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/collections" className="flex flex-col items-center gap-1">
          <p>Collections</p>
          <hr className=" w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>About Us</p>
          <hr className=" w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>Contact Us</p>
          <hr className=" w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-6">
        <img src={assets.search_icon} className="w-5 cursor-pointer" alt="" />
        <div className="group relative">
          <img
            src={assets.profile_icon}
            className=" w-7 cursor-pointer"
            alt="profile image"
          />
          <div className=" group-hover:block hidden absolute dropdown-menu right-1/2 pt-0">
            <div className="flex flex-col gap-2 w-36 py-3 bg-slate-100 text-gray-500 rounded-md">
              <p className="cursor-pointer  text-center hover:text-black">
                My profile
              </p>
              <p className="cursor-pointer text-center hover:text-black">
                Orders
              </p>
              <p className="cursor-pointer text-center hover:text-black">
                Logout
              </p>
            </div>
          </div>
        </div>
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-7 min-w-5" alt="" />
          <p className=" absolute right-[-5px] bottom-[-5px] text-center leading-4 bg-red-600 text-white aspect-square rounded-full text-[10px]   ">
            10
          </p>
        </Link>
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-7 cursor-pointer md:hidden"
          alt="menu"
        />
      </div>
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <img src={assets.back_icon} className="w-7" alt="" />
            <p>back</p>
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
        </div>
      </div>
    </div>
  );
};

export default Navbar;
