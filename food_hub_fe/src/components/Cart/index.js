import React from "react";
import Header from "../Header";
import {useCart} from '../../store/hooks'

const Cart = ({ history }) => {
  const {cart,removeFromCart} = useCart()
  return (
    <div>
      <Header
        back
        onBackClick={() => {
          history.back();
        }}
      />
      {cart?.map(item => {
        return <div style={{
          display:'flex',
          flexDirection:'row',
          justifyContent:'space-around',
          borderWidth:'2px',
          borderStyle:'solid',
          borderColor:'black',
          marginBottom:'16px'
        }}>
          <div>{item.name}</div>
        <div>{item.count}</div>
        <div>{item.categoryName}</div>
        <div onClick={() => {
          removeFromCart(item.id)
        }}>DELETE</div></div>
      })}
    </div>
  );
};

export default Cart;
