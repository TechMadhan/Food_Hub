import React from "react";
import { ORDER_STATUS } from "../../config";
import { useAllOrder } from "../../store/hooks";
import "./style.css";

const Dashboard = () => {
  const { allOrders } = useAllOrder();

  const OrderStatusText = {
    [ORDER_STATUS.ORDERED]: "Order placed Successfully",
    [ORDER_STATUS.PREPARING]: "Almost ready",
    [ORDER_STATUS.READY_TO_SERVE]: "Your food is on the way",
    [ORDER_STATUS.AWAITING_PAYMENT]: "You can do payment",
  };

  return (
    <div>
      <div>Orders</div>
      {allOrders?.map((ord, ind) => {
        return (
          <div key={ind} className="admin-order">
            <div>{OrderStatusText[ord.orderStatus]}</div>
            <div>
              {ord.items?.map((itm) => {
                return (
                  <div key={itm.id}>
                    <div>
                      {itm.title} - {itm.cost} - {itm.count}
                      {itm.cost * itm.count}
                    </div>
                  </div>
                );
              })}
              <div className="order-total">Total: {ord.total || ""}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Dashboard;
