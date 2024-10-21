import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../context/ProductContext";

const ManageProducts = () => {
  const { products, fetchProductsData, search, loading, error } =
    useContext(ProductContext);
  const [searchPattern, setSearchPattern] = useState("?title=");

  useEffect(() => {
    setSearchPattern(`?title=${search}`);
  }, [search]);

  useEffect(() => {
    fetchProductsData(searchPattern, false, false, false);
  }, [searchPattern, search]);

  return (
    <div className="p-6 md:p-10 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Manage Products</h1>

      {/* Add Product Button */}
      <div className="mb-6">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          Add New Product
        </button>
      </div>

      {/* Products Table */}
      <div className="overflow-x-auto">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <table className="min-w-full bg-white rounded-lg shadow-lg">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4">Product Name</th>
                <th className="py-2 px-4">Artist</th>
                <th className="py-2 px-4">Type</th>
                <th className="py-2 px-4">Price</th>
                <th className="py-2 px-4">Quantity</th>
                <th className="py-2 px-4">Size</th>
                <th className="py-2 px-4">Description</th>
                <th className="py-2 px-4">Is Featured</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Render rows from products */}
              {products.map((product) => (
                <tr key={product.id} className="border-t">
                  <td className="py-2 px-4">{product.title}</td>
                  <td className="py-2 px-4">{product.artist}</td>
                  <td className="py-2 px-4">{product.type}</td>
                  <td className="py-2 px-4">{product.price}</td>
                  <td className="py-2 px-4">{product.quantity}</td>
                  <td className="py-2 px-4">{product.size}</td>
                  <td className="py-2 px-4">{product.description}</td>
                  <td className="py-2 px-4">
                    {product.is_featured ? "Yes" : "No"}
                  </td>
                  <td className="py-2 px-4">
                    <button className="text-blue-500 hover:underline mr-4">
                      Edit
                    </button>
                    <button className="text-red-500 hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ManageProducts;
