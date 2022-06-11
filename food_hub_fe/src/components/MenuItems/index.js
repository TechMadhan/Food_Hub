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
              id:0,
              name: "I1",
              cost: 120,
              image: "",
            },
            {
              id:1,
              name: "I1",
              cost: 120,
              image: "",
            },
            {
              id:2,
              name: "I1",
              cost: 120,
              image: "",
            },
            {
              id:3,
              name: "I1",
              cost: 120,
              image: "",
            },
            {
              id:4,
              name: "I1",
              cost: 120,
              image: "",
            },
            {
              id:5,
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

  itemHandler = (categoryName, item) => {
    const {addToCart} = this.props;

    addToCart({
      ...item,
      count:1,
      categoryName
    })
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
    const {  categoryModel } = this.state;
    const {
      auth: { user, signOut },
      cart
    } = this.props;
    return (
      <div>
        <Header 
        cart={cart}
        onCartClick={() => {
           this.props.history.push("/cart");
        }}/>
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
                    const itemInCart = cart.find(i => i.id === item.id)
                    return (
                      <div
                        key={item.name + itemIndex}
                        className="item-container"
                      >
                       {itemInCart?.count > 0 && <div className="item-count">{itemInCart?.count}</div>}
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
