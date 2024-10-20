import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../context/ProductContext";
import { assets } from "../assets/assets";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ProductContext);
const[visible,setVisible] = useState(false)
  const location = useLocation()

  useEffect(()=>{
    if(location.pathname.includes('collections')){
setVisible(true)
    }
    else{
      setVisible(false)
      setShowSearch(false)
    }
  },[location,showSearch])
  return  showSearch &&visible?(
    <div className="border-t border-b bg-gray-50 text-center">
      <div className="inline-flex items-center justify-center border border-gray-400 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 outline-none bg-inherit text-sm"
          type="text"
          placeholder="Search"
        />
        <img className="w-4" src={assets.search_icon} alt="search icon" />
      </div>
      <img
        onClick={() => setShowSearch(false)}
        className="inline w-3 cursor-pointer"
        src={assets.close_icon}
        alt="close icon"
      />
    </div>
  ) :null
};

export default SearchBar;
