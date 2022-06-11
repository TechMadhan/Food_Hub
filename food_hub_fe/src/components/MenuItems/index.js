import React, { Component } from "react";
import "./styles.css";

export default class MenuItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuItems: [
        {
          category: "Category 1",
          items: [
            {
              name: "sub category 1",
              unit: "$",
              cost: 120,
              //   offerPrice: 110,
              image: "",
              quantity: 1,
            },
            {
              name: "sub category 2",
              unit: "$",
              cost: 120,
              //   offerPrice: 110,
              image: "",
              quantity: 0,
            },
            {
              name: "sub category 3",
              unit: "$",
              cost: 120,
              offerPrice: 110,
              image: "",
              quantity: 0,
            },
          ],
        },
      ],
    };
  }

  itemHandler = (index, menuIndex, value) => {
    let { menuItems } = this.state;
    menuItems[index].items[menuIndex].quantity = value;
    this.setState({
      menuItems,
    });
  };

  render() {
    const { menuItems } = this.state;
    return (
      <div>
        Hi,
        <div>
          {!!menuItems?.length &&
            menuItems.map((menu, index) => {
              return (
                <div key={menu.category + index}>
                  <h1>{menu.category}</h1>
                  <div
                    style={{
                      display: "flex",
                    }}
                  >
                    {!!menu.items?.length &&
                      menu.items.map((menuItem, menuIndex) => {
                        return (
                          <div
                            key={menuItem.name + menuIndex}
                            style={{
                              border: "2px solid lightgrey",
                              marginLeft: "10px",
                              padding: "10px",
                            }}
                          >
                            <img
                              src={require("../../assets/images/food_sample_img.jpeg")}
                              width={"150px"}
                            />
                            <h3 style={{ margin: 0 }}>{menuItem.name}</h3>
                            <div style={{ display: "flex" }}>
                              <p
                                style={{
                                  color: menuItem.offerPrice ? "red" : "green",
                                  textDecoration: menuItem.offerPrice
                                    ? "line-through"
                                    : "none",
                                }}
                              >
                                {menuItem.unit}
                                {menuItem.cost}
                              </p>
                              {menuItem.offerPrice && (
                                <p
                                  style={{
                                    color: "green",
                                    marginLeft: "5px",
                                  }}
                                >
                                  {menuItem.unit}
                                  {menuItem.offerPrice}
                                </p>
                              )}
                            </div>
                            <p>{menuIndex.image}</p>
                            {!menuItem.quantity ? (
                              <button
                                style={{
                                  marginTop: "15px",
                                }}
                                onClick={() =>
                                  this.itemHandler(index, menuIndex, 1)
                                }
                              >
                                Add
                              </button>
                            ) : (
                              <div
                                style={{
                                  display: "flex",
                                  marginTop: "15px",
                                  width: "50%",
                                  justifyContent: "space-between",
                                }}
                              >
                                <button
                                  onClick={() => {
                                    this.itemHandler(
                                      index,
                                      menuIndex,
                                      menuItem.quantity - 1
                                    );
                                  }}
                                >
                                  -
                                </button>
                                <p>{menuItem.quantity}</p>
                                <button
                                  onClick={() => {
                                    this.itemHandler(
                                      index,
                                      menuIndex,
                                      menuItem.quantity + 1
                                    );
                                  }}
                                >
                                  +
                                </button>
                              </div>
                            )}
                          </div>
                        );
                      })}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}
