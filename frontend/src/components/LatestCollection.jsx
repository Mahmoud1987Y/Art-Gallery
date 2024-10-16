import React, { useContext } from "react";
import { ProductContext } from "../context/ProductContext";

const LatestCollection = () => {
  const { products, loading, error, fetchProductsData } =
    useContext(ProductContext);

  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default LatestCollection;
