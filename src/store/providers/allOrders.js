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

  return (
    <AllOrderContext.Provider value={{ allOrders }}>
      {children}
    </AllOrderContext.Provider>
  );
};

export default AllOrderProvider;
