import React from "react";
import { ORDER_STATUS } from "../../config";
import { useAllOrder, useAuth } from "../../store/hooks";
import "./style.css";

const Dashboard = () => {
  const { signOut } = useAuth();
  const { allOrders, changeStatus } = useAllOrder();

  const OrderStatusText = {
    [ORDER_STATUS.ORDERED]: "Order placed Successfully",
    [ORDER_STATUS.PREPARING]: "Almost ready",
    [ORDER_STATUS.READY_TO_SERVE]: "Your food is on the way",
    [ORDER_STATUS.AWAITING_PAYMENT]: "You can do payment",
    [ORDER_STATUS.DONE]: "Payment Success",
  };

  const _renderStatus = (ord) => {
    let currentStep = false;

    const stat = [
      ORDER_STATUS.ORDERED,
      ORDER_STATUS.PREPARING,
      ORDER_STATUS.READY_TO_SERVE,
      ORDER_STATUS.AWAITING_PAYMENT,
      ORDER_STATUS.DONE,
    ];

    return (
      <div className="status-wrapper">
        {stat.map((btn) => {
          let color = !currentStep ? "lightgreen" : "lightgray";
          if (ord.orderStatus === btn) {
            currentStep = true;
          }

          return (
            <div
              className="status-cta"
              style={{
                backgroundColor: color,
              }}
              onClick={() => {
                changeStatus(
                  {
                    user: "bFnAuX3usCPYeIjpb0UqmGJe4G63",
                    orderId: "-N4LMOQRBJWfdAy4wJbW",
                  },
                  btn
                );
              }}
            >
              {btn}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div>
      <div>Orders</div>
      <button onClick={signOut}>Signout</button>
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
            {_renderStatus(ord)}
          </div>
        );
      })}
    </div>
  );
};

export default Dashboard;
