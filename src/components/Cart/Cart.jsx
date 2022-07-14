import React, { useContext, useState } from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import useFetch from "../../hooks/use-fetch";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [isCheckout, setIsCheckout] = useState(false);

  const { sendRequest } = useFetch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const totalAmount = `$${cartCtx.totalAmout.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    const cartItem = { ...item, amount: 1 };
    cartCtx.addItem(cartItem);
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const subimitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await sendRequest({
      url: "https://react-movie-84a0e-default-rtdb.europe-west1.firebasedatabase.app/orders.json",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        user: userData,
        orderedItems: cartCtx.items,
      },
    });
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCartHandler();
  };

  const cartitems = cartCtx.items.map((item) => (
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
