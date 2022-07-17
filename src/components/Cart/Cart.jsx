import React, { useState } from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import useFetch from "../../hooks/use-fetch";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cart-slice";

const url = process.env.REACT_APP_FIREBASE_ORDER;

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);

  const { sendRequest } = useFetch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const dispatch = useDispatch();
  const cartItemsTotal = useSelector((state) => state.cart.totalAmount);
  const cartItemsRedux = useSelector((state) => state.cart.items);

  const totalAmount = `$${cartItemsTotal.toFixed(2)}`;
  const hasItems = cartItemsRedux.length > 0;

  const cartItemRemoveHandler = (id) => {
    dispatch(cartActions.removeItemFromCart(id));
  };
  const cartItemAddHandler = (item) => {
    const cartItem = { ...item, amount: 1 };
    dispatch(cartActions.addItemToCartHandler(cartItem));
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const subimitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await sendRequest({
      url: url,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        user: userData,
        orderedItems: cartItemsRedux,
      },
    });
    setIsSubmitting(false);
    setDidSubmit(true);
    dispatch(cartActions.clearCartHandler({ items: [], totalAmount: 0 }));
  };

  const cartitems = cartItemsRedux.map((item) => (
    <CartItem
      key={item.id}
      name={item.name}
      amount={item.amount}
      price={item.price}
      onRemove={cartItemRemoveHandler.bind(null, item.id)}
      onAdd={cartItemAddHandler.bind(null, item)}
    />
  ));

  return (
    <Modal onCloseCart={props.onCloseCart}>
      {isSubmitting && <p>sending order data...</p>}
      {!isSubmitting && !didSubmit && (
        <div>
          <ul className={classes["cart-items"]}>{cartitems}</ul>
          <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
          </div>
          {isCheckout && (
            <Checkout
              onConfirm={subimitOrderHandler}
              onCloseCart={props.onCloseCart}
            />
          )}
          {!isCheckout && (
            <div className={classes.actions}>
              <button
                onClick={props.onCloseCart}
                className={classes["button--alt"]}
              >
                Close
              </button>
              {hasItems && (
                <button className={classes.button} onClick={orderHandler}>
                  Order
                </button>
              )}
            </div>
          )}
        </div>
      )}
      {!isSubmitting && didSubmit && (
        <div>
          <p>successfully sent the order!</p>
          <div className={classes.actions}>
            <button onClick={props.onCloseCart} className={classes.button}>
              Close
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default Cart;
