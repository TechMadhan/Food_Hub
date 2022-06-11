import React from "react";
import AuthProvider from "./auth";
import MenuProvider from "./menu";
import CartProvider from "./cart";

const RootProvider = ({ children }) => {
  return (
    <AuthProvider>
      <MenuProvider>
        <CartProvider>{children}</CartProvider>
      </MenuProvider>
    </AuthProvider>
  );
};

export default RootProvider;
