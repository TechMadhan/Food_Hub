import React from "react";
import { AllOrderContext } from "../context";

export const useAllOrder = () => {
  const { allOrders } = React.useContext(AllOrderContext);
  return { allOrders };
};
