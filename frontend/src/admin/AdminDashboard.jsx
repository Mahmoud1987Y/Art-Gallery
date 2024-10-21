import React, { useState } from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [activeOperation, setActiveOperation] = useState("products");

  return (
    <div className="flex flex-col md:flex-row p-6 md:p-10 bg-gray-100 min-h-screen">
      {/* Left Sidebar */}
      <div className="md:w-1/4 bg-white rounded-lg shadow-lg md:mr-6 p-4">
        <h2 className="text-xl font-bold mb-4">Operations</h2>
        <ul>
          <li
            className={`py-2 px-4 rounded cursor-pointer ${
              activeOperation === "products" ? "bg-gray-200" : ""
            }`}
            onClick={() => setActiveOperation("products")}
          >
            Product Operations
          </li>
          <li
            className={`py-2 px-4 rounded cursor-pointer ${
              activeOperation === "orders" ? "bg-gray-200" : ""
            }`}
            onClick={() => setActiveOperation("orders")}
          >
            Order Operations
          </li>
        </ul>
      </div>

      {/* Right Content Area */}
      <div className="md:w-3/4 bg-white rounded-lg shadow-lg p-6">
        {activeOperation === "products" && (
          <div>
            <h1 className="text-3xl font-bold mb-8">Manage Products</h1>
            <div className="mb-6">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                Add New Product
              </button>
            </div>
            {/* Products Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg shadow-lg">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="py-2 px-4">Product Name</th>
                    <th className="py-2 px-4">Price</th>
                    <th className="py-2 px-4">Stock</th>
                    <th className="py-2 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Example Row */}
                  <tr className="border-t">
                    <td className="py-2 px-4">Example Product</td>
                    <td className="py-2 px-4">$100</td>
                    <td className="py-2 px-4">20</td>
                    <td className="py-2 px-4">
                      <button className="text-blue-500 hover:underline mr-4">
                        Edit
                      </button>
                      <button className="text-red-500 hover:underline">
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeOperation === "orders" && (
          <div>
            <h1 className="text-3xl font-bold mb-8">Manage Orders</h1>
            {/* Orders Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg shadow-lg">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="py-2 px-4">Order ID</th>
                    <th className="py-2 px-4">Customer Name</th>
                    <th className="py-2 px-4">Total Amount</th>
                    <th className="py-2 px-4">Status</th>
                    <th className="py-2 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Example Row */}
                  <tr className="border-t">
                    <td className="py-2 px-4">123456</td>
                    <td className="py-2 px-4">John Doe</td>
                    <td className="py-2 px-4">$250</td>
                    <td className="py-2 px-4">Pending</td>
                    <td className="py-2 px-4">
                      <button className="text-blue-500 hover:underline mr-4">
                        Update Status
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
