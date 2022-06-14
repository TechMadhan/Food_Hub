import React from "react";
import { useOrder } from "../../store/hooks";
import { ORDER_STATUS } from "../../config";
import "./style.css";

const OrderDetails = ({ history }) => {
  const { order } = useOrder();

  const OrderStatusText = {
    [ORDER_STATUS.ORDERED]: "Order placed Successfully",
    [ORDER_STATUS.PREPARING]: "Almost ready",
    [ORDER_STATUS.READY_TO_SERVE]: "Your food is on the way",
    [ORDER_STATUS.AWAITING_PAYMENT]: "You can do payment",
  };
  return (
    <div>
      <div style={{ margin: "16px" }}>Your orders</div>
      <div
        className="new-order"
        onClick={() => {
          history.replace("/menu");
        }}
      >
        New Order
      </div>
      {order?.map((ord, ind) => {
        return (
          <div key={ind} className="order-card">
            <div className="order-status">
              {OrderStatusText[ord.orderStatus]}
            </div>
            <div>
              {ord.items?.map((itm) => {
                return (
                  <div key={itm.id}>
                    <div className="order-item">
                      {itm.title} - {itm.cost} * {itm.count} ={" "}
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

export default OrderDetails;
