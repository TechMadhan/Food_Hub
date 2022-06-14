import React, { Component } from "react";
import Header from "../Header";
import {
  Card,
  Button,
  Badge,
  DropdownButton,
  Dropdown,
  Spinner,
} from "react-bootstrap";
import "./styles.css";

export default class MenuItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // menuItems: [],
      // cartItems: [],
      // categoryModel: [],
    };
  }
  componentDidMount() {
    const { getMenuItems } = this.props;
    getMenuItems();
  }
  itemHandler = (categoryName, item) => {
    const { addToCart } = this.props;
    addToCart({
      ...item,
      count: 1,
      categoryName,
    });
  };

  render() {
    const {
      auth: { user, signOut },
      cart,
      menuItems,
    } = this.props;
    return (
      <div>
        {!menuItems.length && (
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
            }}
          >
            <Spinner animation="border" variant="primary" />
          </div>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            // background: "lightgrey",
          }}
        >
          <Header
            cart={cart}
            onCartClick={() => {
              this.props.history.push("/cart");
            }}
          />

          <DropdownButton
            // id="dropdown-basic-button"
            className="secondary btn-sm"
            title={`${user?.displayName}`}
            style={{ position: "relative", top: 10 }}
          >
            <Dropdown.Item
              onClick={() => {
                this.props.history.push("/order");
              }}
            >
              My Orders
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                signOut();
                this.props.history.push("/menu");
              }}
            >
              Sign out
            </Dropdown.Item>
          </DropdownButton>
        </div>
        {!!cart.length && (
          <Button
            variant="primary"
            style={{
              // borderRadius: "12px",
              position: "relative",
              left: "95%",
            }}
            className="btn-sm"
            onClick={() => {
              this.props.history.push("/cart");
            }}
          >
            Cart {!!cart.length && <Badge bg="info">{cart.length}</Badge>}
          </Button>
        )}
        <div className="d-flex align-items-center justify-content-center">
          <div
            style={{
              width: "400px",
              // height: "100vh",
              padding: "5px",
            }}
          >
            {!!menuItems.length &&
              menuItems.map((category, index) => {
                return (
                  <div key={category.title + index}>
                    <h2
                      style={{
                        textAlign: "center",
                        background: "#cee0fa",
                        padding: "5px",
                        borderRadius: "12px",
                      }}
                    >
                      {category.title}
                    </h2>
                    <div className="item-wrapper">
                      {category.items.map((item, itemIndex) => {
                        const itemInCart = cart.find((i) => i.id === item.id);
                        return (
                          <Card
                            key={item.title}
                            style={{
                              width: "43%",
                              margin: "10px",
                              padding: "5px",
                              borderRadius: "12px",
                              background: "#eef5ff",
                              boxShadow: "inset 0 0 5px #eef5ff",
                            }}
                          >
                            <Card.Img
                              variant="top"
                              src={item.image}
                              style={{
                                padding: "10px",
                              }}
                            />
                            <Card.Body>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                }}
                              >
                                <Card.Title
                                  style={{
                                    fontWeight: "bold",
                                  }}
                                >
                                  {item.title}
                                </Card.Title>
                                {itemInCart?.count > 0 && (
                                  <Badge bg="info">{itemInCart?.count}</Badge>
                                )}
                              </div>
                              <Card.Text
                                style={{
                                  color: "green",
                                  fontWeight: "bold",
                                }}
                              >
                                ₹{item.cost}
                              </Card.Text>
                              <Button
                                variant="primary"
                                style={{ width: "100%", borderRadius: "12px" }}
                                className="btn-sm"
                                onClick={() =>
                                  this.itemHandler(category.title, item, "add")
                                }
                              >
                                Add
                              </Button>
                            </Card.Body>
                          </Card>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    );
  }
}
