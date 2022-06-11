import React from "react";
import { AuthContext } from "../context";

export const useAuth = () => {
  const { db, app, user, signInAdmin, signInUser, signOut } =
    React.useContext(AuthContext);

  return { db, app, user, signOut, signInAdmin, signInUser };
};
