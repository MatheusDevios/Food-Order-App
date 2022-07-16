import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalAmount: 0,
  },
  reducers: {
    addItemToCartHandler(state, action) {
      //   console.log(state.items.amount);
      const newItem = action.payload;
      const newTotalAmount = state.totalAmount + newItem.price * newItem.amount;
      //   console.log(newTotalAmount);
      const existingItem = state.items.find((item) => item.id === newItem.id);
      //   state.items.amount = 0;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          name: newItem.name,
          amount: newItem.amount || 1,
          price: newItem.price,
        });
        state.totalAmount = newTotalAmount;
      } else {
        existingItem.amount = existingItem.amount + newItem.amount;
        state.totalAmount = newTotalAmount;
      }
      //   console.log(state.totalAmount);
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      //   console.log(existingItem.price);
      //   state.items.amount--;
      if (existingItem.amount === 1) {
        state.items = state.items.filter((item) => item.id !== id);
        state.totalAmount = state.totalAmount - existingItem.price;
      } else {
        existingItem.amount--;
        state.totalAmount = state.totalAmount - existingItem.price;
      }
    },
    clearCartHandler(state, action) {
      const item = action.payload;

      return (state = item);
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
