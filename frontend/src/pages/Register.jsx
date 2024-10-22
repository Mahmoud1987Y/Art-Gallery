import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { registerUserData, loading, error, user } = useContext(UserContext);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      first_name: "",
      last_name: "",
      date_of_birth: "",
      preferred_language: "en",
      profile_picture_url: null, // Added field for profile image
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required("Required")
        .min(3, "Must be at least 3 characters"),
      email: Yup.string().required("Required").email("Invalid email format"),
      password: Yup.string()
        .required("Required")
        .min(6, "Must be at least 6 characters"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Required"),
        first_name: Yup.string().required("Required"),
        last_name: Yup.string().required("Required"),
        date_of_birth: Yup.date().required("Required").nullable(),
        preferred_language: Yup.string().required("Required"),
      profile_picture_url: Yup.mixed().required("Required"), // Validation for profile image
    }),
    onSubmit: async(values) => {
      const formData = new FormData(); // Create FormData to handle file uploads
      for (const key in values) {
        formData.append(key, values[key]);
      }
      await registerUserData(formData);
    
      if (user) {
        navigate("/");
      } else {
        navigate("/register");
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md"
    >
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      {error.register && <p className="text-red-600">{error.register}</p>}

      {/* Username Input */}
      <div className="mb-4">
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700"
        >
          Username
        </label>
        <input
          type="text"
          id="username"
          {...formik.getFieldProps("username")}
          className={`mt-1 block w-full border rounded-md p-2 ${
            formik.touched.username && formik.errors.username
              ? "border-red-500"
              : "border-gray-300"
          }`}
        />
        {formik.touched.username && formik.errors.username ? (
          <p className="text-red-600">{formik.errors.username}</p>
        ) : null}
      </div>

      {/* Email Input */}
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          {...formik.getFieldProps("email")}
          className={`mt-1 block w-full border rounded-md p-2 ${
            formik.touched.email && formik.errors.email
              ? "border-red-500"
              : "border-gray-300"
          }`}
        />
        {formik.touched.email && formik.errors.email ? (
          <p className="text-red-600">{formik.errors.email}</p>
        ) : null}
      </div>

      {/* Password Input */}
      <div className="mb-4">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          {...formik.getFieldProps("password")}
          className={`mt-1 block w-full border rounded-md p-2 ${
            formik.touched.password && formik.errors.password
              ? "border-red-500"
              : "border-gray-300"
          }`}
        />
        {formik.touched.password && formik.errors.password ? (
          <p className="text-red-600">{formik.errors.password}</p>
        ) : null}
      </div>

      {/* Confirm Password Input */}
      <div className="mb-4">
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-gray-700"
        >
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          {...formik.getFieldProps("confirmPassword")}
          className={`mt-1 block w-full border rounded-md p-2 ${
            formik.touched.confirmPassword && formik.errors.confirmPassword
              ? "border-red-500"
              : "border-gray-300"
          }`}
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <p className="text-red-600">{formik.errors.confirmPassword}</p>
        ) : null}
      </div>

      {/* First Name Input */}
      <div className="mb-4">
        <label
          htmlFor="first_name"
          className="block text-sm font-medium text-gray-700"
        >
          First Name
        </label>
        <input
          type="text"
          id="first_name"
          {...formik.getFieldProps("first_name")}
          className={`mt-1 block w-full border rounded-md p-2 ${
            formik.touched.first_name && formik.errors.first_name
              ? "border-red-500"
              : "border-gray-300"
          }`}
        />
        {formik.touched.first_name && formik.errors.first_name ? (
          <p className="text-red-600">{formik.errors.first_name}</p>
        ) : null}
      </div>

      {/* Last Name Input */}
      <div className="mb-4">
        <label
          htmlFor="last_name"
          className="block text-sm font-medium text-gray-700"
        >
          Last Name
        </label>
        <input
          type="text"
          id="last_name"
          {...formik.getFieldProps("last_name")}
          className={`mt-1 block w-full border rounded-md p-2 ${
            formik.touched.last_name && formik.errors.last_name
              ? "border-red-500"
              : "border-gray-300"
          }`}
        />
        {formik.touched.last_name && formik.errors.last_name ? (
          <p className="text-red-600">{formik.errors.last_name}</p>
        ) : null}
      </div>

      {/* Date of Birth Input */}
      <div className="mb-4">
        <label
          htmlFor="date_of_birth"
          className="block text-sm font-medium text-gray-700"
        >
          Date of Birth
        </label>
        <input
          type="date"
          id="date_of_birth"
          {...formik.getFieldProps("date_of_birth")}
          className={`mt-1 block w-full border rounded-md p-2 ${
            formik.touched.date_of_birth && formik.errors.date_of_birth
              ? "border-red-500"
              : "border-gray-300"
          }`}
        />
        {formik.touched.date_of_birth && formik.errors.date_of_birth ? (
          <p className="text-red-600">{formik.errors.date_of_birth}</p>
        ) : null}
      </div>

      {/* Preferred Language Input */}
      <div className="mb-4">
        <label
          htmlFor="preferred_language"
          className="block text-sm font-medium text-gray-700"
        >
          Preferred Language
        </label>
        <select
          id="preferred_language"
          {...formik.getFieldProps("preferred_language")}
          className="mt-1 block w-full border rounded-md p-2"
        >
          <option value="en">English</option>
          <option value="ar">Arabic</option>
          <option value="fr">French</option>
          {/* Add more languages as needed */}
        </select>
      </div>

      {/* Profile Image Input */}
      <div className="mb-4">
        <label
          htmlFor="profile_picture_url"
          className="block text-sm font-medium text-gray-700"
        >
          Profile Image
        </label>
        <input
          type="file"
          id="profile_picture_url"
          accept="image/*"
          onChange={(event) => {
            formik.setFieldValue("profile_picture_url", event.currentTarget.files[0]);
          }}
          className={`mt-1 block w-full border rounded-md p-2 ${
            formik.touched.profile_picture_url && !formik.errors.profile_picture_url
              ? "border-gray-300"
              : "border-red-500"
          }`}
        />
        {formik.touched.profile_picture_url && !formik.errors.profile_picture_url ? (
          <p className="text-red-600">{formik.errors.profile_picture_url}</p>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
      >
        {loading ? "Loading..." : "Register"}
      </button>
    </form>
  );
};

export default Register;
