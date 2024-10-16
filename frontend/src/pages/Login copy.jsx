import React from "react";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import schema from "../helper/validate";

const Login = () => {
  const navigate = useNavigate();
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      console.log(values);
      const response = await fetch("http://127.0.0.1:3000/api/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values), // Send form data as JSON
      });

      const data = await response.json();

      if (response.ok) {
        // Successful login, handle the token
        console.log("Login successful:", data);
        localStorage.setItem("token", data.token); // Store token
        // Redirect or update UI
      } else {
        // Handle login error (e.g., invalid credentials)
        console.error("Login failed:", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }

    // Stop the loading spinner or similar UI change
    setSubmitting(false);
  };

  return (
    <div className="w-full h-screen absolute top-0 left-0 bg-black">
      <button
        className="z-50 w-8 bg-white rounded-md text-black absolute top-3 right-3 font-bold"
        onClick={() => {
          navigate("/");
        }}
      >
        X
      </button>
      <div className="flex sm:flex py-10">
        <div className="flex flex-col w-full  justify-between items-center sm:w-2/3 h-full">
          <img className="w-36 text-center" src={assets.logo} alt="" />

          <Formik
            validationSchema={schema}
            initialValues={{ inData: "", password: "" }}
            onSubmit={handleSubmit}
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
                  {/* Passing handleSubmit parameter tohtml form onSubmit property */}

                  <h2 className="text-white text-3xl text-center mx-auto">
                    Login
                  </h2>
                  {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}
                  <Form>
                    <input
                      type="email"
                      name="inData"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.inData}
                      placeholder="Enter email id / username"
                      className="w-full h-10 mb-2 bg-black border-b-2 border-gray-400 focus:outline-none text-white"
                      id="inData"
                    />
                    {/* If validation is not passed show errors */}
                    <p className="text-red-500">
                      {errors.inData && touched.inData && errors.inData}
                    </p>
                    {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}
                    <input
                      type="password"
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      placeholder="Enter password"
                      className="w-full h-10 mb-2  bg-black border-b-2 border-gray-400 focus:outline-none text-white"
                    />
                    {/* If validation is not passed show errors */}
                    <p className="text-red-500">
                      {errors.password && touched.password && errors.password}
                    </p>
                    {/* Click on submit button to submit the form */}
                    <button
                      className="w-full mt-6 h-10 bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Login
                    </button>
                  </Form>
                  {isSubmitting ? "Logging in..." : "Login"}
                </div>
              </div>
            )}
          </Formik>
        </div>
        <div className="  hidden md:w-1/3 md:block  text-white">
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
