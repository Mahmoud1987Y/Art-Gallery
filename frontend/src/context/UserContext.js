import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"; // Import jwt-decode for decoding JWT

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ login: null, register: null });
  const [showLogin, setShowLogin] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [userRole, setUserRole] = useState(null);

  const isTokenExpired = (token) => {
    if (!token || typeof token !== "string") {
      return true; // Return true if token is invalid
    }
    const decoded = jwtDecode(token);
    return decoded.exp < Date.now() / 1000; // Check if the token is expired
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (!isTokenExpired(parsedUser.token)) {
        setUser(parsedUser);
        setUserRole(parsedUser.result.role);
        setIsLogin(true);
      } else {
        logout(); // Log out if the token is expired
      }
    }
    setLoading(false);
  }, []);

  const loginUserData = async (inputData) => {
    setLoading(true);
    setError((prev) => ({ ...prev, login: null }));
    try {
      const response = await fetch("http://127.0.0.1:3002/api/v1/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputData),
      });

      if (!response.ok) throw new Error("Failed to log in");

      const result = await response.json();
      if (!isTokenExpired(result.token)) {
        setUser(result);
        localStorage.setItem("user", JSON.stringify(result));
        setUserRole(result.result.role);

        setIsLogin(true);

        setShowLogin(false);
      } else {
        throw new Error("Token has expired");
      }
    } catch (error) {
      setError((prev) => ({ ...prev, login: error.message }));
    } finally {
      setLoading(false);
    }
  };

  const registerUserData = async (inputData) => {
    setLoading(true);
    const data = await inputData;

    setError((prev) => ({ ...prev, register: null }));
    try {
      const response = await fetch(
        "http://127.0.0.1:3002/api/v1/users/sign-up",
        {
          method: "POST",

          body: inputData,
        }
      );

      if (!response.ok) throw new Error("Failed to register");

      const result = await response.json();

      setUser(result);
      localStorage.setItem("user", JSON.stringify(result));
      setShowLogin(false);
      setIsLogin(true);
   
      setUserRole(result.result.role);
    } catch (error) {
      setError((prev) => ({ ...prev, register: error.message }));
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    setIsLogin(false);
    setUserRole(null);
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
        isLogin,
        userRole,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
