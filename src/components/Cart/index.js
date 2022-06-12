import React from "react";
import Header from "../Header";
import "./style.css";
import { useAuth, useCart, useMenu, useOrder } from "../../store/hooks";
import { Table, Button } from "react-bootstrap";
import { ORDER_STATUS } from "../../config";

const Cart = ({ history }) => {
  const { cart, removeFromCart, clearCart } = useCart();
  const { user } = useAuth();
  const { order, createOrder } = useOrder();
  const { updateDineTable } = useMenu();
  return (
    <div>
      <Header
        back
        onBackClick={() => {
          history.back();
        }}
      />
      <Table
        striped
        bordered
        hover
        style={{
          textAlign: "center",
          width: "100%",
          padding: "5px",
        }}
      >
        <thead>
          <tr>
            <th colSpan={2}>Item</th>
            <th>Quantity</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cart?.map((item) => {
            return (
              <tr>
                <td>
                  <img
                    src={require("../../assets/images/food_sample_img.jpeg")}
                    width={"70px"}
                    // className="item-logo"
                  />
                </td>
                <td>
                  <h3 style={{ margin: 0 }}>{item.title}</h3>
                </td>
                <td>
                  <p>{item.count}</p>
                </td>
                <td>
                  <div>{item.categoryName}</div>
                </td>
                <td>
                  <div
                    onClick={() => {
                      removeFromCart(item.id);
                    }}
                  >
                    Delete
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Button
        onClick={() => {
          createOrder(
            {
              user: user?.uid,
              orderStatus: ORDER_STATUS.ORDERED,
              items: cart,
              tableId: localStorage.getItem("currentTable"),
              total: cart?.reduce(
                (total, current) => total + current.cost * current.count,
                0
              ),
            },
            12
          );
          history.push("/order");
          updateDineTable();
          clearCart();
        }}
      >
        Place your Order
      </Button>
    </div>
  );
};

export default Cart;
