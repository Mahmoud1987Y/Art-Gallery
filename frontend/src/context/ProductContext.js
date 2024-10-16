import { createContext, useState, useEffect } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProductsData = async (searchPattern = "") => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://127.0.0.1:3002/api/v1/products/${searchPattern}`
      );
      if (!response.ok) {
        throw new Error("cannot retrive product data");
      }
      const result = await response.json();
      setProducts(result.result);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProductsData();
  }, []);

  return (
    <ProductContext.Provider
      value={{ products, loading, error, fetchProductsData }}
    >
      {children}
    </ProductContext.Provider>
  );
};
