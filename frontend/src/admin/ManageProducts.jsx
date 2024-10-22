import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../context/ProductContext";
import AddProductModal from "./components/AddProductModal "; // Import the modal component
import { assets } from "../assets/assets";
import { UserContext } from "../context/UserContext";

const ManageProducts = () => {
  const {
    products,
    fetchProductsData,
    search,
    loading,
    error,
    page,
    setPage,
    addNewProduct,
    deleteProduct
  } = useContext(ProductContext);
  const { user } = useContext(UserContext);

  const [searchPattern, setSearchPattern] = useState("?title=");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddProduct = async (newProduct) => {
    // Add logic here to save the new product to the database or update state
   
    const formData = new FormData();
    for (const key in newProduct) {

      if (key === "image") {
        const newKey = "img_url";
        formData.append(newKey, newProduct[key]);
        continue;
      }
      formData.append(key, newProduct[key]);
    }
   
   
   

    // If you're uploading a file

    await addNewProduct(formData, user.token, user.result.role);
  };
  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (confirmDelete) {
      await deleteProduct(productId, user.token); // Call the delete function
    }
  };

  useEffect(() => {
    setSearchPattern(`?title=${search}`);
  }, [search]);

  useEffect(() => {
    fetchProductsData(searchPattern, false, false, false);
  }, [searchPattern, search]);

  function handlePrev() {
    const newPage = page > 1 ? page - 1 : 1;
    setPage(newPage);

    setSearchPattern(
      (prev) => `${prev.replace(/&page=\d+/, "")}&page=${newPage}`
    );
  }

  function handleNext() {
    const newPage = products.length > 0 ? page + 1 : page;
    setPage(newPage);

    setSearchPattern(
      (prev) => `${prev.replace(/&page=\d+/, "")}&page=${newPage}`
    );
  }
  return (
    <div className="p-6 md:p-10 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Manage Products</h1>

      {/* Add Product Button */}
      <div className="mb-6">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
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
                <th className="py-2 px-4">image</th>
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
                    <img className="w-20" src={product.img_url} />
                  </td>
                  <td className="py-2 px-4">
                    <button className="text-blue-500 hover:underline mr-4">
                      Edit
                    </button>
                    <button className="text-red-500 hover:underline"
                    onClick={() => handleDelete(product.id)}> {/* Call handleDelete with product ID */}
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
      <AddProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddProduct={handleAddProduct}
      />
    </div>
  );
};

export default ManageProducts;
