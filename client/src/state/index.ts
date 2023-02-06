import { createSlice } from "@reduxjs/toolkit";

type Item = {
  id: number;
  count: number;
};

const initialState = {
  isCartOpen: false,
  cart: [],
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
    addToCart: (state, action) => {
      state.cart = [...state.cart, action.payload.item as never];
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(
        (item: Item) => item.id !== action.payload.id
      );
    },
    increaseCount: (state, action) => {
      const newCart = state.cart.map((item: Item) => {
        if (item.id === action.payload.id) {
          item.count++;
        }

        return item;
      });

      state.cart = newCart as never;
    },
    decreaseCount: (state, action) => {
      const newCart = state.cart.map((item: Item) => {
        if (item.id === action.payload.id && item.count > 1) {
          item.count--;
        }

        return item;
      });

      state.cart = newCart as never;
    },
    setIsCartOpen: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
  },
});

export const {
  setItems,
  addToCart,
  removeFromCart,
  increaseCount,
  decreaseCount,
  setIsCartOpen,
} = cartSlice.actions;

export default cartSlice.reducer;
