import { MenuContext } from "../context";
import React, { useState } from "react";
import { useAuth } from "../hooks";

const MenuProvider = ({ children }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [dineTables, setDineTables] = useState([]);
  const alreadyFetching = React.useRef(false);
  const { db } = useAuth();
  const categoryRef = db.collection("categories");
  const itemsRef = db.collection("items");

  const getMenuItems = async () => {
    const ss = await categoryRef.get();
    const arr = [];

    for (let i = 0; i < ss.docs.length; i++) {
      const docsData = ss.docs[i].data();
      const abc = [];
      for (let j = 0; j < docsData.items.length; j++) {
        const data = (await itemsRef.doc(docsData.items[j].id).get()).data();
        abc.push({ ...data });
      }
      arr.push({
        ...docsData,
        items: [...abc],
      });
    }
    setMenuItems([...arr]);
    alreadyFetching.current = false;
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
    // console.log("###", arr);
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
