import React from "react";

const ManageOrders = () => {
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
            {/* Example Row */}
            <tr className="border-t">
              <td className="py-2 px-4">123456</td>
              <td className="py-2 px-4">John Doe</td>
              <td className="py-2 px-4">$250</td>
              <td className="py-2 px-4">Pending</td>
              <td className="py-2 px-4">
                <button className="text-blue-500 hover:underline mr-4">Update Status</button>
              </td>
            </tr>
            {/* More rows will be dynamically generated */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageOrders;
