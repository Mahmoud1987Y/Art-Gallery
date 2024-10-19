import React from "react";
import { assets } from "../assets/assets";

const Policy = () => {
  return (
    <div className="flex flex-col sm:flex-row w-full py-7">
      <div className="w-full flex flex-col items-center sm:w-1/3 my-4 gap-3 ">
        <img className="w-16" src={assets.exchang_img} />
        <p className="text-black font-semibold">Easy Exchange Policy</p>
        <p className="text-gray-500">We Offer hassle free exchange policy</p>
      </div>
      <div className="w-full flex flex-col items-center sm:w-1/3 my-4 gap-3">
        <img className="w-16" src={assets.return_img} />
        <p className="text-black font-semibold">7 Days Return Policy</p>
        <p className="text-gray-500">We Offer 7 days free return policy policy</p>
      </div>
      <div className="w-full flex flex-col items-center sm:w-1/3 my-4 gap-3">
        <img className="w-16" src={assets.support_img} />
        <p className="text-black font-semibold">Best Customer Support</p>
        <p className="text-gray-500">We Provide 24/7 customer support</p>
      </div>
    </div>
  );
};

export default Policy;
