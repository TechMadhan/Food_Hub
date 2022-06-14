import React from "react";
import { MenuContext } from "../context";

export const useMenu = () => {
  const {
    menuItems,
    getMenuItems,
    dineTables,
    getDineTables,
    updateDineTable,
  } = React.useContext(MenuContext);

  return {
    menuItems,
    getMenuItems,
    dineTables,
    getDineTables,
    updateDineTable,
  };
};
