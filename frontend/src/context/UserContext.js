import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Holds user data and tokens
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ login: null, register: null }); // Separate error states
  const [showLogin, setShowLogin] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [userRole, setUserRole] = useState(null);

  // Load user from localStorage on initialization
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLogin(true);
    }
    setLoading(false);
  }, []);

  // Login user and store JWT in localStorage
  const loginUserData = async (inputData) => {
    console.log(JSON.stringify(inputData));
    setLoading(true);
    setError((prev) => ({ ...prev, login: null })); // Reset login error
    try {
      const response = await fetch("http://127.0.0.1:3002/api/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputData),
      });

      if (!response.ok) {
        throw new Error("Failed to log in");
      }

      const result = await response.json();
      setUser(result); // Store user data including tokens
      setUserRole(result.role)
      localStorage.setItem("user", JSON.stringify(result)); // Save user data to localStorage
      setShowLogin(false); // Hide login modal on successful login
      setIsLogin(true);
      
    } catch (error) {
      setError((prev) => ({ ...prev, login: error.message })); // Store login error
    } finally {
      setLoading(false);
    }
  };

  // Register user and store user data
  const registerUserData = async (inputData) => {
    setLoading(true);
    setError((prev) => ({ ...prev, register: null })); // Reset registration error
    try {
      const response = await fetch(
        "http://127.0.0.1:3000/api/v1/users/sign-up",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(inputData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to register");
      }

      const result = await response.json();
      setUser(result); // Store user data upon successful registration
      localStorage.setItem("user", JSON.stringify(result)); // Save user data to localStorage
      setShowLogin(false); // Optionally hide login modal
    } catch (error) {
      setError((prev) => ({ ...prev, register: error.message })); // Store registration error
    } finally {
      setLoading(false);
    }
  };

  // Logout function to clear user data and tokens
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    setIsLogin(false);
  };

  // Handle visibility of login modal
  const handleHideLogin = () => {
    setShowLogin(false);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        error,
        loginUserData,
        registerUserData,
        logout,
        showLogin,
        setShowLogin,
        handleHideLogin,
        isLogin,
        setIsLogin,
        userRole,
        setUserRole,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
