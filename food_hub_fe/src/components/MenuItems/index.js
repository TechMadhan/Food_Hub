import React, { Component } from "react";
import Header from "../Header";
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
              id: 1,
              name: "sub category 1",
              unit: "$",
              cost: 120,
              //   offerPrice: 110,
              image: "",
              quantity: 0,
            },
            {
              id: 2,
              name: "sub category 2",
              unit: "$",
              cost: 120,
              //   offerPrice: 110,
              image: "",
              quantity: 0,
            },
            {
              id: 3,
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
      cartItems: [],
      categoryModel: [
        {
          name: "C1",
          items: [
            {
              name: "I1",
              cost: 120,
              image: "",
            },
            {
              name: "I1",
              cost: 120,
              image: "",
            },
            {
              name: "I1",
              cost: 120,
              image: "",
            },
            {
              name: "I1",
              cost: 120,
              image: "",
            },
            {
              name: "I1",
              cost: 120,
              image: "",
            },
            {
              name: "I1",
              cost: 120,
              image: "",
            },
          ],
        },
        {
          name: "C222",
          items: [
            {
              name: "I1",
              cost: 120,
              image: "",
            },
            {
              name: "I1",
              cost: 120,
              image: "",
            },
            {
              name: "I1",
              cost: 120,
              image: "",
            },
            {
              name: "I1",
              cost: 120,
              image: "",
            },
            {
              name: "I1",
              cost: 120,
              image: "",
            },
            {
              name: "I1",
              cost: 120,
              image: "",
            },
          ],
        },
      ],
    };
  }

  itemHandler = (categoryName, item, type) => {
    let { cartItems } = this.state;
    const cartIndex = cartItems.findIndex(
      (value) => value.name === categoryName
    );
    if (cartIndex >= 0) {
      const itemIndex = cartItems[cartIndex].items?.findIndex(
        (value) => value.id === item.id
      );
      if (itemIndex >= 0) {
        cartItems[cartIndex].items[itemIndex].quantity =
          type === "newAdd"
            ? 1
            : type === "add"
            ? cartItems[cartIndex].items[itemIndex].quantity + 1
            : cartItems[cartIndex].items[itemIndex].quantity - 1;
      } else {
        cartItems[cartIndex].items.push(item);
      }
    } else {
      cartItems.push({
        name: categoryName,
        items: [
          {
            ...item,
            quantity: 1,
          },
        ],
      });
    }
    this.setState({ cartItems });
  };

  getItemQuantity = (categoryName, itemName) => {
    const { cartItems } = this.state;
    const itemQuantity =
      cartItems.map((value) => {
        if (
          value.name === categoryName &&
          value?.items?.find((itemValue) => itemValue.name === itemName)
        ) {
          return value?.items?.find((itemValue) => itemValue.name === itemName);
        }
      }) || [];
    if (!!itemQuantity?.[0]) {
      return itemQuantity[0].quantity;
    } else return null;
  };

  render() {
    const { menuItems, cartItems, categoryModel } = this.state;
    const {
      auth: { user, signOut },
    } = this.props;
    return (
      <div>
        <Header/>
        Hi, {user?.displayName}
        <button
          onClick={() => {
            signOut();
            this.props.history.push("/menu");
          }}
        >
          Signout
        </button>
        <div
          style={{
            width: "400px",
            height: "100vh",
            background: "lightgrey",
            padding: "5px",
          }}
        >
          {!!categoryModel.length &&
            categoryModel.map((category, index) => {
              return (
                <div key={category.name + index}>
                  <h2>{category.name}</h2>
                  <div className="item-wrapper">
                  {category.items.map((item, itemIndex) => {
                    return (
                      <div
                        key={item.name + itemIndex}
                        className="item-container"
                      >
                       {this.getItemQuantity(category.name, item.name) > 0 && <div className="item-count">{this.getItemQuantity(category.name, item.name)}</div>}
                        <img
                          src={require("../../assets/images/food_sample_img.jpeg")}
                          width={"100px"}
                          className="item-logo"
                        />
                        <div className="item-details">
                          <h4>{item.name}</h4>
                          <p>${item.cost}</p>
                            <button
                             className="item-cta"
                              onClick={() =>
                                this.itemHandler(category.name, item, "add")
                              }
                            >
                              Add
                            </button>
                        
                        </div>
                        
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
