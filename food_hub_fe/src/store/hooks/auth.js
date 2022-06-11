import React from "react";
import { AuthContext } from "../context";

export const useAuth = () => {
  const { user, signInAdmin, signInUser, signOut } =
    React.useContext(AuthContext);

  return { user, signOut, signInAdmin, signInUser };
};
