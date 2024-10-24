import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"; // Import jwt-decode for decoding JWT

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    login: null,
    register: null,
    address: null,
  });
  const [showLogin, setShowLogin] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [address, setAddress] = useState([]); // Store address information
  const [order, setOrder] = useState(null);
  const [payement, setPayment] = useState("cash on delivery");

  const isTokenExpired = (token) => {
    if (!token || typeof token !== "string") {
      return true; // Return true if token is invalid
    }
    const decoded = jwtDecode(token);
    return decoded.exp < Date.now() / 1000; // Check if the token is expired
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setLoading(true)
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

  // ADD Address Functionality

  const addAddress = async (addressData) => {
    setLoading(true);
    setError((prev) => ({ ...prev, address: null }));
    try {
      const response = await fetch(
        "http://127.0.0.1:3002/api/v1/users/address",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${user.token}`,
          },
          body: JSON.stringify(addressData),
          user: user,
        }
      );

      if (!response.ok) throw new Error("Failed to add address");

      const result = await response.json();
      await setAddress(result.data); // Update state with the new address
    } catch (error) {
      setError((prev) => ({ ...prev, address: error.message }));
    } finally {
      setLoading(false);
    }
  };

  const updateAddress = async (addressId, updatedAddressData) => {
    setLoading(true);
    setError((prev) => ({ ...prev, address: null }));
    try {
      const response = await fetch(
        `http://127.0.0.1:3002/api/v1/users/address/${addressId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${user.token}`,
          },
          body: JSON.stringify(updatedAddressData),
        }
      );

      if (!response.ok) throw new Error("Failed to update address");

      const result = await response.json();
      setAddress(result); // Update state with the updated address
    } catch (error) {
      setError((prev) => ({ ...prev, address: error.message }));
    } finally {
      setLoading(false);
    }
  };

  const getAddress = async () => {
    setLoading(true);

    setError((prev) => ({ ...prev, address: null }));
    try {
      const response = await fetch(
        `http://127.0.0.1:3002/api/v1/users/address`,
        {
          method: "GET",
          headers: {
            Authorization: `${user.token}`, // Ensure user is authenticated
          },
          user: user,
        }
      );

      if (!response.ok) throw new Error("Failed to fetch addresses");

      const result = await response.json();
      if (result) {
        await setAddress(result.data);
      } else {
        await setAddress([]);
      }
      console.log(result.data);
      // Update the state with fetched addresses
    } catch (error) {
      setError((prev) => ({ ...prev, address: error.message }));
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

  // add order for user

  const addOrder = async (orderItems, addressId) => {
    const data = { orderItems, addressId };
    setLoading(true);
    setError((prev) => ({ ...prev, order: null }));
    try {
      const response = await fetch(
        "http://127.0.0.1:3002/api/v1/users/order/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${user.token}`,
          },
          body: JSON.stringify(data),
          user: user,
          addressId: "id",
        }
      );

      if (!response.ok) throw new Error("Failed to add Order");

      const result = await response.json();
      localStorage.removeItem("cartItems");
    } catch (error) {
      setError((prev) => ({ ...prev, address: error.message }));
    } finally {
      setLoading(false);
    }
  };

  //get orders for a user

  const getOrdersById = async () => {
    setLoading(true);
    const userId = user.result.id; // Optional chaining for safety
    setError((prev) => ({ ...prev, order: null }));
    try {
      console.log(userId); // Log the userId to ensure it's correct
      const response = await fetch(
        `http://127.0.0.1:3002/api/v1/users/order/get-order/${userId}`,
        {
          method: "GET",
          headers: {
            Authorization: `${user.token}`, // Ensure correct token format
          },
        }
      );
      if (!response.ok) throw new Error("Failed to get Order");
      const result = await response.json();
      await setOrder(result.result);
      console.log(result.result)
      console.log(order)
    } catch (error) {
      console.error('Error fetching orders:', error); // Log the full error
      setError((prev) => ({ ...prev, order: error.message }));
    } finally {
      setLoading(false);
    }
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
        addAddress,
        updateAddress,
        getAddress,
        showLogin,
        setShowLogin,
        isLogin,
        userRole,
        address,
        order,
        setOrder,
        payement,
        setPayment,
        addOrder,
        getOrdersById,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
