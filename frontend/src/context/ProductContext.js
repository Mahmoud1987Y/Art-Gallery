import { createContext, useState, useEffect } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [latestProducts, setLatestProducts] = useState([]);
  const [bestSellerProducts, setBestSellerProducts] = useState([]);
  const [currency, setCurrency] = useState("LE");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1); // Keep track of the current page
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const[deliveryFee,setDeliveryFee] = useState(15)

  useEffect(() => {
    // Store cart items in localStorage whenever cartItems change
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

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
    } catch (err) {

      setError(err.message );
    } finally {
      setLoading(false);
    }
  };

  //add new products

  const addNewProduct = async (productData,token,role) => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://127.0.0.1:3002/api/v1/products/add-product",
        {
          method: "POST",
          headers: {
            authorization: token, // Include the token in the Authorization header
          }, 
          body: productData,
        }
      );
      if (!response.ok) throw new Error("Failed to add new product");

      const result = await response.json();
    } catch (err) {
      setError(err.message );
    }finally{
      setLoading(false)
    }
  };



  const updateProduct = async (id,productData,token) => {
    setLoading(true);
    try {
      
      const response = await fetch(
        `http://127.0.0.1:3002/api/v1/products/update/${id}`,
        {
          method: "PUT",
          headers: {
            authorization: token, // Include the token in the Authorization header
          }, 
          body: productData,
        }
      );
      if (!response.ok) throw new Error("Failed to add new product");
      const result = await response.json();
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === id ? { ...product, ...result.product } : product
        )
      );
    } catch (err) {
      setError(err.message );
    }finally{
      setLoading(false)
    }
  };
   // Implement deleteProduct function
   const deleteProduct = async (productId, token) => {
    setLoading(true);
    try {
      const response = await fetch(`http://127.0.0.1:3002/api/v1/products/delete/${productId}`, {
        method: "DELETE",
        headers: {
          authorization: token,
        },
      });

      if (!response.ok) throw new Error("Failed to delete product");

      // Update the products state to remove the deleted product
      setProducts((prevProducts) => prevProducts.filter(product => product.id !== productId));

      // Optionally, refetch products if you want to ensure the data is up-to-date
      // fetchProductsData();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

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
        cartItems,
        setCartItems,
        currentPage,
        setCurrentPage,
        totalPages,
        setTotalPages,
        addNewProduct,
        deleteProduct,updateProduct,deliveryFee
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
