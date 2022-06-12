import { AllOrderContext } from "../context";
import React from "react";
import { useAuth } from "../hooks/auth";
import { ORDER_STATUS } from "../../config";

const AllOrderProvider = ({ children }) => {
  const [allOrders, setAllOrders] = React.useState([]);
  const { real_db, user } = useAuth();

  React.useEffect(() => {
    if (!user || !real_db) return;

    real_db.ref().on("value", (snapshot) => {
      const data = snapshot.val();
      const active_orders = Object.keys(data || {}).reduce((total, current) => {
        const userOrders = Object.values(data[current] || {})?.filter(
          (d) => d.orderStatus !== ORDER_STATUS.DONE
        );
        return [...total, ...userOrders];
      }, []);
      setAllOrders(active_orders);
    });
  }, [real_db, user]);

  const changeStatus = async (order_details, status) => {
    const orderId = `${order_details.user}/${order_details.orderId}`;
    const orders = real_db.ref(orderId);
    const or = await orders.set(
      {
        orderStatus: status,
      },
      () => {
        console.log("##");
      }
    );
    console.log(or);
  };

  return (
    <AllOrderContext.Provider value={{ allOrders, changeStatus }}>
      {children}
    </AllOrderContext.Provider>
  );
};

export default AllOrderProvider;
