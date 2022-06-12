import { OrderContext } from "../context";
import React from "react";
import { useAuth } from "../hooks/auth";
import { ORDER_STATUS } from "../../config";

const CartProvider = ({ children }) => {
  const [order, setOrders] = React.useState([]);
  const { real_db, user } = useAuth();

  React.useEffect(() => {
    if (!user || !real_db) return;

    real_db.ref(user?.uid).on("value", (snapshot) => {
      const data = snapshot.val();
      const active_orders = Object.values(data || {}).filter(
        (d) => d.orderStatus !== ORDER_STATUS.DONE
      );
      setOrders(active_orders);
    });
  }, [real_db, user]);

  const createOrder = async (order_details, table) => {
    try {
      const orderId = `${order_details.user}`;
      const orders = real_db.ref(orderId);
      orders.push(order_details);
    } catch (err) {
      console.log("##W ", err.message);
    }
  };

  return (
    <OrderContext.Provider value={{ order, createOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export default CartProvider;
