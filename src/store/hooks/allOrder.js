import React from "react";
import { AllOrderContext } from "../context";

export const useAllOrder = () => {
  const { allOrders, changeStatus } = React.useContext(AllOrderContext);
  return { allOrders, changeStatus };
};
