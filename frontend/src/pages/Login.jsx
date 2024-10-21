import React, { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { loginUserData, error, setShowLogin } = useContext(UserContext);
const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      inData: "",
      password: "",
    },
    validationSchema: Yup.object({
      inData: Yup.string()
        .required("Username or Email is required"),
      password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters"),
    }),
    onSubmit: (values) => {
      try {
        loginUserData(values);
        navigate('/')

      } catch (error) {
        
      }
      
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label htmlFor="inData" className="block mb-1 text-sm font-medium text-gray-700">
              Username or Email
            </label>
            <input
              id="inData"
              type="text"
              {...formik.getFieldProps("inData")}
              className={`border rounded-lg p-3 w-full transition duration-200 focus:ring-2 focus:ring-blue-400 focus:outline-none ${
                formik.touched.usernameOrEmail && formik.errors.usernameOrEmail
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {formik.touched.usernameOrEmail && formik.errors.usernameOrEmail && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.usernameOrEmail}</div>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              {...formik.getFieldProps("password")}
              className={`border rounded-lg p-3 w-full transition duration-200 focus:ring-2 focus:ring-blue-400 focus:outline-none ${
                formik.touched.password && formik.errors.password
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
            )}
          </div>

          {error.login && <div className="text-red-500 mb-4 text-sm">{error.login}</div>}

          <button type="submit" className="bg-blue-600 text-white rounded-lg py-2 w-full hover:bg-blue-700 transition duration-200">
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <a href="#" className="text-blue-600 hover:underline" onClick={() => setShowLogin(false)}>
            Register
          </a>
          <span className="mx-2">|</span>
          <a href="#" className="text-blue-600 hover:underline">Forget Password?</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
