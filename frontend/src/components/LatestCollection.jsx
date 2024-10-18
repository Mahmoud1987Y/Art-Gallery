import React, { useContext, useEffect } from "react";
import { ProductContext } from "../context/ProductContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const LatestCollection = () => {
  const { currency, latestProducts, loading, error, fetchProductsData } =
    useContext(ProductContext);
  useEffect(() => {
    fetchProductsData("", false, false, true);
  }, []);
  //const data = fetchProductsData("", true);
  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"Latest "} text2={"Collection"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
          perferendis modi.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 gap-y-6">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          latestProducts.map((product) => (
            <ProductItem
              key={product.id}
              title={product.title}
              image={product.img_url}
              price={product.price}
              productId={product.id}
              currency={currency}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default LatestCollection;
