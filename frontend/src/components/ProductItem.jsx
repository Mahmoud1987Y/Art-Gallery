import React from "react";
import { Link } from "react-router-dom";

const ProductItem = ({ productId, image, title, price, currency }) => {
  return (
    <Link to={`/product/${productId}`} className="text-gray-700 cursor-pointer">
      <div className=" overflow-hidden flex items-center">
        <img
          className=" hover:scale-110 transition ease-in-out w-full h-32 object-cover sm:w-full sm:h-32 md:w-5/6 md:text-center md:h-36 lg:w-5/6 lg:h-72"
          src={image}
          alt=""
        />
      </div>

      <p className="pt-3 pb-1 text-sm">{title}</p>

      <p className="text-sm font-medium">
        {currency} {price}
      </p>
    </Link>
  );
};

export default ProductItem;
