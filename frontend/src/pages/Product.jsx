import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";

const Product = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const { currency, cartItems, setCartItems } = useContext(ProductContext);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:3002/api/v1/products/${productId}`
        );
        const result = await response.json();
        setProduct(result.result);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct(); // Call the async function
  }, [productId]); // Add productId as a dependency

  function handleAddToCart(){
    //addToCart(product)
   
    let cartLength = cartItems.length
    setCartItems((prev)=>{
      return [...prev,{cartLength:product}]
    })
  }
  return product ? (
    <div className=" border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* product data*/}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row sm:justify-center">
        {/* product images*/}
        <div className="w-full sm:w-[70%]">
          <img
            className="sm:w-full object-right-top"
            src={product.img_url}
            alt=""
          />
        </div>
        <div className="flex flex-col sm:w-[30%] mt-5 gap-5">
          <h1 className="text-gray-400 text-sm ">New Collection</h1>
          <h1 className="text-gray-800 text-xl sm:text-3xl">{product.title}</h1>
          <div className="flex gap-24 text-gray-400">
            <div className="flex flex-col gap-3">
              <p>Art Type</p>
              <p className="text-orange-600 font-mono">{product.type}</p>
            </div>
            <div className="flex flex-col gap-3">
              <p>Artist</p>
              <p className="text-orange-600 font-mono">{product.artist}</p>
            </div>
          </div>
          <p className=" text-gray-400">{product.type}</p>
          <div className="flex gap-24 text-gray-400">
            <div className="flex flex-col gap-3">
              <p>Price</p>
              <p className="text-orange-600 font-mono">
                {currency} {product.price}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3 mt-5 text-gray-400">
            <p>Size</p>
            <p className="text-orange-600 font-mono">{product.size}</p>
          </div>
          <div className="flex flex-col gap-3  text-gray-400">
            <p>Description</p>
            <hr />
            <p>{product.description}</p>
          </div>
          <div className="flex mt-5 justify-center">
            <button
              onClick={handleAddToCart} 
              className=" rounded-full bg-orange-600 text-s text-white font-semibold m-3 px-5 py-2 w-3/5 hover:bg-orange-700 hover:scale-125 transition  duration-300"
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    navigate("/404")
  );
};

export default Product;
