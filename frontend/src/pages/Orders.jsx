import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import OrderTable from "../components/OrderTable";

const Orders = () => {
  const { isLogin, getOrdersById, order, loading } = useContext(UserContext);

  useEffect(() => {
    // Fetch orders only once when user is logged in
    if (isLogin) {
      getOrdersById();
    }
  }, []);  // Only trigger when `isLogin` changes

  return (
    <>
      {!loading && isLogin ? (
        order && order.length > 0 ? (  // Ensure order is not null and has items
          <div>
            
              <OrderTable orders={order}/>
            
          </div>
        ) : (
          <p>No orders available.</p>
        )
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default Orders;
