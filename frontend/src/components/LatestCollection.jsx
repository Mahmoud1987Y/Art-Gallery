import React, { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import Title from "./Title";

const LatestCollection = () => {
  const { products, loading, error, fetchProductsData } =
    useContext(ProductContext);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"Latest "} text2={"Collection"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
          perferendis modi.
        </p>
      </div>
      <div>
        
      </div>
      {/* <ul>
        {products.map((product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul> */}
    </div>
  );
};

export default LatestCollection;
