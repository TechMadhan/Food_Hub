import React from "react";
import AuthProvider from "./auth";
import CartProvider from "./cart";

const RootProvider = ({ children }) => {
  return (
    <AuthProvider>
      <CartProvider>{children} </CartProvider>
    </AuthProvider>
  );
};

export default RootProvider;
