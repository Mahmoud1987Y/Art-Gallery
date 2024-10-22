import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Validation schema using Yup
const validationSchema = Yup.object({
  title: Yup.string().required("Product name is required"),
  artist: Yup.string(),
  type: Yup.string(),
  price: Yup.number().required("Price is required"),
  quantity: Yup.number().required("Quantity is required"),
  size: Yup.string(),
  description: Yup.string(),
  is_featured: Yup.boolean(),
  image: Yup.mixed(), // Change required to optional for update
});

const AddProductModal = ({ isOpen, onClose, onAddProduct, initialValues }) => {
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    
    if (initialValues && initialValues.img_url) {
     
      // Set image preview if updating
      setImagePreview(initialValues.img_url);
    } else {
      setImagePreview(null);
    }
  }, [initialValues]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md shadow-lg">
        <h2 className="text-2xl font-bold mb-4">
          {initialValues ? "Update Product" : "Add New Product"}
        </h2>

        <Formik
          initialValues={{
            title: initialValues?.title || "",
            artist: initialValues?.artist || "",
            type: initialValues?.type || "",
            price: initialValues?.price || "",
            quantity: initialValues?.quantity || "",
            size: initialValues?.size || "",
            description: initialValues?.description || "",
            is_featured: initialValues?.is_featured || false,
            image: null, // Reset image on form load
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            // Handle product submission
            onAddProduct(values);
            resetForm();
            setImagePreview(null);
            onClose(); // Close modal after submission
          }}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <div className="mb-2">
                <Field
                  className="border p-2 w-full"
                  name="title"
                  type="text"
                  placeholder="Product Name"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="mb-2">
                <Field
                  className="border p-2 w-full"
                  name="artist"
                  type="text"
                  placeholder="Artist"
                />
              </div>

              <div className="mb-2">
                <Field
                  className="border p-2 w-full"
                  name="type"
                  type="text"
                  placeholder="Type"
                />
              </div>

              <div className="mb-2">
                <Field
                  className="border p-2 w-full"
                  name="price"
                  type="number"
                  placeholder="Price"
                />
                <ErrorMessage
                  name="price"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="mb-2">
                <Field
                  className="border p-2 w-full"
                  name="quantity"
                  type="number"
                  placeholder="Quantity"
                />
                <ErrorMessage
                  name="quantity"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="mb-2">
                <Field
                  className="border p-2 w-full"
                  name="size"
                  type="text"
                  placeholder="Size"
                />
              </div>

              <div className="mb-2">
                <Field
                  as="textarea"
                  className="border p-2 w-full"
                  name="description"
                  placeholder="Description"
                />
              </div>

              <div className="mb-2 flex items-center">
                <Field
                  type="checkbox"
                  name="is_featured"
                  checked={values.is_featured}
                  onChange={() =>
                    setFieldValue("is_featured", !values.is_featured)
                  }
                />
                <label className="ml-2">Featured Product</label>
              </div>

              {/* Image Upload Section */}
              <div className="mb-2">
                <label className="block mb-1 font-semibold">
                  Product Image
                </label>
                <input
                  className="border p-2 w-full"
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    const file = event.target.files[0];
                    setFieldValue("image", file);
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setImagePreview(reader.result);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
                <ErrorMessage
                  name="image"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Image Preview */}

              {imagePreview && (
                <div className="mb-4">
                  <img
                    src={imagePreview}
                    alt="Product Preview"
                    className="w-32 h-32 object-cover border rounded-md"
                  />
                </div>
              )}

              <div className="flex">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2"
                >
                  {initialValues ? "Update Product" : "Add Product"}
                </button>
                <button
                  type="button"
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                  onClick={() => {
                    setImagePreview(null); // Clear image preview on cancel
                    onClose();
                  }}
                >
                  Cancel
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddProductModal;
