import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../store/auth-slice";
import { cartActions } from "../../store/cart-slice";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const navigate = useNavigate();
  const [btnAnimated, setBtnAnimated] = useState(false);
  const dispatch = useDispatch();
  const cartItemsRedux = useSelector((state) => state.cart.items);
  const numberOfItems = cartItemsRedux.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const logoutHandler = () => {
    dispatch(authActions.logout());
    dispatch(cartActions.clearCartHandler({ items: [], totalAmount: 0 }));
    navigate("/");
  };

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
    <>
      {/* <Link className={classes.button} to="/">
        Logout
      </Link> */}
      <button className={classes.button} onClick={logoutHandler}>
        Logout
      </button>
      <button onClick={props.onClick} className={btnClasses}>
        <span className={classes.icon}>
          <CartIcon />
        </span>
        <span>Your Cart</span>
        <span className={classes.badge}>{numberOfItems}</span>
      </button>
    </>
  );
};

export default HeaderCartButton;
