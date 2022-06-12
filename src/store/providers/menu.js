import { MenuContext } from "../context";
import React, { useState } from "react";
import { useAuth } from "../hooks";

const MenuProvider = ({ children }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [dineTables, setDineTables] = useState([]);
  const { db } = useAuth();
  const getMenuItems = async () => {
    const categoryRef = db.collection("categories");
    const itemsRef = db.collection("items");
    const ss = await categoryRef.get();
    let arr = [];

    for (let category of ss.docs) {
      const dd = category.data();
      let items = [];
      for (let iii of dd.items) {
        const data = (await itemsRef.doc(iii.id).get()).data();
        items.push(data);
      }
      arr.push({
        ...dd,
        items,
      });
    }
    console.log("###", arr);
    setMenuItems(arr);
  };

  const getDineTables = async () => {
    const dineTableRef = db.collection("dinetables");
    const ss = await dineTableRef.get();
    let arr = [];

    for (let dineTable of ss.docs) {
      const dd = dineTable.data();
      arr.push({
        ...dd,
        ref: dineTable.id,
      });
    }
    console.log("###", arr);
    setDineTables(arr);
  };

  const updateDineTable = async () => {
    const dineTableRef = db.collection("dinetables");
    localStorage.getItem("currentTable") &&
      dineTableRef.doc(localStorage.getItem("currentTable")).set(
        {
          status: "booked",
        },
        {
          merge: true,
        }
      );
  };

  return (
    <MenuContext.Provider
      value={{
        menuItems,
        getMenuItems,
        dineTables,
        getDineTables,
        updateDineTable,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export default MenuProvider;
