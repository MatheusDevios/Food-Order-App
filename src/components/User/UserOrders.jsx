import React from "react";
import classes from "./UserOrders.module.css";

const UserOrders = (props) => {
  const { name, price, amount } = props;
  return (
    <div className={classes.orders}>
      <div>Item: {name}</div>
      <div>Price: {price}</div>
      <div>Amount: {amount}</div>
    </div>
  );
};

export default UserOrders;
