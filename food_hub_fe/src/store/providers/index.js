import React from "react";
import AuthProvider from "./auth";
import MenuProvider from "./menu";

const RootProvider = ({ children }) => {
  return (
    <AuthProvider>
      <MenuProvider>{children}</MenuProvider>
    </AuthProvider>
  );
};

export default RootProvider;
