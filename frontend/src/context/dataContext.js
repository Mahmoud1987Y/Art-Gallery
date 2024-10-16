import { createContext, useEffect, useState } from "react";

// create context
export const DataContext = createContext();

//create context provider

export const DataProvider = ({ childern }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [postDataPayload, setPostDataPayload] = useState(null);
  const fetchData = async (inputData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://127.0.0.1:3002/api/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputData), // Send form data as JSON
      });
      if (!response) {
        throw new Error("Failed to fetch data");
      }
      const result = await response.json();
      console.log(result);
      setData(result);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (postDataPayload) {
      fetchData(postDataPayload);
    }
  }, [postDataPayload]);

  const triggerPostRequest = (inputData) => {
    setPostDataPayload(inputData); // This will trigger the useEffect
  };
  return (
    <DataContext.Provider
      value={{ data, loading, error, fetchData, triggerPostRequest }}
    >
      {childern}
    </DataContext.Provider>
  );
};
