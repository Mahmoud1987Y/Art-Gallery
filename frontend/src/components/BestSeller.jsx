import React, { useEffect,useContext } from "react";
import Title from "./Title";
import ProductItem from "./ProductItem";
import { ProductContext } from "../context/ProductContext";

const BestSeller = () => {
  const { currency, bestSellerProducts, loading, error, fetchProductsData } =
    useContext(ProductContext);
  useEffect(() => {
    fetchProductsData("", false, true,false);
  }, []);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"Best "} text2={"Seller"} />
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
          bestSellerProducts.map((product) => (
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

export default BestSeller;
