import React, { useState } from "react";

// Sample Order Table Component
const OrderTable = ({ orders }) => {
  // Local state to manage statuses
  const [statuses, setStatuses] = useState(orders.map((order) => order.status));

  
  const handleAdd = (orderId) => {
    // Logic for adding an order
    console.log(`Add order with ID: ${orderId}`);
  };

  const handleDelete = (orderId) => {
    // Logic for deleting an order
    console.log(`Delete order with ID: ${orderId}`);
  };

  return (
    <table className="min-w-full border-collapse border border-gray-200">
      <thead>
        <tr className="bg-gray-100">
          <th className="border border-gray-300 px-4 py-2">Order ID</th>
          <th className="border border-gray-300 px-4 py-2">Title</th>
          <th className="border border-gray-300 px-4 py-2">Product Image</th>
          <th className="border border-gray-300 px-4 py-2">Price</th>
          <th className="border border-gray-300 px-4 py-2">Status</th>
         
        </tr>
      </thead>
      <tbody>
        {orders.map((order, index) => (
          <tr key={order.id} className="hover:bg-gray-50">
            <td className="border border-gray-300 px-4 py-2">{order.id}</td>
            <td className="border border-gray-300 px-4 py-2">
              {order.Product.title}
            </td>
            <td className="border border-gray-300 px-4 py-2">
              <img
                src={order.Product.img_url}
                alt={order.Product.image}
                className="h-16 w-16 object-cover"
              />
              <p>{order.Product.image}</p>
            </td>
            <td className="border border-gray-300 px-4 py-2">
              {order.Product.price}
            </td>
            <td className="border border-gray-300 px-4 py-2">
             <p>{order.status}</p>
            </td>
            
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrderTable;
