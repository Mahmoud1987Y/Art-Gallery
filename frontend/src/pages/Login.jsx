import React, { useContext, useState } from "react";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
//import schema from "../helper/validate"; // Ensure this schema is correct and validates both fields

import { UserContext } from "../context/UserContext";

const Login = ({ onClose }) => {
  const[showRegister,setShowRegister]= useState(false)
  const { data,triggerPostRequest, loading, error } = useContext(UserContext); // Include loading and error for feedback
  
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    
    const inputData = { inData: values.inData, password: values.password };
    triggerPostRequest(inputData);

    // Wait for the response and navigate if successful
    if (!loading && !error) {
      console.log(data)
      navigate("/"); // Redirect after successful login
      onClose(); // Close the login modal
    }
  };

  return (
    <div className="w-full h-screen absolute top-0 left-0 bg-black">
      <button
        className="z-50 w-8 bg-white rounded-md text-black absolute top-3 right-3 font-bold"
        onClick={onClose} // Close the modal or navigate back
      >
        X
      </button>
      <div className="flex sm:flex py-10">
        <div className="flex flex-col w-full justify-between items-center sm:w-2/3 h-full">
          <img className="w-36 text-center" src={assets.logo} alt="" />

          <Formik
            // validationSchema={schema} // Uncomment if schema is ready
            initialValues={{ inData: "", password: "" }}
            onSubmit={handleSubmit} // Pass the submit handler here
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              isSubmitting,
            }) => (
              <div className="w-full flex justify-center items-center">
                <div className="sm:w-1/2">
                  <h2 className="text-white text-3xl text-center mx-auto">
                    Login
                  </h2>

                  <Form>
                    <input
                      type="text" // Use "text" for inData if it can be either email or username
                      name="inData"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.inData}
                      placeholder="Enter email / username"
                      className="w-full h-10 mb-2 bg-black border-b-2 border-gray-400 focus:outline-none text-white"
                      id="inData"
                    />
                    {/* Uncomment below if validation is implemented */}
                    {/* {errors.inData && touched.inData && (
                      <p className="text-red-500">{errors.inData}</p>
                    )} */}

                    <input
                      type="password"
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      placeholder="Enter password"
                      className="w-full h-10 mb-2 bg-black border-b-2 border-gray-400 focus:outline-none text-white"
                    />
                    {/* Uncomment below if validation is implemented */}
                    {/* {errors.password && touched.password && (
                      <p className="text-red-500">{errors.password}</p>
                    )} */}

                    <button
                      className="w-full mt-6 h-10 bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300"
                      type="submit"
                      disabled={isSubmitting || loading} // Disable button while submitting
                    >
                      {isSubmitting || loading ? "Logging in..." : "Login"}
                    </button>
                  </Form>
                </div>
              </div>
            )}
          </Formik>
        </div>
        <div className="hidden md:w-1/3 md:block text-white">
          <img
            src={assets.poster}
            alt=""
            className="sm:object-contain h-full absolute top-0"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
