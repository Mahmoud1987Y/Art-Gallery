import { createContext, useState } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [latestProducts, setLatestProducts] = useState([]);
  const [bestSellerProducts, setBestSellerProducts] = useState([]);
  const [currency, setCurrency] = useState("LE");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const fetchProductsData = async (
    searchPattern = "",
    fetchAll = false,
    best = false,
    latest = false
  ) => {
    setLoading(true);
    setError(null);

    try {
      let endpoint = "";

      if (searchPattern) {
        // Case 1: Fetch products based on search pattern
        endpoint = `http://127.0.0.1:3002/api/v1/products/${searchPattern}`;
      } else if (fetchAll) {
        // Case 3: Fetch all products if fetchAll flag is true
        endpoint = `http://127.0.0.1:3002/api/v1/products/`;
      } else if (latest) {
        // Case 2: Fetch the latest 8 products
        endpoint = `http://127.0.0.1:3002/api/v1/products/latest`;
      } else if (best) {
        endpoint = `http://127.0.0.1:3002/api/v1/products/best-seller`;
      }
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error("cannot retrive product data");
      }
      const result = await response.json();
      if (best) {
        setBestSellerProducts(result.result); // Store products as a plain array
      } else if (latest) {
        setLatestProducts(result.result); // Assume general fetch returns products too
      } else {
        setProducts(result.result);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  /* useEffect(() => {
    fetchProductsData();
  }, []); */

  return (
    <ProductContext.Provider
      value={{
        products,
        latestProducts,
        bestSellerProducts,
        loading,
        error,
        fetchProductsData,
        currency,
        page,
        setPage,
        search,
        setSearch,
        showSearch,
        setShowSearch,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
