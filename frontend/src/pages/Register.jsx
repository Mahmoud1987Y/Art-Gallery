import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Register = () => {
  const { registerUserData, loading, error } = useContext(UserContext);
  const navigate = useNavigate(); // Initialize useNavigate

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      preferredLanguage: 'en',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Required').min(3, 'Must be at least 3 characters'),
      email: Yup.string().required('Required').email('Invalid email format'),
      password: Yup.string().required('Required').min(6, 'Must be at least 6 characters'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Required'),
      firstName: Yup.string().required('Required'),
      lastName: Yup.string().required('Required'),
      dateOfBirth: Yup.date().required('Required').nullable(),
      preferredLanguage: Yup.string().required('Required'),
    }),
    onSubmit: (values) => {
      registerUserData(values).then(() => {
        // Redirect to login or home page after successful registration
        navigate('/'); // Redirect to home page or preferred route
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      {error && <p className="text-red-600">{error}</p>}
      {/* Include your input fields here */}
      {/* Similar to the existing fields you have */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
      >
        {loading ? 'Loading...' : 'Register'}
      </button>
    </form>
  );
};

export default Register;
