import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [data, setData] = useState(null); // Set initial data to null
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [postDataPayload, setPostDataPayload] = useState(null);
  const [registerDataPayload, setRegisterDataPayload] = useState(null);

  const loginUserData = async (inputData) => {
    setLoading(true);
    setError(null);
    console.log("UserProvider rendered");
    try {
      const response = await fetch("http://127.0.0.1:3002/api/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Fixed the typo here from "Content-Typpe"
        },
        body: JSON.stringify(inputData),
      });

      if (!response.ok) {
        throw new Error("Failed to log in");
      }

      const result = await response.json();
      setData(result); // Store the result from login
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (postDataPayload) {
      console.log("UserProvider rendered");
      loginUserData(postDataPayload);
    }
  }, [postDataPayload]);

  const triggerPostRequest = (inputData) => {
    setPostDataPayload(inputData);
  };

  // REGISTER USER
  const registerUserData = async (inputData) => {
    setLoading(true);
    setError(null);
    console.log("UserProvider rendered");
    try {
      const response = await fetch(
        "http://127.0.0.1:3000/api/v1/users/sign-up",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Fixed the typo here from "Content-Typpe"
          },
          body: JSON.stringify(inputData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to log in");
      }

      const result = await response.json();
      setData(result); // Store the result from login
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (registerDataPayload) {
      console.log("UserProvider rendered");
      registerUserData(registerDataPayload);
    }
  }, [registerDataPayload]);

  const triggerRegisterRequest = (inputData) => {
    setRegisterDataPayload(inputData);
  };
  return (
    <UserContext.Provider
      value={{
        data,
        loading,
        error,
        triggerPostRequest,
        triggerRegisterRequest,
      }}
    >
      {children} {/* Fixed spelling from 'childern' to 'children' */}
    </UserContext.Provider>
  );
};
