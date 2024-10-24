import React, { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, setCartItems, currency } = useContext(ProductContext);
  const navigate = useNavigate();
  // Calculate total price of all items in the cart
  const totalPrice = cartItems.reduce((total, item) => {
    const price = Number(item.cartLength.price); // Ensure price is a number
    return total + (isNaN(price) ? 0 : price); // Add only if price is a valid number
  }, 0);

  const handleDeleteItem = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
  };

  const handleOrderNow = () => {
    navigate("/place-order");
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow-md hidden sm:table">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-left">Product</th>
                  <th className="px-4 py-2 text-left">Price</th>
                  <th className="px-4 py-2 text-left">Quantity</th>
                  <th className="px-4 py-2 text-left">Total</th>
                  <th className="px-4 py-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-4 py-2">{item.cartLength.title}</td>
                    <td className="px-4 py-2">
                      {currency+" "}{Number(item.cartLength.price).toFixed(2)}
                    </td>
                    <td className="px-4 py-2">1</td>
                    
                    <td className="px-4 py-2">
                      {currency+" "}{Number(item.cartLength.price).toFixed(2)}
                    </td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleDeleteItem(index)}
                        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition duration-300"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        
          <div className="sm:hidden">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 mb-4 shadow-md"
              >
                <h2 className="font-bold text-lg">{item.cartLength.title}</h2>
                <p className="text-gray-700">
                  Price: {currency+" "}{Number(item.cartLength.price).toFixed(2)}
                </p>
                <p className="text-gray-700">Quantity: 1</p>
                <p className="text-gray-700">
                  Total: {currency} {Number(item.cartLength.price).toFixed(2)}
                </p>
                <button
                  onClick={() => handleDeleteItem(index)}
                  className="bg-red-500 text-white mt-3 px-3 py-1 rounded-lg hover:bg-red-600 transition duration-300"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>

         
          <div className="flex flex-col items-end mt-6">
            <div className="text-right mb-4">
              <p className="text-xl font-semibold">
                Total: {currency+" "}{totalPrice.toFixed(2)}
              </p>
            </div>

            
            <button
              onClick={handleOrderNow}
              className="bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-700 transition duration-300"
            >
              Order Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
