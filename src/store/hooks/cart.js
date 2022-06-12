import React from "react";
import { CartContext } from "../context";

export const useCart = () => {
  const { cart, addToCart, removeFromCart, clearCart } =
    React.useContext(CartContext);
  return { cart, addToCart, removeFromCart, clearCart };
};
