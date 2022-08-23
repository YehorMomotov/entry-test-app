import { configureStore } from "@reduxjs/toolkit";
import cartReduser from "./cartSlice";

export const store = configureStore({
  reducer: {
    cart: cartReduser,
  },
});
