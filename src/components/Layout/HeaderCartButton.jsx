import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const [btnAnimated, setBtnAnimated] = useState(false);
  // const cartCtx = useContext(CartContext);
  const cartItemsRedux = useSelector((state) => state.cart.items);
  const numberOfItems = cartItemsRedux.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${btnAnimated ? classes.bump : ""}`;

  useEffect(() => {
    if (cartItemsRedux.length === 0) {
      return;
    }
    setBtnAnimated(true);

    const timer = setTimeout(() => {
      setBtnAnimated(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [cartItemsRedux]);

  return (
    <button onClick={props.onClick} className={btnClasses}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfItems}</span>
    </button>
  );
};

export default HeaderCartButton;
