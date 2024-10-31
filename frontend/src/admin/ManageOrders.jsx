import React, { useContext, useEffect, useState, useCallback } from "react";
import { ProductContext } from "../context/ProductContext";
import { UserContext } from "../context/UserContext";
import ShowOrderData from "./components/ShowOrderData";

const ManageOrders = () => {
  const {
    allOrders = [],
    loading,
    error,
    getAllOrders,
  } = useContext(ProductContext);

  const { user } = useContext(UserContext);
  const [showOrder, setShowOrder] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(5); // Items per page
  function handleChoose(order) {
    setShowOrder(true);
    console.log(order);
  }
  // Memoize getAllOrders using useCallback to prevent it from changing on every render
  const fetchOrders = useCallback(() => {
    if (user?.token) {
      getAllOrders(user.token);
    }
  }, [user?.token, getAllOrders]);

  // Fetch orders only when component mounts or user token changes
  useEffect(() => {
    fetchOrders(); // Fetch orders once when the component mounts
  }, []);

  // Pagination logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = allOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(allOrders.length / ordersPerPage);

  return (
    <div className="p-6 md:p-10 bg-gray-100 min-h-screen">
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
            {loading ? (
              <tr>
                <td colSpan="5" className="py-2 px-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="5" className="py-2 px-4 text-center text-red-500">
                  {error.message}
                </td>
              </tr>
            ) : currentOrders.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-2 px-4 text-center">
                  No orders found.
                </td>
              </tr>
            ) : (
              allOrders.map((order) => (
                <tr key={order.id} className="border-t">
                  {showOrder && (
                    <ShowOrderData
                      orderData={"hello"}
                      setShowOrder={setShowOrder}
                    />
                  )}
                  <td className="py-2 px-4">
                    <button
                      onClick={() => handleChoose(order)}
                      className=" cursor-pointer"
                    >
                      {order.id}
                    </button>
                  </td>
                  <td className="py-2 px-4">
                    {order.Users?.first_name + " " + order.Users.last_name ||
                      "N/A"}
                  </td>
                  <td className="py-2 px-4">
                    ${order.Product?.price || "N/A"}
                  </td>
                  <td className="py-2 px-4">
                    <select
                      value={order.status}
                      className="border rounded p-1"
                      onChange={(e) => {
                        // Handle status change
                        console.log(
                          `Updating status for Order ID ${order.id} to ${e.target.value}`
                        );
                      }}
                    >
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                      <option value="canceled">Canceled</option>
                    </select>
                  </td>
                  <td className="py-2 px-4">
                    <button className="text-blue-500 hover:underline mr-4">
                      Update Status
                    </button>
                    <button className="text-red-500 hover:underline">
                      Delete
                    </button>
                    {showOrder && (
                    <ShowOrderData
                      orderData={order}
                      setShowOrder={setShowOrder}
                    />
                  )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        <div>
          Page {currentPage} of {totalPages}
        </div>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ManageOrders;
