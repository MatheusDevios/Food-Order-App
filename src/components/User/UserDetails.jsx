import React from "react";
import UserOrders from "./UserOrders";
import classes from "./UserDetails.module.css";

const UserDetails = (props) => {
  const { name, city, street, postalCode, items } = props;
  return (
    <li className={classes.userDetails}>
      <h3>{name}</h3>
      <div className={classes.street}>{street}</div>
      <div className={classes.city}>{city}</div>
      <div className={classes.postalCode}>{postalCode}</div>
      {items.map((order, index) => (
        <UserOrders
          key={index}
          name={order.name}
          price={order.price}
          amount={order.amount}
        />
      ))}
    </li>
  );
};

export default UserDetails;
