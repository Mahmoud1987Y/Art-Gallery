import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../context/AuthContext";
import { UserContext } from "../context/UserContext";
import { ProductContext } from "../context/ProductContext";

// Validation schema for Formik
const validationSchema = Yup.object({
  fullName: Yup.string().required("Full Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  country: Yup.string().required("Country is required"),
  postalCode: Yup.string().required("Postal Code is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
});

const PlaceOrder = ({ onSubmit }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const {
    isLogin,
    user,
    addAddress,
    updateAddress,
    getAddress,
    address,
    loading,
    order,
    setOrder,
    addOrder,
  } = useContext(UserContext); // Context functions for add/update address
  const { cartItems, deliveryFee, currency } = useContext(ProductContext);
  const navigate = useNavigate();
  useEffect(() => {
    getAddress();
   
  }, [user]);
  return (
    <>
      {isLogin && loading === false && (
        <div className="container mx-auto p-6">
          <h1 className="text-3xl font-bold mb-4 text-center">Checkout</h1>
          <div className="flex flex-col md:flex-row justify-between">
            {/* Left section: Shipping Info and Payment Options */}
            <div className="w-full md:w-2/3 bg-white p-6 rounded-lg shadow-md">
              <Formik
                enableReinitialize={true}
                initialValues={{
                  fullName:
                    (user.result.first_name ? user.result.first_name : "") +
                    " " +
                    (user.result.last_name ? user.result.last_name : ""),
                  email: user.result.email ? user.result.email : "",
                  address: address != null ? address.address : "",
                  city: address != null ? address.city : "",
                  country: address != null ? address.country : "",
                  postalCode: address != null ? address.postalCode : "",
                  phoneNumber: address != null ? `${address.phoneNumber}` : "",
                  paymentMethod: "",
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  onSubmit(values);
                }}
              >
                {({ values }) => (
                  <Form>
                    <h2 className="text-xl font-semibold mb-4">
                      Shipping Information
                    </h2>

                    {/* Shipping Info Fields */}
                    <div className="mb-4">
                      <label className="block text-gray-700">Full Name</label>
                      <Field
                        disabled
                        className="border p-2 w-full rounded-md disabled:bg-gray-200"
                        name="fullName"
                        type="text"
                        placeholder="Full Name"
                      />
                      <ErrorMessage
                        name="fullName"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-gray-700">Email</label>
                      <Field
                        disabled
                        className="border p-2 w-full rounded-md disabled:bg-gray-200"
                        name="email"
                        type="email"
                        placeholder="Email"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-gray-700">Address</label>
                      <Field
                        className="border p-2 w-full rounded-md"
                        name="address"
                        type="text"
                        placeholder="Address"
                      />
                      <ErrorMessage
                        name="address"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-gray-700">City</label>
                      <Field
                        className="border p-2 w-full rounded-md"
                        name="city"
                        type="text"
                        placeholder="City"
                      />
                      <ErrorMessage
                        name="city"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-gray-700">Country</label>
                      <Field
                        className="border p-2 w-full rounded-md"
                        name="country"
                        type="text"
                        placeholder="Country"
                      />
                      <ErrorMessage
                        name="country"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-gray-700">Postal Code</label>
                      <Field
                        className="border p-2 w-full rounded-md"
                        name="postalCode"
                        type="text"
                        placeholder="Postal Code"
                      />
                      <ErrorMessage
                        name="postalCode"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-gray-700">
                        Phone Number
                      </label>
                      <Field
                        className="border p-2 w-full rounded-md"
                        name="phoneNumber"
                        type="phone"
                        placeholder="Phone Number"
                      />
                      <ErrorMessage
                        name="phoneNumber"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    {/* Button to Add or Update Address */}
                    <div className="mb-4">
                      <button
                        type="button"
                        className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                        onClick={() => {
                          const newAddress = {
                            fullName: values.fullName,
                            email: values.email,
                            address: values.address,
                            city: values.city,
                            country: values.country,
                            postalCode: values.postalCode,
                            phoneNumber: values.phoneNumber,
                          };

                          // Logic to add or update the address based on your needs
                          if (address && address.id === user.result.id) {
                            updateAddress(newAddress); // Call update address function
                          } else {
                            addAddress(newAddress); // Call add address function
                          }
                        }}
                      >
                        {address && address.user_id == user.result.id
                          ? "Update Address"
                          : "Add Address"}
                      </button>
                    </div>

                    {/* Payment Options */}
                    <h2 className="text-xl font-semibold mb-4">
                      Payment Options
                    </h2>
                    <div className="mb-4">
                      <label className="block text-gray-700">
                        Payment Method
                      </label>
                      <div className="flex items-center">
                        <Field
                          className="mr-2"
                          type="radio"
                          name="paymentMethod"
                          value="cashOnDelivery"
                        />
                        <label>Cash on delivery</label>
                      </div>
                      <ErrorMessage
                        name="paymentMethod"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    {/* Submit Button */}
                    
                    <div className="mt-6">
                      <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        onClick={() => {
                          const orderItems = {
                            items: cartItems,
                            user_id: user.result.id,
                            address: address,
                          };

                          addOrder(orderItems,address.id);

                          navigate("/order-confirm");
                        }}
                      >
                        Place Order
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>

            {/* Right section: Cart Items and Summary */}
            <div className="w-full md:w-1/3 bg-gray-100 p-6 rounded-lg shadow-md mt-6 md:mt-0">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

              {/* Cart Items */}
              <div>
                {cartItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center mb-4 border-b pb-2"
                  >
                    <div>
                      <p className="font-semibold">{item.cartLength.title}</p>
                      <p className="text-gray-600">
                        Qty: {item.cartLength.quantity}
                      </p>
                    </div>
                    <p className="font-semibold">
                      {currency} {parseFloat(item.cartLength.price).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Delivery Fee */}
              <div className="flex justify-between items-center mb-4">
                <p className="font-semibold">Delivery Fee</p>
                <p className="font-semibold">
                  {currency} {deliveryFee.toFixed(2)}
                </p>
              </div>

              {/* Total Price */}
              <div className="flex justify-between items-center font-bold text-lg">
                <p>Total</p>
                <p>
                  {currency}{" "}
                  {(
                    cartItems.reduce(
                      (acc, item) =>
                        acc +
                        parseFloat(item.cartLength.price) *
                          item.cartLength.quantity,
                      0
                    ) + deliveryFee
                  ).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {!isLogin && (
        <div className="text-center">
          <p className="text-2xl text-center text-blue-500">
            To Proceed to checkout page you must Login Or create User
          </p>
          <button
            className="w-44 h-10 text-white text-xl text-center font-semibold bg-green-500 hover:bg-yellow-500 focus:ring-yellow-300 rounded-xl mt-4 mx-auto"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      )}
    </>
  );
};

export default PlaceOrder;
