import React from "react";

const CartContext = React.createContext({
  items: [],
  totalAmout: 0,
  addItem: () => {},
  removeItem: (id) => {},
  clearCartHandler: () => {},
});

export default CartContext;
