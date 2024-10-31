import React from "react";

const ShowOrderData = ({ order, setShowOrder }) => {
  return (
    <div className="fixed inset-0 w-full h-full  bg-gray-400">
      <button
        onClick={() => setShowOrder(false)}
        className=" absolute top-10 right-10 text-2xl text-black "
      >
        X
      </button>
      <div className="flex justify-center items-center ">
        <div className="w-full h-full bg-gray-600  md:w-1/3 md:h-96">
          <div>
            <p>{order.id}</p>
            <p></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowOrderData;
