import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../context/ProductContext";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import { assets } from "../assets/assets";


const Collections = () => {
  const {
    products,
    loading,
    error,
    fetchProductsData,
    currency,
    page,
    setPage,
    search
  } = useContext(ProductContext);
  const [searchPattern, setSearchPattern] = useState("?title=");
  const [filter, setFilter] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [type, setType] = useState("");
  const [sortOption, setSortOption] = useState("");
  useEffect(() => {
    setSearchPattern(`?title=${search}`);
  }, [search]);

  // use effect to fetch data from api

  useEffect(() => {
    
    fetchProductsData(searchPattern, false, false, false);
  }, [searchPattern,search]);

  //handle pagination
  function handlePrev() {
    const newPage = page > 1 ? page - 1 : 1;
    setPage(newPage);
    if (!filter) {
      setSearchPattern(
        (prev) => `${prev.replace(/&page=\d+/, "")}&page=${newPage}`
      );
    }
  }

  function handleNext() {
    const newPage = products.length > 0 ? page + 1 : page;
    setPage(newPage);
    if (!filter) {
      setSearchPattern(
        (prev) => `${prev.replace(/&page=\d+/, "")}&page=${newPage}`
      );
    }
  }
// handle selecting type
  function handleSelect(e) {
    if (e.target.checked) {
      if (!searchPattern.includes(e.target.value)) {
        setSearchPattern((prev) => prev + `&type=${e.target.value}`);
      }
    } else {
      let searchTerm = `type=${e.target.value}`;

      setSearchPattern((prev) => prev.replace(searchTerm, ""));
    }
  }

  // set price filter functions
  let min = 0;
  let max = 1000000;
  function handleMinPrice(e) {
    const newMin = e.target.value.trim(); // Get the value and remove unnecessary spaces
  
    if (newMin === "") {
      // Remove min price filter when the field is cleared
      setSearchPattern((prev) => prev.replace(/&min=\d+/, ""));
    } else {
      const searchTerm = `min=${newMin}`;
      if (searchPattern.includes("min=")) {
        setSearchPattern((prev) => prev.replace(/min=\d+/, searchTerm));
      } else {
        setSearchPattern((prev) => `${prev}&${searchTerm}`);
      }
    }
  }
  
  function handleMaxPrice(e) {
    const newMax = e.target.value.trim(); // Get the value and remove unnecessary spaces
  
    if (newMax === "") {
      // Remove max price filter when the field is cleared
      setSearchPattern((prev) => prev.replace(/&max=\d+/, ""));
    } else {
      const searchTerm = `max=${newMax}`;
      if (searchPattern.includes("max=")) {
        setSearchPattern((prev) => prev.replace(/max=\d+/, searchTerm));
      } else {
        setSearchPattern((prev) => `${prev}&${searchTerm}`);
      }
    }
  }
  

  //handle sorting options

  function handleSortChange(e){
    const sortValue = e.target.value;
    setSortOption(sortValue);
    setSearchPattern((prev) =>
      prev.replace(/&sort=\w+/, "") + `&sort=${sortValue}`
    ); // Add or update sort parameter
  }
  return (
    <div className="flex flex-col sm:flex-row">
      <aside
        className={`min-w-60 mr-5 mb-3 ${
          showFilter ? "w-full block sm:w-60" : ""
        }`}
      >
        <p
          onClick={() => setShowFilter(!showFilter)}
          className=" text-xl flex items-center cursor-pointer gap-2"
        >
          <img
            className={`w-6 sm:hidden ${showFilter ? "rotate-90" : ""}`}
            src={assets.filter_icon}
          />
        </p>

        {/* <Filter showFilter={showFilter} setFilter={setShowFilter} /> */}
        {/* category filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-2 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">Categories</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                onChange={handleSelect}
                type="checkbox"
                value={"Abstract"}
                name=""
                id=""
                className="w-3"
              />
              Abstract
            </p>
            <p className="flex gap-2">
              <input
                onChange={handleSelect}
                type="checkbox"
                value={"Abstract Expressionist"}
                name=""
                id=""
                className="w-3"
              />
              Abstract Expressionist
            </p>
            <p className="flex gap-2">
              <input
                onChange={handleSelect}
                type="checkbox"
                value={"Geometric"}
                name=""
                id=""
                className="w-3"
              />
              Geometric
            </p>
            <p className="flex gap-2">
              <input
                onChange={handleSelect}
                type="checkbox"
                value={"Figurative"}
                name=""
                id=""
                className="w-3"
              />
              Figurative
            </p>
            <p className="flex gap-2">
              <input
                onChange={handleSelect}
                type="checkbox"
                value={"Minimalist"}
                name=""
                id=""
                className="w-3"
              />
              Minimalist
            </p>
            <p className="flex gap-2">
              <input
                onChange={handleSelect}
                type="checkbox"
                value={"Pop Art"}
                name=""
                id=""
                className="w-3"
              />
              Pop Art
            </p>
            <p className="flex gap-2">
              <input
                onChange={handleSelect}
                type="checkbox"
                value={"Surrealist"}
                name=""
                id=""
                className="w-3"
              />
              Surrealist
            </p>
            <p className="flex gap-2">
              <input
                onChange={handleSelect}
                type="checkbox"
                value={"Hyperrealism"}
                name=""
                id=""
                className="w-3"
              />
              Hyperrealism
            </p>
            <p className="flex gap-2">
              <input
                onChange={handleSelect}
                type="checkbox"
                value={"Impressionist"}
                name=""
                id=""
                className="w-3"
              />
              Impressionist
            </p>
            <p className="flex gap-2">
              <input
                onChange={handleSelect}
                type="checkbox"
                value={"Text Art"}
                name=""
                id=""
                className="w-3"
              />
              Text Art
            </p>
            <p className="flex gap-2">
              <input
                onChange={handleSelect}
                type="checkbox"
                value={"Others"}
                name=""
                id=""
                className="w-3"
              />
              Others
            </p>
          </div>
          <p className="mt-3 text-sm font-medium">Price</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <div className="flex gap-2">
              <div className="flex flex-col items-center">
                <label htmlFor="min_price">Min</label>
                <input
                  onChange={handleMinPrice}
                  type="text"
                  name="min_price"
                  id="min_price"
                  className="w-12 border border-gray-600"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="max_price">Max</label>
                <input
                  onChange={handleMaxPrice}
                  type="text"
                  name="max_price"
                  id="max_price"
                  className="w-12 border border-gray-600"
                />
              </div>
            </div>
          </div>
        </div>
      </aside>
      <div className="flex-1 mb-5">
        <div className="flex justify-between w-5/6">
          <div className="w-1/3">
            <Title text1={"ALL "} text2={"ARTS"} />
          </div>
          <div className="w-11">
            <select onChange={handleSortChange} className="border-2 border-gray-300 text-sm px-3">
              
              <option value="low">Sort by: low to high</option>
              <option value="high">Sort by: high to low</option>
            </select>
          </div>
        </div>
        <main className="w-full flex flex-col  sm:flex-col pb-20">
          <div className="w-full md:gap-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 place-items-center md:items-center">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>Error: {error}</p>
            ) : (
              products.map((product) => (
                <div className="flex flex-col w-full sm:w-full md:w-full">
                  <ProductItem
                    key={product.id}
                    title={product.title}
                    image={product.img_url}
                    price={product.price}
                    productId={product.id}
                    currency={currency}
                  />
                </div>
              ))
            )}
          </div>
          <div className="flex items-center justify-center gap-4 mt-6">
            <img
              className="w-6 cursor-pointer"
              onClick={handlePrev}
              src={assets.left_arrow}
              alt=""
            />
            <p>{page}</p>
            <img
              className="w-6 cursor-pointer"
              src={assets.right_arrow}
              alt=""
              onClick={handleNext}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Collections;
